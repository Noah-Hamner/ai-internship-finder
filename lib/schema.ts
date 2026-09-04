import {
  bigint,
  boolean,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: bigint("id", { mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),

  title: text("title").notNull(),
  company: text("company").notNull(),

  location: text("location").notNull(),
  state: text("state"),
  country: text("country").notNull().default("US"),

  workType: text("work_type").notNull(),
  category: text("category").notNull(),
  season: text("season").notNull(),

  description: text("description"),
  skills: text("skills").array().notNull().default([]),
dedupKey: text("dedup_key").notNull().unique(),
  applyUrl: text("apply_url").notNull().unique(),
  sourceUrl: text("source_url"),

  firstDiscoveredAt: timestamp("first_discovered_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  lastSeenAt: timestamp("last_seen_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  lastVerifiedAt: timestamp("last_verified_at", {
    withTimezone: true,
  }),

  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});