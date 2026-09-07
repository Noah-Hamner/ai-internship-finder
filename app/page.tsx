"use client";
import { useEffect, useState } from "react";
import type { Job } from "@/types/job";
import { ThemeToggle } from "@/components/theme-toggle";
export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [workType, setWorkType] = useState("ALL");
  const [location, setLocation] = useState ("ANYWHERE_US")
  const [season, setSeason] = useState("ALL");
useEffect(() => {
  async function loadJobs() {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }

    if (category !== "ALL") {
      params.set("category", category);
    }

    if (workType !== "ALL") {
      params.set("workType", workType);
    }

    if (season !== "ALL") {
      params.set("season", season);
    }

    if (location === "TEXAS") {
      params.set("location", "Texas");
    } else if (location === "REMOTE") {
      params.set("location", "Remote");
    } else if (location === "ANYWHERE_US") {
      params.set("location", "Anywhere US");
    }

    const response = await fetch(`/api/jobs?${params.toString()}`);
    const databaseJobs = await response.json();

    const formattedJobs: Job[] = databaseJobs.map(
      (job: Job & { firstDiscoveredAt: string }) => ({
        ...job,
        discoveredAt: job.firstDiscoveredAt,
      })
    );

    setJobs(formattedJobs);
  }

  loadJobs();
}, [search, category, workType, location, season]);

  return (
<main className="min-h-screen bg-slate-50 dark:bg-slate-950">
<section className="border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between gap-4">
<h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
  Internship Scout
</h1>

            <ThemeToggle />
          </div>

<p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
  Software engineering and cybersecurity internships, discovered and
  organized automatically.
</p>

          <input
            
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by role, company, skill, or location..."
            className="mt-8 w-full max-w-2xl rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
 <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <div>
    <label
      htmlFor="category"
      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
    >
      Role Category
    </label>

    <select
      id="category"
      value={category}
      onChange={(event) => setCategory(event.target.value)}
      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
      <option value="ALL">All</option>
      <option value="SOFTWARE_ENGINEERING">Software Engineering</option>
      <option value="CYBERSECURITY">Cybersecurity</option>
    </select>
  </div>

  <div>
    <label
      htmlFor="workType"
      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
    >
      Work Arrangement
    </label>

    <select
      id="workType"
      value={workType}
      onChange={(event) => setWorkType(event.target.value)}
      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
    >
      <option value="ALL">All</option>
      <option value="REMOTE">Remote</option>
      <option value="HYBRID">Hybrid</option>
      <option value="ONSITE">On-site</option>
    </select>
  </div>

  <div>
    <label
      htmlFor="location"
      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
    >
      Location
    </label>

    <select
      id="location"
      value={location}
      onChange={(event) => setLocation(event.target.value)}
      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
      <option value="ANYWHERE_US">Anywhere US</option>
      <option value="TEXAS">Texas</option>
      <option value="REMOTE">Remote</option>
    </select>
  </div>

  <div>
    <label
      htmlFor="season"
      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
    >
      Season
    </label>

    <select
      id="season"
      value={season}
      onChange={(event) => setSeason(event.target.value)}
      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
      <option value="ALL">All Seasons</option>
      <option value="SUMMER_2027">Summer 2027</option>
      <option value="FALL_2027">Fall 2027</option>
      <option value="SPRING_2028">Spring 2028</option>
    </select>
  </div>
</div>
        </div>
      </section>
      
      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
<div className="flex items-end justify-between gap-4">
  <div>
    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
      Opportunities
    </p>

  </div>
</div>

<div className="mt-6 grid gap-4">
  {jobs.map((job) => (
        
    <article
      key={job.id}
       className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"

    >
      <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">
  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
    {job.company}
  </p>

  <h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
    {job.title}
  </h3>

  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
    {job.location} · {job.workType}
  </p>

  <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
    {job.category === "SOFTWARE_ENGINEERING"
      ? "Software Engineering"
      : "Cybersecurity"}
  </p>
</div>

<span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
  {job.season.replaceAll("_", " ")}
</span>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/50 dark:text-blue-300">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Discovered {job.discoveredAt}
        </p>

<a
  href={job.applyUrl}
  target="_blank"
  rel="noopener noreferrer"  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
  Apply
<span aria-hidden="true">→</span>
</a>
      </div>
          </article>
  ))}
</div>
      </section>
    </main>
  );
}