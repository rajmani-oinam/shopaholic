'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGoals } from '@/hooks/useGoals';
import { format } from 'date-fns';

interface AddGoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({ open, onOpenChange }) => {
  const { addGoal } = useGoals();
  const [title, setTitle] = useState('');
  const [endDate, setEndDate] = useState('');
  const [titleError, setTitleError] = useState('');
  const [dateError, setDateError] = useState('');

  const today = format(new Date(), 'yyyy-MM-dd');

  const resetForm = () => {
    setTitle('');
    setEndDate('');
    setTitleError('');
    setDateError('');
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };

  const validate = (): boolean => {
    let valid = true;

    if (!title.trim()) {
      setTitleError('Title is required');
      valid = false;
    } else {
      setTitleError('');
    }

    if (!endDate) {
      setDateError('End date is required');
      valid = false;
    } else if (endDate < today) {
      setDateError('End date must be today or later');
      valid = false;
    } else {
      setDateError('');
    }

    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addGoal({ title: title.trim(), endDate });
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent aria-label="Add a new goal">
        <DialogHeader>
          <DialogTitle>Add New Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="goal-title">Title</Label>
            <Input
              id="goal-title"
              type="text"
              placeholder="What do you want to achieve?"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError('');
              }}
              maxLength={100}
              aria-invalid={!!titleError}
              aria-describedby={titleError ? 'title-error' : undefined}
            />
            {titleError && (
              <p id="title-error" className="text-sm text-destructive">
                {titleError}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="goal-end-date">End Date</Label>
            <Input
              id="goal-end-date"
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                if (dateError) setDateError('');
              }}
              min={today}
              aria-invalid={!!dateError}
              aria-describedby={dateError ? 'date-error' : undefined}
            />
            {dateError && (
              <p id="date-error" className="text-sm text-destructive">
                {dateError}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="cursor-pointer">
              Add Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
