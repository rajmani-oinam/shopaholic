'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { Goal, NewGoalInput } from '@/types/Goal';
import { loadGoals, saveGoals } from '@/utils/goalStorage';

export interface GoalContextValue {
  goals: Goal[];
  addGoal: (input: NewGoalInput) => void;
  completeGoal: (id: string) => void;
  deleteGoal: (id: string) => void;
}

export const GoalContext = createContext<GoalContextValue | undefined>(undefined);

interface GoalProviderProps {
  children: ReactNode;
}

export const GoalProvider: React.FC<GoalProviderProps> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const hydrated = useRef(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = loadGoals();
    if (stored.length > 0) {
      setGoals(stored);
    }
    hydrated.current = true;
  }, []);

  // Sync to localStorage whenever goals change (after hydration)
  useEffect(() => {
    if (hydrated.current) {
      saveGoals(goals);
    }
  }, [goals]);

  const addGoal = useCallback((input: NewGoalInput) => {
    const newGoal: Goal = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      endDate: input.endDate,
      status: 'active',
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setGoals((prev) => [...prev, newGoal]);
  }, []);

  const completeGoal = useCallback((id: string) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === id && goal.status === 'active'
          ? { ...goal, status: 'completed' as const, completedAt: new Date().toISOString() }
          : goal
      )
    );
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  }, []);

  const value = useMemo<GoalContextValue>(
    () => ({ goals, addGoal, completeGoal, deleteGoal }),
    [goals, addGoal, completeGoal, deleteGoal]
  );

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};
