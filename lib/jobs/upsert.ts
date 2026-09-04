import { z } from "zod";
import { eq, or } from "drizzle-orm";

import { db } from "../db";
import { jobs } from "../schema";
import { discoveredJobSchema } from "./validate";
import { createJobDedupKey } from "./deduplicate";

type DiscoveredJob = z.infer<typeof discoveredJobSchema>;

export async function upsertDiscoveredJob(job: DiscoveredJob) {
  const now = new Date();

  const dedupKey = createJobDedupKey({
    company: job.company,
    title: job.title,
    location: job.location,
    season: job.season,
  });

  const [existingJob] = await db
    .select()
    .from(jobs)
    .where(
      or(
        eq(jobs.applyUrl, job.apply_url),
        eq(jobs.dedupKey, dedupKey)
      )
    )
    .limit(1);

  if (existingJob) {
    const [updatedJob] = await db
      .update(jobs)
      .set({
        title: job.title,
        company: job.company,
        location: job.location,
        workType: job.work_type,
        category: job.category,
        season: job.season,
        description: job.description,
        skills: job.skills,
        applyUrl: job.apply_url,
        sourceUrl: job.source_url,
        dedupKey,
        lastSeenAt: now,
        updatedAt: now,
        isActive: true,
      })
      .where(eq(jobs.id, existingJob.id))
      .returning();

    return updatedJob;
  }

  const [insertedJob] = await db
    .insert(jobs)
    .values({
      title: job.title,
      company: job.company,
      location: job.location,
      workType: job.work_type,
      category: job.category,
      season: job.season,
      description: job.description,
      skills: job.skills,
      applyUrl: job.apply_url,
      sourceUrl: job.source_url,
      dedupKey,
      lastSeenAt: now,
      updatedAt: now,
      isActive: true,
    })
    .returning();

  return insertedJob;
}