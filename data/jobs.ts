import type { Job } from "@/types/job";

export const jobs: Job[] = [
  {
    id: 1,
    company: "Lone Star Technologies",
    title: "Software Engineering Intern",
    location: "Austin, TX",
    workType: "HYBRID",
    category: "SOFTWARE_ENGINEERING",
    season: "SUMMER_2027",
    skills: ["TypeScript", "React", "Node.js"],
    discoveredAt: "2026-09-03",
    applyUrl: "https://www.google.com/"
  },
  {
    id: 2,
    company: "Sentinel Security",
    title: "Cybersecurity Intern",
    location: "Dallas, TX",
    workType: "ONSITE",
    category: "CYBERSECURITY",
    season: "SUMMER_2027",
    skills: ["Python", "Linux", "Networking"],
    discoveredAt: "2026-09-02",
    applyUrl: "https://www.google.com/"
  },
  {
    id: 3,
    company: "CloudForge",
    title: "Cloud Security Intern",
    location: "Remote",
    workType: "REMOTE",
    category: "CYBERSECURITY",
    season: "FALL_2027",
    skills: ["AWS", "Python", "Cloud Security"],
    discoveredAt: "2026-09-01",
    applyUrl: "https://www.google.com/"
  },
];