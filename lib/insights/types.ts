// SPO Insights data models and article block types.

import type { Block, Rich, RichSegment } from "@/components/shared/ui/BlockRenderer";

export type { Block, Rich, RichSegment };

export type InsightType = "placement" | "internship";

export type Insight =
  | {
      kind: "article";
      slug: string;
      name: string;
      role: string;
      company: string;
      type: InsightType;
      year: string;
      title: string;
      date: string;
    }
  | {
      kind: "drive";
      id: string;
      name: string;
      role: string;
      company: string;
      type: InsightType;
      year: string;
      href: string;
    };

export interface ArticleData {
  slug: string;
  wordCount: number;
  readTime: string;
  blocks: Block[];
}
