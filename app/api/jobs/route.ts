import { db } from "@/lib/db";
import { jobs } from "@/lib/schema";
import { and, eq, ilike, or, sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const workType = searchParams.get("workType");
    const season = searchParams.get("season");
    const location = searchParams.get("location");
    const search = searchParams.get("search");
    console.log("Search received:", search); //temp
    console.log("Location received:", location); //temp
    console.log("Category received:", category); //tempt
    const conditions = [];
        if (
    category !== null &&
    category !== "SOFTWARE_ENGINEERING" &&
    category !== "CYBERSECURITY"
    ) {
    return Response.json(
        { error: "Invalid category" },
        { status: 400 }
    );
    }

    if (
    workType !== null &&
    workType !== "REMOTE" &&
    workType !== "HYBRID" &&
    workType !== "ONSITE"
    ) {
    return Response.json(
        { error: "Invalid workType" },
        { status: 400 }
    );

    }
    if (
    season !== null &&
    season !== "SUMMER_2027" &&
    season !== "FALL_2027" &&
    season !== "SPRING_2028"
    ) {
    return Response.json(
        { error: "Invalid season" },
        { status: 400 }
    );
    }
    if (
  location !== null &&
  location !== "Texas" &&
  location !== "Remote" &&
  location !== "Anywhere US"
) {
  return Response.json(
    { error: "Invalid location" },
    { status: 400 }
  );
}
    if (category) {
    conditions.push(eq(jobs.category, category));
    }

    if (workType) {
    conditions.push(eq(jobs.workType, workType));
    }
    if (season) {
  conditions.push(eq(jobs.season, season));
}
    if (location === "Texas") {
    conditions.push(eq(jobs.state, "TX"));
    }

    if (location === "Remote") {
    conditions.push(eq(jobs.workType, "REMOTE"));
    }

    if (location === "Anywhere US") {
    conditions.push(eq(jobs.country, "US"));
    }
if (search) {
  conditions.push(
    or(
      ilike(jobs.title, `%${search}%`),
      ilike(jobs.company, `%${search}%`),
      ilike(jobs.location, `%${search}%`),
      sql`array_to_string(${jobs.skills}, ' ') ILIKE ${`%${search}%`}`
    )!
  );
}

    const result =
    conditions.length > 0
        ? await db.select().from(jobs).where(and(...conditions))
        : await db.select().from(jobs);

    return Response.json(result);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);

    return Response.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}