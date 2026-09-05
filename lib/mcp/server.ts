import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import { normalizeDiscoveredJobsInput } from "@/lib/jobs/normalize";
import { discoveredJobsSchema } from "@/lib/jobs/validate";
import { upsertDiscoveredJob } from "@/lib/jobs/upsert";

export function createInternshipMcpServer() {
  const server = new McpServer({
    name: "ai-internship-finder",
    version: "1.0.0",
  });

  server.registerTool(
    "submit_internships",
    {
      title: "Submit internships",
      description:
        "Submit discovered internship postings to the AI Internship Finder database.",
      inputSchema: {
        jobs: z.array(z.unknown()),
      },
    },
    async ({ jobs }) => {
      const normalized = normalizeDiscoveredJobsInput(jobs);

      const validationResult = discoveredJobsSchema.safeParse(normalized);

      if (!validationResult.success) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: "Invalid job data",
                issues: validationResult.error.issues,
              }),
            },
          ],
        };
      }

      const savedJobs = [];

      for (const job of validationResult.data) {
        const savedJob = await upsertDiscoveredJob(job);
        savedJobs.push(savedJob);
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              success: true,
              processed: savedJobs.length,
              jobIds: savedJobs.map((job) => job.id),
            }),
          },
        ],
      };
    }
  );

  return server;
}