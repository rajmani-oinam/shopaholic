# Quickstart: Goal Dashboard — "Do It"

**Feature**: `001-goal-dashboard`
**Date**: 2026-02-16

## Prerequisites

- Node.js LTS (v20+)
- npm

## Setup

```bash
# 1. Switch to feature branch
git checkout 001-goal-dashboard

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Dependency Installation (run once during implementation)

```bash
# Tailwind CSS v4
npm install tailwindcss @tailwindcss/postcss postcss

# date-fns
npm install date-fns

# shadcn/ui initialization (generates components.json + lib/utils.ts)
npx shadcn@latest init

# shadcn components (copies source to components/ui/)
npx shadcn@latest add button card checkbox dialog alert-dialog input label
```

## Manual Verification Checklist

Per Constitution Principle V, there are NO automated tests. Use this checklist for manual verification.

### Dashboard Layout (US1)
- [ ] Two columns visible: "Current Goals" (left) and "Completed Goals" (right)
- [ ] Empty-state messages shown when no goals exist
- [ ] On mobile (≤ 640 px), columns stack vertically
- [ ] App title "Do It" visible in header

### Add Goal (US2)
- [ ] "Add Goal" button opens a modal
- [ ] Modal has Title and End Date fields
- [ ] Submitting with empty title shows validation error
- [ ] Submitting with past end date shows validation error
- [ ] Title enforces 100-character limit
- [ ] Successful submission closes modal and adds goal to Current Goals
- [ ] Clicking outside modal or pressing Escape closes it

### Complete Goal (US3)
- [ ] Checking checkbox moves goal from Current to Completed column
- [ ] Completed goal shows strikethrough or visual indicator
- [ ] No "uncomplete" control visible on completed goals

### Delete Goal (US4)
- [ ] Delete control visible on both active and completed goals
- [ ] Clicking delete shows confirmation prompt
- [ ] Confirming removes the goal permanently
- [ ] Canceling keeps the goal
- [ ] Deleted goals do not reappear after page refresh

### Deadline Highlighting (US5)
- [ ] Goals ≤ 3 days from deadline have amber/orange highlight
- [ ] Overdue goals have red/rose highlight (visually distinct from amber)
- [ ] Goals > 3 days away have no highlight

### Persistence
- [ ] Goals survive page refresh
- [ ] Active goals sorted by soonest deadline first
- [ ] Completed goals sorted by most recently completed first

### Responsive & Theme
- [ ] Pastel color theme applied (light background, soft card colors)
- [ ] WCAG AA contrast met for all text
- [ ] No horizontal scroll on any viewport (320 px – 2560 px)
- [ ] Touch targets ≥ 44 × 44 px on mobile

## Project Structure

```
app/
├── layout.tsx           # Root layout
├── page.tsx             # Dashboard page
├── global.css           # Tailwind + @theme tokens
├── theme-provider.tsx   # Theme context
└── theme-toggle.tsx     # Theme toggle

components/
├── ui/                  # shadcn components
├── GoalCard.tsx
├── GoalColumn.tsx
├── AddGoalModal.tsx
└── DeleteConfirm.tsx

contexts/GoalContext.tsx
hooks/useGoals.ts
types/Goal.ts
utils/goalStorage.ts
utils/dateHelpers.ts
lib/utils.ts
```
