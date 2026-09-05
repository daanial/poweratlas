/** SSR-safe visit flags. Missing storage (private mode) is treated as first visit. */

export const VISIT_KEYS = {
  experiencePath: "poweratlas-experience-path",
  atlasTour: "poweratlas-atlas-tour-v1",
  labTour: "poweratlas-lab-tour-v1",
  labBrief: "poweratlas-lab-brief-v1",
  countriesTour: "poweratlas-countries-tour-v1",
} as const;

export type ExperiencePath = "short" | "full";

export function readVisitFlag(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeVisitFlag(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* quota / private mode */
  }
}
