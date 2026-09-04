export type Job = {
  id: number;
  company: string;
  title: string;
  location: string;
  workType: "REMOTE" | "HYBRID" | "ONSITE";
  category: "SOFTWARE_ENGINEERING" | "CYBERSECURITY";
  season: "SUMMER_2027" | "FALL_2027" | "SPRING_2028";
  skills: string[];
  discoveredAt: string;
  applyUrl: string;
};