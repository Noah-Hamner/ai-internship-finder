export function normalizeWorkType(value: string) {
  const normalized = value.trim().toLowerCase();

  if (
    normalized === "remote" ||
    normalized === "work from home" ||
    normalized === "wfh"
  ) {
    return "REMOTE";
  }

  if (normalized === "hybrid") {
    return "HYBRID";
  }

  if (
    normalized === "onsite" ||
    normalized === "on-site" ||
    normalized === "on site"
  ) {
    return "ONSITE";
  }

  return "UNKNOWN";
}

export function normalizeCategory(value: string) {
  const normalized = value.trim().toLowerCase();

  if (
    normalized === "software engineering" ||
    normalized === "software_engineering" ||
    normalized === "swe"
  ) {
    return "SOFTWARE_ENGINEERING";
  }

  if (
    normalized === "cybersecurity" ||
    normalized === "cyber security" ||
    normalized === "security"
  ) {
    return "CYBERSECURITY";
  }

  return null;
}

export function normalizeCompany(value: string) {
  return value.trim();
}

export function normalizeDiscoveredJobInput(value: unknown): unknown {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return value;
  }

  const job = value as Record<string, unknown>;

  return {
    ...job,

    company:
      typeof job.company === "string"
        ? normalizeCompany(job.company)
        : job.company,

    work_type:
      typeof job.work_type === "string"
        ? normalizeWorkType(job.work_type)
        : job.work_type,

    category:
      typeof job.category === "string"
        ? normalizeCategory(job.category) ?? job.category
        : job.category,
  };
}

export function normalizeDiscoveredJobsInput(value: unknown): unknown {
  if (!Array.isArray(value)) {
    return value;
  }

  return value.map(normalizeDiscoveredJobInput);
}