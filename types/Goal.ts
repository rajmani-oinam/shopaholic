export type GoalStatus = 'active' | 'completed';

export interface Goal {
  id: string;
  title: string;
  endDate: string; // "YYYY-MM-DD"
  status: GoalStatus;
  createdAt: string; // ISO 8601 datetime
  completedAt: string | null;
}

export interface NewGoalInput {
  title: string;
  endDate: string; // "YYYY-MM-DD"
}
