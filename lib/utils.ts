import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateProjectProgress(project: {
  milestones: {
    steps: { completed: boolean }[];
  }[];
}): number {
  const allSteps = project.milestones.flatMap((m) => m.steps);
  const total = allSteps.length;
  const completed = allSteps.filter((s) => s.completed).length;

  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

