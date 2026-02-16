import { useContext } from 'react';
import { GoalContext } from '@/contexts/GoalContext';
import type { GoalContextValue } from '@/contexts/GoalContext';

/**
 * Custom hook to access the GoalContext.
 * Must be used within a GoalProvider.
 */
export function useGoals(): GoalContextValue {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
}
