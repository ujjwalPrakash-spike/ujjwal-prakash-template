<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# Project Instructions

## Stack

- Next.js (App Router), TypeScript in strict mode.
- Do not add a dependency without stating why and what it replaces.

## Structure

- `app/` — routes, layouts, and page-level composition only. No business logic.
- `components/ui/` — generic, reusable primitives (Button, Input, Modal, Card). No app-specific logic or data fetching.
- `components/features/<feature>/` — components tied to one feature, built from `ui/` primitives.
- `hooks/` — reusable hooks. One hook per file.
- `lib/` — pure utilities, API clients, constants, and validators. No React in here.
- `types/` — shared types. Types used by only one module live next to it.

## Component rules

- One component per file. File name matches the export name (PascalCase).
- Keep components small and single-purpose. If a component exceeds ~150 lines or does two jobs, split it.
- Before writing a new component, check `components/ui/` and `components/features/` for an existing one. Extend or generalize it instead of duplicating.
- Any UI pattern used twice becomes a shared component.
- Components take typed props and stay presentational. Data fetching, state logic, and side effects go in hooks or server code.
- Default to Server Components. Add `"use client"` only when state, effects, or browser APIs require it, and keep the client boundary as low in the tree as possible.
- No inline magic values. Colors, spacing, and breakpoints come from the design tokens or Tailwind config. Strings and numbers used more than once go in constants.

## Code quality

- No `any`. Type props, API responses, and hook returns explicitly.
- Descriptive names. No abbreviations except common ones (`id`, `url`, `props`).
- Early returns over nested conditionals.
- No dead code, commented-out code, or unused imports.
- Handle loading, empty, and error states for every data-driven component.
- Follow the existing formatter and linter config. Do not reformat unrelated code.

## Comments

- Comment sparingly, but do not omit them.
- Every file gets a one-line comment at the top stating its purpose.
- Comment the "why" for non-obvious logic, workarounds, and non-trivial decisions.
- Do not comment what the code already says (`// set state`, `// return button`).
- Keep comments to one or two lines. No comment blocks or decorative separators.

## Workflow

- Work one task at a time. Do not touch files outside the task's scope.
- When a task is complete, stop and report:
  1. Files created, modified, or deleted (path plus one line each).
  2. Any new component, hook, or dependency added and why it was needed.
  3. Assumptions made and anything left unresolved.
- Do not start the next task until told to.
- If the request is ambiguous, ask before writing code.
- Run type-check and lint before reporting a task done. Report failures instead of hiding them.
<!-- END:nextjs-agent-rules -->
