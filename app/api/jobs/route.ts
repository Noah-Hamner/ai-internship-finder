import { db } from "@/lib/db";
import { jobs } from "@/lib/schema";

export async function GET() {
  try {
    const result = await db.select().from(jobs);

    return Response.json(result);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);

    return Response.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}