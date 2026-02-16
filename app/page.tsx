'use client';

import { useState } from 'react';
import { useGoals } from '@/hooks/useGoals';
import { GoalColumn } from '@/components/GoalColumn';
import { AddGoalModal } from '@/components/AddGoalModal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Page() {
  const { goals, completeGoal, deleteGoal } = useGoals();
  const [addModalOpen, setAddModalOpen] = useState(false);

  const activeGoals = goals
    .filter((g) => g.status === 'active')
    .sort((a, b) => a.endDate.localeCompare(b.endDate));

  const completedGoals = goals
    .filter((g) => g.status === 'completed')
    .sort((a, b) => {
      if (!b.completedAt || !a.completedAt) return 0;
      return b.completedAt.localeCompare(a.completedAt);
    });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-pastel-purple/30">
        <h1 className="text-2xl font-bold text-pastel-text">Do It</h1>
        <Button
          onClick={() => setAddModalOpen(true)}
          className="bg-pastel-purple text-pastel-text hover:bg-pastel-purple/80 cursor-pointer gap-1.5"
        >
          <Plus className="size-4" />
          Add Goal
        </Button>
      </header>

      {/* Dashboard columns */}
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 sm:p-6 max-w-6xl mx-auto w-full">
        <GoalColumn
          title="Current Goals"
          goals={activeGoals}
          emptyMessage="No active goals yet. Click 'Add Goal' to get started!"
          type="active"
          onComplete={completeGoal}
          onDelete={deleteGoal}
        />
        <GoalColumn
          title="Completed Goals"
          goals={completedGoals}
          emptyMessage="No completed goals yet. Keep going!"
          type="completed"
          onDelete={deleteGoal}
        />
      </main>

      {/* Add Goal Modal */}
      <AddGoalModal open={addModalOpen} onOpenChange={setAddModalOpen} />
    </div>
  );
}