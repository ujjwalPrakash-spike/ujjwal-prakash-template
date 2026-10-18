# Architecture Documentation

## Directory Structure
- `lib/`: Pure data, helpers, collections, tokens, and formatting.
  - `lib/tokens.ts`: Global surface records, sizing, insets, and easing.
  - `lib/home/`: Homepage-specific datasets (news, recruiters, why-recruit, leadership, hero-stats).
  - `lib/site/`: Site-wide datasets and configuration (constants, navigation, footer).
  - `lib/coordinators/`: Placement coordinators datasets and section definitions.
  - `lib/about/`: About page section definitions and tokens.
  - `lib/utils/`: Formatting helpers, collection utilities, and classname merging (`cn`).
- `components/shared/`: Agnostic UI, layout, and motion primitives (Section, ChapterHeader, StickyIndexBar, Reveal, CountUp, CopyButton, ContactLinks, Portrait, ArrowCircle, SearchInput). Zero feature imports.
- `components/directory/`: Generic reusable directory primitives (DirectoryProvider, useDirectorySearch, PortraitGrid, RowList, GroupedList, IndexList, EmptyResults).
- `components/features/`: Feature-specific composition components.

## Boundary Rule
`components/shared/` and `components/directory/` MUST NEVER import from `components/features/` or `lib/{feature}/`. This is verified via automated grep checks.

## Adding a Person
1. Open the relevant file in `lib/coordinators/{overall|assistants|departments|web-team}.ts`.
2. Add a new `Person` entry with `{ name, email, phone, ... }`.
3. The counts in the hero, search index, and grouped listings automatically update.

## Adding a Section
1. Add an entry to `COORDINATOR_SECTIONS` in `lib/coordinators/sections.ts` with `{ id, title, surface }`.
2. Map the section to the appropriate primitive in `CoordinatorsPage.tsx`.

## Creating a New Directory Page in 5 Steps
1. Create data models and datasets in `lib/{feature}/`.
2. Define a sections configuration file.
3. Wrap page content in `DirectoryProvider` with a custom `getSearchText` mapper.
4. Compose sections using `Section`, `ChapterHeader`, `PortraitGrid`, `RowList`, or `GroupedList`.
5. Export metadata and render the composition in `app/{route}/page.tsx`.

## Insights URL Query Contract
The `/insights` directory synchronizes state via `history.replaceState` using query parameters:
- `q`: string keyword filter for candidate name, role, company, or year.
- `type`: filter by insight classification (`"all"` | `"placement"` | `"internship"`).
- `year`: filter by graduating cohort (`"all"` | `"2025-26"` | `"2024-25"` | `"2023-24"`).
- `company`: filter by exact/canonical company name (e.g. `?company=Barclays`).
- `sort`: result ordering (`"newest"` | `"company"` | `"name"`). Deep-links from the `/students` ticker and handoff search restore these views directly.

