"use client";

import { useEffect, useState } from "react";
import type { Job } from "@/types/job";

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
    <main className="min-h-screen bg-slate-50">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Internship Finder
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Discover software engineering and cybersecurity internships across
            the United States.
          </p>

          <input
            
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by role, company, skill, or location..."
            className="mt-8 w-full max-w-2xl rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
            
          />
          <div className="mt-4">
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Role Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500"
            >
              <option value="ALL">All</option>
              <option value="SOFTWARE_ENGINEERING">
                Software Engineering
              </option>
              <option value="CYBERSECURITY">
                Cybersecurity
              </option>
            </select>
            <div className="mt-4">
            <label
              htmlFor="workType"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Work Arrangement
            </label>

            <select
              id="workType"
              value={workType}
              onChange={(event) => setWorkType(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500"
            >
              <option value="ALL">All</option>
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
              <option value="ONSITE">On-site</option>
            </select>
            <div className="mt-4">
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Location
            </label>

            <select
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500"
            >
              <option value="ANYWHERE_US">Anywhere US</option>
              <option value="TEXAS">Texas</option>
              <option value="REMOTE">Remote</option>
            </select>
            <div className="mt-4">
  <label
    htmlFor="season"
    className="mb-2 block text-sm font-medium text-slate-700"
  >
    Season
  </label>

  <select
    id="season"
    value={season}
    onChange={(event) => setSeason(event.target.value)}
    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 outline-none focus:border-blue-500"
  >
    <option value="ALL">All Seasons</option>
    <option value="SUMMER_2027">Summer 2027</option>
    <option value="FALL_2027">Fall 2027</option>
    <option value="SPRING_2028">Spring 2028</option>
  </select>
</div>
        </div>
          </div>
          </div>
        </div>
      
      </section>
      
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-semibold text-slate-900">
          Internship Opportunities
        </h2>

<div className="mt-6 grid gap-4">
  {jobs.map((job) => (
        
    <article
      key={job.id}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {job.company}
          </p>

          <h3 className="mt-1 text-xl font-semibold text-slate-900">
            {job.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {job.location} · {job.workType}
          </p>

          <p className="mt-2 text-sm font-medium text-slate-600">
            {job.category === "SOFTWARE_ENGINEERING"
              ? "Software Engineering"
              : "Cybersecurity"}
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {job.season}
        </span>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-blue-50 px-2.5 py-1 text-sm text-blue-700"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Discovered {job.discoveredAt}
        </p>

<a
  href={job.applyUrl}
  target="_blank"
  rel="noopener noreferrer"  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
>
  Apply
</a>
      </div>
          </article>
  ))}
</div>
      </section>
    </main>
  );
}