'use client';

import { useState } from 'react';
import type { Goal } from '@/types/Goal';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { daysRemaining, isApproaching, isOverdue } from '@/utils/dateHelpers';
import { cn } from '@/lib/utils';
import { DeleteConfirm } from '@/components/DeleteConfirm';

interface GoalCardProps {
  goal: Goal;
  onComplete?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onComplete, onDelete }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isActive = goal.status === 'active';
  const remaining = isActive ? daysRemaining(goal.endDate) : null;

  const cardBg = isActive
    ? isOverdue(goal.endDate)
      ? 'border-pastel-rose bg-pastel-rose/30'
      : isApproaching(goal.endDate)
        ? 'border-pastel-amber bg-pastel-amber/30'
        : 'bg-pastel-card'
    : 'bg-pastel-card';

  const badgeLabel = (): string => {
    if (remaining === null) return '';
    if (remaining < 0) return `${Math.abs(remaining)}d overdue`;
    if (remaining === 0) return 'Due today';
    return `${remaining}d left`;
  };

  const badgeColor = (): string => {
    if (remaining === null) return '';
    if (remaining < 0) return 'bg-pastel-rose text-pastel-text';
    if (remaining <= 3) return 'bg-pastel-amber text-pastel-text';
    return 'bg-pastel-blue text-pastel-text';
  };

  return (
    <>
      <Card className={cn('py-3 gap-0', cardBg)}>
        <CardContent className="flex items-start gap-3 px-4 py-0">
          {/* Checkbox for active goals, checked indicator for completed */}
          {isActive ? (
            <Checkbox
              className="mt-0.5 size-5 cursor-pointer"
              aria-label={`Complete goal: ${goal.title}`}
              checked={false}
              onCheckedChange={() => onComplete?.(goal.id)}
            />
          ) : (
            <Checkbox
              className="mt-0.5 size-5"
              checked={true}
              disabled
              aria-label={`Goal completed: ${goal.title}`}
            />
          )}

          {/* Goal title and badge */}
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                'text-sm font-medium line-clamp-2',
                !isActive && 'line-through text-pastel-muted'
              )}
            >
              {goal.title}
            </p>
            {isActive && remaining !== null && (
              <span
                className={cn(
                  'inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full',
                  badgeColor()
                )}
              >
                {badgeLabel()}
              </span>
            )}
          </div>

          {/* Delete button */}
          {onDelete && (
            <button
              type="button"
              onClick={() => setShowDeleteDialog(true)}
              className="p-1.5 rounded-md hover:bg-pastel-rose/40 text-pastel-muted hover:text-pastel-text transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Delete goal: ${goal.title}`}
            >
              <Trash2 className="size-4" />
            </button>
          )}
        </CardContent>
      </Card>

      {onDelete && (
        <DeleteConfirm
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={() => {
            onDelete(goal.id);
            setShowDeleteDialog(false);
          }}
          goalTitle={goal.title}
        />
      )}
    </>
  );
};
