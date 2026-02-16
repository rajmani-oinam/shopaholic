# Data Model: Goal Dashboard — "Do It"

**Feature**: `001-goal-dashboard`
**Date**: 2026-02-16

## Entities

### Goal

Represents a single objective the user wants to achieve.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique identifier (generated via `crypto.randomUUID()`) |
| `title` | `string` | Yes | Goal description (1–100 characters) |
| `endDate` | `string` (ISO 8601) | Yes | Target completion date, stored as `"YYYY-MM-DD"` |
| `status` | `GoalStatus` | Yes | `"active"` or `"completed"` |
| `createdAt` | `string` (ISO 8601) | Yes | Timestamp when goal was created |
| `completedAt` | `string \| null` (ISO 8601) | No | Timestamp when goal was completed; `null` while active |

### GoalStatus (union type)

```typescript
type GoalStatus = 'active' | 'completed';
```

## Type Definitions

```typescript
// types/Goal.ts

type GoalStatus = 'active' | 'completed';

interface Goal {
  id: string;
  title: string;
  endDate: string;       // "YYYY-MM-DD"
  status: GoalStatus;
  createdAt: string;     // ISO 8601 datetime
  completedAt: string | null;
}

interface NewGoalInput {
  title: string;
  endDate: string;       // "YYYY-MM-DD"
}
```

## Validation Rules

| Rule | Field | Constraint |
|------|-------|------------|
| Title required | `title` | Must be non-empty after trimming |
| Title max length | `title` | ≤ 100 characters |
| End date required | `endDate` | Must be a valid date string |
| End date not in past | `endDate` | Must be ≥ today (at creation time) |
| Status transition | `status` | One-way: `active` → `completed` only; no revert |

## State Transitions

```
┌──────────┐   checkbox    ┌─────────────┐
│  active  │ ────────────► │  completed  │
└──────────┘               └─────────────┘
     │                           │
     │  delete (confirmed)       │  delete (confirmed)
     ▼                           ▼
 ┌──────────┐             ┌──────────┐
 │ removed  │             │ removed  │
 └──────────┘             └──────────┘
```

- `active → completed`: Triggered by checking the checkbox. Sets `completedAt` to current ISO timestamp.
- `active → removed`: Triggered by delete + confirmation. Goal is permanently deleted from state and localStorage.
- `completed → removed`: Same as above.
- `completed → active`: **PROHIBITED** — one-way transition per clarification.

## Computed Properties (not stored)

| Property | Derivation | Used for |
|----------|-----------|----------|
| `daysRemaining` | `differenceInCalendarDays(parseISO(goal.endDate), startOfDay(new Date()))` | Display on active goal cards |
| `isApproaching` | `daysRemaining >= 0 && daysRemaining <= 3` | Amber/orange highlight |
| `isOverdue` | `daysRemaining < 0` | Red/rose highlight |

## Sort Order

- **Active goals**: Ascending by `endDate` (soonest deadline first)
- **Completed goals**: Descending by `completedAt` (most recently completed first)

## Storage

- **Key**: `"do-it-goals"`
- **Format**: JSON array of `Goal` objects
- **Location**: `window.localStorage`
- **Serialization**: `JSON.stringify()` / `JSON.parse()`
- **Capacity**: ~5 MB per origin (browser limit)
