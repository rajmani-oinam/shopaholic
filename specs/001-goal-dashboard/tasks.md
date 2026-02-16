# Tasks: Goal Dashboard — "Do It"

**Input**: Design documents from `/specs/001-goal-dashboard/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: NONE — per Constitution Principle V (NON-NEGOTIABLE). No unit tests, integration tests, or e2e tests.

**Organization**: Tasks are grouped by user story to enable independent implementation and verification of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single Next.js project**: `app/`, `components/`, `contexts/`, `hooks/`, `types/`, `utils/`, `lib/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies, configure Tailwind v4, initialize shadcn/ui, and establish project structure

- [ ] T001 Install Tailwind CSS v4 dependencies (`tailwindcss @tailwindcss/postcss postcss`) and create `postcss.config.mjs` with `@tailwindcss/postcss` plugin
- [ ] T002 Install `date-fns` dependency
- [ ] T003 Initialize shadcn/ui with `npx shadcn@latest init` (new-york style, App Router, `@/components/ui` path, `@/lib/utils` helper)
- [ ] T004 Add shadcn components: `npx shadcn@latest add button card checkbox dialog alert-dialog input label`
- [ ] T005 Rewrite `app/global.css` with Tailwind directives (`@import "tailwindcss"`) and `@theme` block defining pastel color tokens (pastel-bg, pastel-card, pastel-purple, pastel-blue, pastel-green, pastel-amber, pastel-rose, pastel-text, pastel-muted)
- [ ] T006 Update `app/layout.tsx` with "Do It" metadata (title, description), Tailwind body classes, and wrap children with `GoalProvider` from `contexts/GoalContext.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, utilities, context, and hooks that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 [P] Create Goal type definitions in `types/Goal.ts` — `GoalStatus` union type, `Goal` interface (id, title, endDate, status, createdAt, completedAt), `NewGoalInput` interface
- [ ] T008 [P] Create localStorage helpers in `utils/goalStorage.ts` — `loadGoals(): Goal[]`, `saveGoals(goals: Goal[]): void` with try/catch, using storage key `"do-it-goals"`
- [ ] T009 [P] Create date helper utilities in `utils/dateHelpers.ts` — `daysRemaining(endDate: string): number`, `isApproaching(endDate: string): boolean` (0–3 days), `isOverdue(endDate: string): boolean` (< 0 days) using date-fns `differenceInCalendarDays` and `startOfDay`
- [ ] T010 Create `GoalContext` with provider in `contexts/GoalContext.tsx` — "use client" component providing `goals: Goal[]`, `addGoal(input: NewGoalInput): void`, `completeGoal(id: string): void`, `deleteGoal(id: string): void`; initialize state as empty array, hydrate from localStorage in useEffect, sync back to localStorage on state changes
- [ ] T011 Create `useGoals` hook in `hooks/useGoals.ts` — wraps `useContext(GoalContext)` with a guard throw if used outside `GoalProvider`

**Checkpoint**: Foundation ready — all types, storage, date utilities, and state management are in place

---

## Phase 3: User Story 1 — View Current & Completed Goals (Priority: P1) 🎯 MVP

**Goal**: Display a two-column dashboard with "Current Goals" (left) and "Completed Goals" (right), each showing goal cards with title and days remaining, with empty-state messages when no goals exist

**Independent Test**: Open the app in a browser — two-column layout renders with headings and empty-state messages

### Implementation for User Story 1

- [ ] T012 [P] [US1] Create `GoalColumn` component in `components/GoalColumn.tsx` — accepts `title: string`, `goals: Goal[]`, `emptyMessage: string`, `type: 'active' | 'completed'`; renders column heading, empty-state message with icon when goals array is empty, and lists `GoalCard` components; column scrolls independently when content overflows
- [ ] T013 [P] [US1] Create `GoalCard` component in `components/GoalCard.tsx` — accepts `goal: Goal`, optional `onComplete`, `onDelete` callbacks; displays goal title (truncated at 2 lines with ellipsis), days remaining badge for active goals, checkbox for active goals, delete icon button; uses shadcn `Card` for container
- [ ] T014 [US1] Rewrite `app/page.tsx` as the "Do It" dashboard — "use client" page with header showing "Do It" title and "Add Goal" button; two-column grid layout (`grid-cols-1 sm:grid-cols-2`); left column renders `GoalColumn` with active goals sorted by endDate ascending; right column renders `GoalColumn` with completed goals sorted by completedAt descending; consumes `useGoals()` hook for data

**Checkpoint**: Dashboard displays two columns with headings and empty states. Goal cards render with title and days remaining. Layout stacks vertically on mobile (< 640 px).

---

## Phase 4: User Story 2 — Add a New Goal (Priority: P2)

**Goal**: Allow users to add new goals via a modal form with title and end date fields, including inline validation

**Independent Test**: Click "Add Goal" button, fill in both fields, submit — new goal appears in Current Goals column

### Implementation for User Story 2

- [ ] T015 [US2] Create `AddGoalModal` component in `components/AddGoalModal.tsx` — "use client" component using shadcn `Dialog`; accepts `open: boolean`, `onOpenChange: (open: boolean) => void`; contains form with `Input` for title (maxLength 100, required), native date `Input` for end date (required, min today); inline validation: "Title is required" if empty, "End date must be today or later" if past date; on valid submit calls `addGoal` from `useGoals()` and closes dialog; closes on Escape or click outside
- [ ] T016 [US2] Wire "Add Goal" button in `app/page.tsx` to open `AddGoalModal` — add `useState` for modal open state, render `AddGoalModal` with open/onOpenChange props

**Checkpoint**: Users can create goals. New goals appear in Current Goals column sorted by deadline. Modal validates inputs inline.

---

## Phase 5: User Story 3 — Complete a Goal (Priority: P3)

**Goal**: Allow users to check a checkbox on an active goal to move it to the Completed column

**Independent Test**: With at least one active goal, check its checkbox — goal moves to Completed Goals column with visual indicator

### Implementation for User Story 3

- [ ] T017 [US3] Wire checkbox `onComplete` handler in `GoalCard` component in `components/GoalCard.tsx` — when checkbox is checked on an active goal, call `onComplete(goal.id)`; for completed goals, show a checked/disabled visual indicator (no uncomplete control); completed goals display with strikethrough title text
- [ ] T018 [US3] Connect `completeGoal` from `useGoals()` to `GoalCard.onComplete` via `GoalColumn` in `app/page.tsx` — pass `completeGoal` as `onComplete` prop to active `GoalColumn`, omit `onComplete` for completed `GoalColumn`

**Checkpoint**: Checking a goal's checkbox moves it from Current to Completed. Completed goals show strikethrough and no revert control.

---

## Phase 6: User Story 4 — Delete a Goal (Priority: P4)

**Goal**: Allow users to permanently delete any goal (active or completed) with a confirmation dialog

**Independent Test**: Click delete on any goal, confirm in prompt — goal disappears and does not reappear after refresh

### Implementation for User Story 4

- [ ] T019 [P] [US4] Create `DeleteConfirm` component in `components/DeleteConfirm.tsx` — uses shadcn `AlertDialog`; accepts `open: boolean`, `onOpenChange: (open: boolean) => void`, `onConfirm: () => void`, `goalTitle: string`; shows "Delete this goal?" message with goal title, Cancel and Delete buttons
- [ ] T020 [US4] Wire delete flow in `GoalCard` and `app/page.tsx` — `GoalCard` delete icon button opens `DeleteConfirm` (local state for `deleteTargetId`); on confirm, call `deleteGoal(id)` from `useGoals()`; pass `onDelete` callback through `GoalColumn` for both active and completed columns

**Checkpoint**: Delete control visible on all goal cards. Clicking shows confirmation. Confirming removes goal permanently. Canceling keeps goal. Deletion persists across refresh.

---

## Phase 7: User Story 5 — Deadline Highlighting (Priority: P5)

**Goal**: Visually distinguish goals approaching their deadline (≤ 3 days, amber) and overdue goals (past deadline, rose) in the Current Goals column

**Independent Test**: Create goals with end dates 1, 3, and 5 days from today — first two highlighted amber, overdue goals highlighted rose

### Implementation for User Story 5

- [ ] T021 [US5] Add deadline highlighting styles to `GoalCard` in `components/GoalCard.tsx` — use `isApproaching()` and `isOverdue()` from `utils/dateHelpers.ts`; apply `bg-pastel-amber` (or amber border) for approaching goals, `bg-pastel-rose` (or rose border) for overdue goals; standard goals use `bg-pastel-card`; only apply highlighting to active goals

**Checkpoint**: Goals ≤ 3 days from deadline have warm amber highlight. Overdue goals have distinct rose highlight. Goals > 3 days away show no highlight.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements affecting multiple user stories

- [ ] T022 [P] Verify responsive layout across viewports (320 px – 2560 px) — ensure columns stack on mobile, no horizontal scroll, touch targets ≥ 44 × 44 px in `app/page.tsx` and `components/GoalCard.tsx`
- [ ] T023 [P] Verify WCAG AA color contrast for all text against pastel backgrounds — adjust `@theme` tokens in `app/global.css` if any text fails contrast check
- [ ] T024 [P] Add semantic HTML and ARIA labels — ensure `GoalCard` checkbox has accessible label, `DeleteConfirm` has proper alert dialog role, `AddGoalModal` has dialog aria-label, column headings use proper heading levels
- [ ] T025 Run `quickstart.md` manual verification checklist in `specs/001-goal-dashboard/quickstart.md` — verify all items pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–7)**: All depend on Foundational phase completion
  - User stories should proceed sequentially in priority order (P1 → P2 → P3 → P4 → P5) because:
    - US2 (Add Goal) needs the dashboard layout from US1
    - US3 (Complete) and US4 (Delete) need goal cards from US1
    - US5 (Highlighting) refines the card styles from US1
- **Polish (Phase 8)**: Depends on all user stories being complete

### Within Each User Story

- Models/types before services/context (already in Phase 2)
- Context before components
- Components before page integration
- Core implementation before refinements

### Parallel Opportunities

- **Phase 1**: T001 and T002 can run in parallel (independent installs). T003 depends on T001. T004 depends on T003.
- **Phase 2**: T007, T008, T009 can all run in parallel (independent files). T010 depends on T007, T008, T009. T011 depends on T010.
- **Phase 3**: T012 and T013 can run in parallel (independent components). T014 depends on T012, T013.
- **Phase 4**: T015 sequential (depends on Dialog from shadcn). T016 depends on T015.
- **Phase 5**: T017 depends on T013 being wired. T018 depends on T017.
- **Phase 6**: T019 can start independently. T020 depends on T019.
- **Phase 7**: T021 depends on T013 (GoalCard) being complete.
- **Phase 8**: T022, T023, T024 can all run in parallel. T025 depends on all others.

---

## Parallel Example: Phase 2 (Foundational)

```
T007 (types/Goal.ts)  ─────┐
T008 (utils/goalStorage.ts) ├──► T010 (contexts/GoalContext.tsx) ──► T011 (hooks/useGoals.ts)
T009 (utils/dateHelpers.ts) ┘
```

## Parallel Example: Phase 3 (User Story 1)

```
T012 (GoalColumn.tsx) ─┐
                       ├──► T014 (app/page.tsx dashboard)
T013 (GoalCard.tsx)  ──┘
```

---

## Implementation Strategy

1. **MVP = Phase 1 + Phase 2 + Phase 3 (User Story 1)**: Delivers a visible dashboard with two columns and goal card rendering. No interactivity yet, but the core layout is in place.
2. **First interactive increment = + Phase 4 (User Story 2)**: Users can add goals. Combined with US1, this is the minimal useful product.
3. **Full workflow = + Phase 5 + Phase 6 (User Stories 3 & 4)**: Complete, delete — the full CRUD loop.
4. **Polished = + Phase 7 + Phase 8 (User Story 5 + Polish)**: Visual refinements and accessibility verification.
