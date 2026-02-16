import type { Goal } from '@/types/Goal';

const STORAGE_KEY = 'do-it-goals';

export function loadGoals(): Goal[] {
  try {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Goal[];
    }
    return [];
  } catch {
    return [];
  }
}

export function saveGoals(goals: Goal[]): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch {
    // Ignore quota exceeded or other storage errors
  }
}
