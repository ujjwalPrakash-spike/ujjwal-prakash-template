/**
 * Single source of truth for About page headline statistics.
 * To reorder or update entries: modify the FACTS array below.
 */

export interface FactItem {
  value: string;
  label: string;
  source?: string;
  countUp?: boolean;
}

export const ABOUT_FACTS: FactItem[] = [
  {
    value: "1959",
    label: "Established",
    source: "Old About Page",
    countUp: false,
  },
  {
    value: "413+",
    label: "Faculty members",
    source: "Old About Page",
    countUp: true,
  },
  {
    value: "45,000+",
    label: "Alumni network",
    source: "Old About Page",
    countUp: true,
  },
  {
    value: "Top 5",
    label: "Engineering institutes over decades",
    source: "Old About Page",
    countUp: false,
  },
];
