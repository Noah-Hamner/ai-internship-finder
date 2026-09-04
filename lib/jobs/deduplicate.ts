export function normalizeForDedup(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function createJobDedupKey(job: {
  company: string;
  title: string;
  location: string;
  season: string;
}) {
  return [
    normalizeForDedup(job.company),
    normalizeForDedup(job.title),
    normalizeForDedup(job.location),
    job.season,
  ].join("|");
}