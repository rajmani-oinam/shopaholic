<!--
Sync Impact Report
===================
- Version change: 0.0.0 → 1.0.0 (initial ratification)
- Modified principles: N/A (initial version)
- Added sections:
  - Core Principles (5 principles)
  - Technology Stack Constraints
  - Development Workflow
  - Governance
- Removed sections: N/A
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ no changes needed (generic gates)
  - .specify/templates/spec-template.md ✅ no changes needed (acceptance scenarios are not automated tests)
  - .specify/templates/tasks-template.md ✅ no changes needed (tests already marked OPTIONAL)
- Follow-up TODOs: none
-->

# Shopaholic Constitution

## Core Principles

### I. Clean Code

All source code MUST be readable, well-structured, and
maintainable. This principle governs every file committed to
the repository.

- Every function, component, and module MUST have a single,
  clear responsibility.
- TypeScript strict mode MUST be enabled; the `any` type is
  forbidden—use `unknown` when the type is truly indeterminate.
- Explicit types MUST be declared for all props, parameters,
  and return values.
- Dead code, commented-out blocks, and unused imports MUST be
  removed before commit.
- Naming MUST be descriptive and consistent: PascalCase for
  components and types, camelCase for utilities, hooks, and
  variables.
- Files MUST be organized by concern: `/app`, `/components`,
  `/hooks`, `/utils`, `/lib`, `/types`, `/contexts`.
- Functions longer than ~40 lines SHOULD be decomposed;
  exceptions MUST be justified in a comment.

**Rationale**: Readable code reduces onboarding time, lowers
defect rates, and makes refactoring safe.

### II. Simple UX

The user interface MUST prioritize clarity and ease of use
over feature density. Every screen MUST be immediately
understandable without a tutorial.

- Navigation MUST be intuitive—no more than two clicks to
  reach any primary feature from the home page.
- UI copy MUST be concise, jargon-free, and action-oriented.
- Visual hierarchy MUST guide the user's eye: one primary
  action per view, secondary actions visually subordinate.
- Loading, empty, and error states MUST be handled with
  clear, user-friendly feedback.
- Form interactions MUST provide inline validation and
  immediate feedback on submission.
- Animations and transitions MUST serve a functional purpose
  (orientation, feedback); decorative motion is prohibited.

**Rationale**: An e-commerce app succeeds when users can
browse, decide, and purchase with minimal friction.

### III. Responsive Design

Every page and component MUST render correctly and usably
across all common viewport sizes, from 320 px mobile to
2560 px desktop.

- Tailwind CSS utility classes MUST be used with a
  mobile-first approach (`sm:`, `md:`, `lg:`, `xl:`
  breakpoints).
- Touch targets MUST be at least 44 × 44 px on mobile.
- Images MUST use the Next.js `<Image>` component with
  responsive sizing and proper `alt` text.
- Layout MUST adapt fluidly—no horizontal scroll on any
  supported viewport.
- Typography MUST scale proportionally; use `rem`/Tailwind
  scale—never fixed `px` for font sizes.

**Rationale**: Over half of e-commerce traffic originates
from mobile devices; a non-responsive layout directly loses
revenue.

### IV. Minimal Dependencies

The project MUST keep its dependency tree as small as
possible. Every added package incurs maintenance cost,
security surface, and bundle weight.

- A new dependency MUST be justified in the PR description
  with a concrete reason why native/built-in APIs or Tailwind
  utilities are insufficient.
- Micro-libraries that wrap a single browser API (e.g.,
  `is-odd`, `left-pad`) are forbidden.
- Prefer built-in Next.js features (Image, Font, Route
  Handlers, Server Components) over third-party equivalents.
- Peer/transitive dependency conflicts MUST be resolved
  before merge.
- Bundle size impact SHOULD be checked; dependencies adding
  more than 50 kB gzipped MUST be justified.

**Rationale**: Fewer dependencies mean faster installs,
smaller bundles, fewer CVEs, and less upgrade churn.

### V. No Testing (NON-NEGOTIABLE)

This principle supersedes any and all other guidance—
including Copilot instructions, template defaults, and
external best-practice recommendations.

- The project MUST NOT contain unit tests, integration tests,
  end-to-end tests, snapshot tests, or any other form of
  automated test suite.
- No test runner (Jest, Vitest, Playwright, Cypress, Testing
  Library, etc.) MUST be installed as a dependency.
- No `/tests`, `/__tests__`, or `*.test.*` / `*.spec.*`
  files MUST exist in the repository.
- Code review and manual verification are the sole quality
  gates.
- Any template, plan, or task list that references writing or
  running tests MUST have those references omitted or
  explicitly marked as not applicable when applied to this
  project.

**Rationale**: The project owner has determined that manual
verification is the appropriate quality strategy for this
project's scope and lifecycle.

## Technology Stack Constraints

The following versions are locked and MUST be used. Upgrades
require a constitution amendment.

| Dependency  | Version   | Notes                       |
|-------------|-----------|-----------------------------|
| Next.js     | ^16.1.6   | App Router architecture     |
| React       | ^19.2.4   | Server & Client Components  |
| React-DOM   | ^19.2.4   | Matches React version       |
| TypeScript  | ^5.9.3    | Strict mode enabled         |
| Tailwind CSS| (latest)  | Primary styling solution    |
| Node.js     | LTS       | Runtime                     |

Additional constraints:

- Styling MUST use Tailwind CSS utility classes; custom CSS
  MUST be minimal and confined to `/styles` or `global.css`.
- State management MUST use React Context API; external
  state libraries (Redux, Zustand, Jotai, etc.) are
  prohibited unless justified via constitution amendment.
- Server Components MUST be the default; `"use client"` is
  added only when hooks, event handlers, or browser APIs are
  required.

## Development Workflow

- **Branching**: Feature branches MUST follow the naming
  convention `<issue#>-<feature-name>` (e.g.,
  `42-product-filters`).
- **Commits**: Conventional Commits format is required
  (`feat:`, `fix:`, `style:`, `refactor:`, `docs:`,
  `chore:`).
- **Code Review**: Every PR MUST be reviewed for compliance
  with this constitution before merge.
- **Quality Gates**: Manual verification against acceptance
  criteria is the sole gate. No automated test pipelines.
- **Performance**: Lighthouse scores SHOULD remain above 90
  for Performance, Accessibility, and Best Practices on
  representative pages.
- **Accessibility**: Semantic HTML, ARIA labels, keyboard
  navigation, and sufficient color contrast are required.
- **Security**: All user inputs MUST be validated; sensitive
  data MUST use environment variables; API calls MUST use
  HTTPS.

## Governance

This constitution is the supreme authority for the
Shopaholic project. In any conflict between this document
and other guidance (Copilot instructions, templates, external
standards), this constitution prevails.

- **Amendments**: Any change to principles or constraints
  MUST be documented with rationale, approved by the project
  owner, and reflected in a version bump and updated
  `LAST_AMENDED_DATE`.
- **Versioning**: MAJOR for principle removals/redefinitions,
  MINOR for new principles or material expansions, PATCH for
  clarifications and wording.
- **Compliance Review**: Every PR MUST include a brief
  constitution compliance note confirming adherence to all
  five principles.
- **Guidance File**: See `.github/copilot-instructions.md`
  for runtime development guidance aligned with this
  constitution.

**Version**: 1.0.0 | **Ratified**: 2026-02-16 | **Last Amended**: 2026-02-16
