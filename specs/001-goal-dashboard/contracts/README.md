# Contracts: Goal Dashboard — "Do It"

This feature is entirely client-side. There are no API routes, no backend endpoints, and no server-side data contracts.

All data flows through React Context (`GoalContext`) and is persisted to `localStorage`.

## Internal Component Contracts

### GoalContext API

| Method | Signature | Description |
|--------|-----------|-------------|
| `goals` | `Goal[]` | All goals (active + completed) |
| `addGoal` | `(input: NewGoalInput) => void` | Create a new active goal |
| `completeGoal` | `(id: string) => void` | Move an active goal to completed |
| `deleteGoal` | `(id: string) => void` | Permanently remove a goal |

### Component Props

| Component | Props | Description |
|-----------|-------|-------------|
| `GoalCard` | `goal: Goal; onComplete?: (id: string) => void; onDelete: (id: string) => void` | Renders a single goal card |
| `GoalColumn` | `title: string; goals: Goal[]; emptyMessage: string; type: 'active' \| 'completed'` | Renders a column of goals |
| `AddGoalModal` | `open: boolean; onOpenChange: (open: boolean) => void` | Modal form for adding a new goal |
| `DeleteConfirm` | `open: boolean; onOpenChange: (open: boolean) => void; onConfirm: () => void; goalTitle: string` | Confirmation dialog for deletion |
