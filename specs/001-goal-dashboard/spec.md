# Feature Specification: Goal Dashboard — "Do It"

**Feature Branch**: `001-goal-dashboard`
**Created**: 2026-02-16
**Status**: Draft
**Input**: User description: "initial page setup dash — goal tracking web app called Do It with two-column layout for current and completed goals, checkbox to complete or delete goals, modal form to add new goals with title and end date, 3-day deadline highlighting, modern light theme with pastel colors"

## User Scenarios & Testing *(mandatory)*

### User Story 1 — View Current & Completed Goals (Priority: P1)

A user opens the "Do It" app and immediately sees a two-column dashboard. The left column ("Current Goals") lists all active goals, each showing its title and the number of days remaining until the end date. The right column ("Completed Goals") lists goals the user has already finished. If there are no goals in either column, a friendly empty-state message is shown.

**Why this priority**: Without the dashboard layout and goal display, no other feature has a surface to operate on. This is the foundational view.

**Independent Test**: Open the app in a browser. The two-column layout renders with appropriate headings and empty-state messages when no goals exist yet.

**Acceptance Scenarios**:

1. **Given** no goals exist, **When** the user opens the app, **Then** both columns display with headings "Current Goals" and "Completed Goals" and each shows an empty-state message (e.g., "No goals yet — add one!").
2. **Given** three active goals and one completed goal exist, **When** the user opens the app, **Then** the left column shows three goal cards with title and days remaining sorted by soonest deadline first, and the right column shows one completed goal card.
3. **Given** a goal with an end date 2 days from today, **When** the dashboard renders, **Then** that goal card is visually highlighted to indicate the deadline is approaching.
4. **Given** the user is on a mobile device (≤ 640 px), **When** the dashboard loads, **Then** the two columns stack vertically (current goals on top, completed goals below) with no horizontal scroll.

---

### User Story 2 — Add a New Goal (Priority: P2)

A user clicks an "Add Goal" button visible on the dashboard. A modal dialog appears with a form containing two fields: "Title" (text) and "End Date" (date picker). The user fills in both fields and submits. The modal closes and the new goal appears in the Current Goals column with the correct days-remaining count.

**Why this priority**: Adding goals is the primary write action — without it the dashboard is static and delivers no value.

**Independent Test**: Click the "Add Goal" button, fill in both fields, submit, and verify the new goal appears in the left column with the correct days-remaining value.

**Acceptance Scenarios**:

1. **Given** the dashboard is displayed, **When** the user clicks the "Add Goal" button, **Then** a modal opens with "Title" and "End Date" fields and a "Save" button.
2. **Given** the modal is open, **When** the user submits with both fields filled, **Then** the modal closes and the new goal appears in the Current Goals column.
3. **Given** the modal is open, **When** the user submits with the title field empty, **Then** an inline validation message appears ("Title is required") and the form is not submitted.
4. **Given** the modal is open, **When** the user submits with an end date in the past, **Then** an inline validation message appears ("End date must be today or later") and the form is not submitted.
5. **Given** the modal is open, **When** the user types more than 100 characters in the title field, **Then** additional input is prevented or an inline validation message indicates the limit.
6. **Given** the modal is open, **When** the user clicks outside the modal or presses Escape, **Then** the modal closes without saving.

---

### User Story 3 — Complete a Goal (Priority: P3)

A user checks the checkbox on an active goal card. The goal moves from the Current Goals column to the Completed Goals column. The completed goal no longer shows days remaining and its checkbox is checked (read-only or visually distinct).

**Why this priority**: Completing goals is the core purpose of the app and closes the loop on the primary workflow.

**Independent Test**: With at least one active goal, check its checkbox and verify it moves to the Completed Goals column.

**Acceptance Scenarios**:

1. **Given** an active goal in the Current Goals column, **When** the user checks its checkbox, **Then** the goal moves to the Completed Goals column.
2. **Given** a goal has just been completed, **When** the user views the Completed Goals column, **Then** the goal appears with its title and a visual indicator that it is complete (e.g., strikethrough text or a checked badge). No control to revert the goal to active is shown.
3. **Given** three active goals, **When** the user completes the second one, **Then** the remaining two active goals stay in the left column in their original order.

---

### User Story 4 — Delete a Goal (Priority: P4)

A user can permanently delete any goal — whether it is active or completed. Each goal card shows a delete control (e.g., an icon button). After clicking delete, the goal is removed from the dashboard with no undo.

**Why this priority**: Deletion is essential for housekeeping but is less critical than creating and completing goals.

**Independent Test**: With at least one goal visible, click its delete control and verify the goal disappears from the dashboard entirely.

**Acceptance Scenarios**:

1. **Given** an active goal, **When** the user clicks the delete control, **Then** a confirmation prompt appears asking the user to confirm deletion.
2. **Given** the confirmation prompt is showing, **When** the user confirms, **Then** the goal is removed from the Current Goals column immediately.
3. **Given** the confirmation prompt is showing, **When** the user cancels, **Then** the goal remains and the prompt closes.
4. **Given** a completed goal, **When** the user clicks the delete control and confirms, **Then** the goal is removed from the Completed Goals column immediately.
5. **Given** a goal is deleted, **When** the user refreshes the page, **Then** the deleted goal does not reappear (data is persisted).

---

### User Story 5 — Deadline Highlighting (Priority: P5)

Goals whose end date is within 3 days (including today) are visually highlighted in the Current Goals column so the user can quickly identify urgent items.

