import { differenceInCalendarDays, startOfDay } from 'date-fns';

/**
 * Returns the number of calendar days remaining until the given end date.
 * Positive = days until deadline, 0 = today, negative = overdue.
 */
export function daysRemaining(endDate: string): number {
  const target = new Date(endDate);
  const today = startOfDay(new Date());
  return differenceInCalendarDays(target, today);
}

/**
 * Returns true if the goal's deadline is within 0–3 calendar days (inclusive).
 */
export function isApproaching(endDate: string): boolean {
  const remaining = daysRemaining(endDate);
  return remaining >= 0 && remaining <= 3;
}

/**
 * Returns true if the goal's deadline has passed (negative days remaining).
 */
export function isOverdue(endDate: string): boolean {
  return daysRemaining(endDate) < 0;
}
