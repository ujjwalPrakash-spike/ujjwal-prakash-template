// TypeScript interfaces and data models for the News editorial section.

import type { Block } from "@/components/shared/ui/BlockRenderer";

export type { Block };

export interface NewsPost {
  slug: string;
  title: string;
  date: string; // ISO 8601 YYYY-MM-DD
  category: string;
  excerpt: string;
  cover?: string;
  coverAlt?: string;
  author?: string;
  body: Block[];
  featured?: boolean;
  tags?: string[];
}

export interface MonthGroup {
  monthLabel: string;
  monthKey: string;
  posts: NewsPost[];
}

export interface NewsCategoryCount {
  name: string;
  count: number;
}

export interface NewsYearCount {
  year: string;
  count: number;
}