**Why this priority**: Highlighting is a refinement of the dashboard display (P1) that adds urgency awareness.

**Independent Test**: Create goals with end dates 1, 3, and 5 days from today. Verify only the first two are highlighted.

**Acceptance Scenarios**:

1. **Given** a goal with an end date exactly 3 days from now, **When** the dashboard renders, **Then** the goal card has a warm pastel highlight (e.g., amber/orange border or background).
2. **Given** a goal with an end date 4 or more days from now, **When** the dashboard renders, **Then** the goal card uses the standard (non-highlighted) style.
3. **Given** a goal with an end date of today, **When** the dashboard renders, **Then** the goal card has the warm pastel highlight (approaching deadline).
4. **Given** a goal whose end date has passed (overdue), **When** the dashboard renders, **Then** the goal card has a distinct stronger highlight (e.g., red/rose) that is visually different from the approaching-deadline style.

---

### Edge Cases

- What happens when the user has a very long goal title? — Title is truncated with an ellipsis after two lines.
- What happens when dozens of goals exist in a single column? — The column scrolls independently; the dashboard layout does not break.
- What happens when the user's system clock is in a different timezone? — Days remaining is calculated from the local date at midnight.
- What happens if the user opens the app in two tabs and modifies goals in one? — The second tab reflects the latest persisted state on page load/refresh (real-time sync is out of scope).
- What happens when the browser does not support the date input type? — A text input with placeholder "YYYY-MM-DD" is an acceptable fallback.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The app MUST display a two-column dashboard layout — "Current Goals" on the left and "Completed Goals" on the right.
- **FR-002**: Each active goal card MUST show the goal title and the number of days remaining until the end date.
- **FR-003**: The dashboard MUST provide an "Add Goal" button that opens a modal dialog.
- **FR-004**: The modal MUST contain a "Title" text field (maximum 100 characters) and an "End Date" date field, both required.
- **FR-005**: The modal MUST validate that the title is non-empty and the end date is today or in the future before submission.
- **FR-006**: On successful submission, the new goal MUST appear in the Current Goals column and the modal MUST close.
- **FR-007**: Each active goal card MUST include a checkbox that, when checked, moves the goal to the Completed Goals column.
- **FR-008**: Each goal card (active or completed) MUST include a delete control that permanently removes the goal. A confirmation prompt (e.g., "Delete this goal?") MUST be shown before the goal is removed.
- **FR-009**: Goals with an end date within 3 days (inclusive) MUST be visually highlighted in the Current Goals column using a warm pastel style (e.g., amber/orange border or background).
- **FR-010**: Goals whose end date has passed (overdue) MUST be highlighted with a distinct, more prominent pastel style (e.g., red/rose border or background) that is visually different from the approaching-deadline highlight.
- **FR-011**: Goal data MUST be persisted in the browser so that goals survive a page refresh (localStorage assumed).
- **FR-012**: Empty-state messages MUST be shown in each column when it contains no goals.
- **FR-016**: Active goals MUST be sorted by end date ascending (soonest deadline first).
- **FR-017**: Completed goals MUST be sorted by completion time descending (most recently completed first).
- **FR-013**: The dashboard MUST use a modern light theme with pastel colors.
- **FR-014**: The layout MUST be responsive — columns stack vertically on viewports narrower than 640 px.
- **FR-015**: The app title "Do It" MUST be displayed in the page header/title bar.

### Key Entities

- **Goal**: Represents a single objective the user wants to achieve. Key attributes: title (text), end date (date), status (active or completed), creation timestamp. Each goal is uniquely identifiable. Status transition is one-way: active → completed. Completed goals cannot be reverted to active.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new user can create their first goal within 30 seconds of opening the app.
- **SC-002**: The dashboard renders all columns and goal cards within 1 second on a standard broadband connection.
- **SC-003**: 100 % of goal CRUD operations (create, complete, delete) persist correctly across page refreshes.
- **SC-004**: The dashboard is fully usable (no layout breakage, no horizontal scroll) on viewports from 320 px to 2560 px wide.
- **SC-005**: Goals within 3 days of their deadline are visually distinguishable from non-urgent goals at a glance (within 1 second of viewing).
- **SC-006**: The pastel color theme passes WCAG AA contrast requirements for all text elements.

## Clarifications

### Session 2026-02-16

- Q: Can completed goals be moved back to active? → A: No — completing a goal is a one-way action; completed goals can only be deleted.
- Q: How should goals be sorted within each column? → A: Active goals sorted by soonest deadline first; completed goals sorted by most recently completed first.
- Q: Should deletion require confirmation? → A: Yes — a confirmation prompt must appear before permanently deleting a goal.
- Q: Should overdue goals look different from approaching-deadline goals? → A: Yes — two distinct styles: warm pastel (amber/orange) for approaching (1–3 days), stronger pastel (red/rose) for overdue.
- Q: Should there be a character limit on goal titles? → A: Yes — 100 characters maximum.

## Assumptions

- Goal data is persisted client-side (localStorage). No backend or user authentication is in scope for this feature.
- There is no limit on the number of goals a user can create.
- "Days remaining" is calculated as the difference between the goal's end date and the current local date (calendar days, not hours).
- Undo/redo for delete and complete actions is out of scope.
- Real-time synchronization across browser tabs is out of scope; the latest state is shown on page load.
- The date field uses the browser's native date picker; no third-party date library is required.
