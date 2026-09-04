import { NextRequest, NextResponse } from "next/server";

import { normalizeDiscoveredJobsInput } from "@/lib/jobs/normalize";
import { discoveredJobsSchema } from "@/lib/jobs/validate";
import { upsertDiscoveredJob } from "@/lib/jobs/upsert";

export async function POST(request: NextRequest) {
  const ingestSecret = process.env.INGEST_SECRET;

  if (!ingestSecret) {
    console.error("INGEST_SECRET is not configured");

    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const authorization = request.headers.get("authorization");

  if (authorization !== `Bearer ${ingestSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const normalized = normalizeDiscoveredJobsInput(body);

  const validationResult = discoveredJobsSchema.safeParse(normalized);

  if (!validationResult.success) {
    return NextResponse.json(
      {
        error: "Invalid job data",
        issues: validationResult.error.issues,
      },
      { status: 400 }
    );
  }

  const savedJobs = [];

  for (const job of validationResult.data) {
    const savedJob = await upsertDiscoveredJob(job);
    savedJobs.push(savedJob);
  }

  return NextResponse.json({
    success: true,
    processed: savedJobs.length,
    jobs: savedJobs,
  });
}