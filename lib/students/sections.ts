// Section definitions for the For Students page.
// Matches StickyIndexBar structure.

import { Surface } from "@/lib/tokens";

export interface StudentSection {
  id: string;
  index: string;
  title: string;
  surface: Surface;
  isExternalLink?: boolean;
  href?: string;
}

export const STUDENT_SECTIONS: StudentSection[] = [
  {
    id: "insights-link",
    index: "01",
    title: "Insights",
    surface: "dark",
    isExternalLink: true,
    href: "/insights",
  },
  {
    id: "steps",
    index: "02",
    title: "Procedure",
    surface: "light",
  },
  {
    id: "resources",
    index: "03",
    title: "Resources",
    surface: "dark",
  },
  {
    id: "prepRoadmaps",
    index: "04",
    title: "Preparation Roadmaps",
    surface: "light",
  },
  {
    id: "faqs",
    index: "05",
    title: "FAQs",
    surface: "dark",
  },
];
