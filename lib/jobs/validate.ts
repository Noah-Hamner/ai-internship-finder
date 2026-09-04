import { z } from "zod";

export const discoveredJobSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),

  work_type: z.enum([
    "REMOTE",
    "HYBRID",
    "ONSITE",
    "UNKNOWN",
  ]),

  category: z.enum([
    "SOFTWARE_ENGINEERING",
    "CYBERSECURITY",
  ]),

  season: z.enum([
    "SUMMER_2027",
    "FALL_2027",
    "SPRING_2028",
    "UNKNOWN",
  ]),

  description: z.string(),

  skills: z.array(z.string()),

apply_url: z.httpUrl(),
source_url: z.httpUrl(),

  confidence: z.number().min(0).max(1),
});

export const discoveredJobsSchema = z.array(discoveredJobSchema);