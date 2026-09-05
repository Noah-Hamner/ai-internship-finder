-- Schema for the AI Internship Finder "jobs" table.
-- Mirrors lib/schema.ts. Idempotent so it can run on every boot.
CREATE TABLE IF NOT EXISTS jobs (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

  title text NOT NULL,
  company text NOT NULL,

  location text NOT NULL,
  state text,
  country text NOT NULL DEFAULT 'US',

  work_type text NOT NULL,
  category text NOT NULL,
  season text NOT NULL,

  description text,
  skills text[] NOT NULL DEFAULT '{}',

  dedup_key text NOT NULL UNIQUE,
  apply_url text NOT NULL UNIQUE,
  source_url text,

  first_discovered_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  last_verified_at timestamptz,

  is_active boolean NOT NULL DEFAULT true,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
