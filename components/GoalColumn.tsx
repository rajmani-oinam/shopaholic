'use client';

import type { Goal } from '@/types/Goal';
import { GoalCard } from '@/components/GoalCard';
import { Target, CheckCircle2 } from 'lucide-react';

interface GoalColumnProps {
  title: string;
  goals: Goal[];
  emptyMessage: string;
  type: 'active' | 'completed';
  onComplete?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const GoalColumn: React.FC<GoalColumnProps> = ({
  title,
  goals,
  emptyMessage,
  type,
  onComplete,
  onDelete,
}) => {
  return (
    <section className="flex flex-col gap-4 min-h-0">
      <h2 className="text-xl font-semibold text-pastel-text flex items-center gap-2">
        {type === 'active' ? (
          <Target className="size-5 text-pastel-purple" />
        ) : (
          <CheckCircle2 className="size-5 text-pastel-green" />
        )}
        {title}
        <span className="text-sm font-normal text-pastel-muted">({goals.length})</span>
      </h2>
      <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1">
        {goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-pastel-muted">
            {type === 'active' ? (
              <Target className="size-10 mb-3 opacity-40" />
            ) : (
              <CheckCircle2 className="size-10 mb-3 opacity-40" />
            )}
            <p className="text-sm">{emptyMessage}</p>
          </div>
        ) : (
          goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
};
