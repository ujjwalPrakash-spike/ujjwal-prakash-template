/**
 * Single source of truth for the Placement Coordinators page sections.
 * The page order, sticky index bar, and counts are all derived from this config.
 */

import type { Surface } from "@/lib/tokens";

export interface CoordinatorSectionConfig {
  id: string;
  title: string;
  surface: Surface;
}

export const COORDINATOR_SECTIONS: CoordinatorSectionConfig[] = [
  { id: "overall", title: "Overall Placement Coordinators", surface: "light" },
  { id: "assistants", title: "Assistant Coordinators", surface: "dark" },
  { id: "departments", title: "Department Placement Coordinators", surface: "light" },
  { id: "web-team", title: "Web Team", surface: "dark" },
  { id: "previous-teams", title: "Previous Teams", surface: "light" },
];
