import React from "react";
import { Block } from "@/lib/insights/types";
import { BlockRenderer } from "@/components/shared/ui/BlockRenderer";
import { ArticleOutline } from "./ArticleOutline";
import { slugify } from "@/lib/format";
import { TOKENS } from "@/lib/tokens";

interface ArticleBodyProps {
  blocks: Block[];
}

export function ArticleBody({ blocks }: ArticleBodyProps) {
  // Extract h2 headings for outline
  const headings = blocks
    .filter((b) => b.type === "h2")
    .map((b) => {
      const title = typeof b.content === "string" ? b.content : "";
      return { id: slugify(title), title };
    });

  return (
    <section
      aria-label="Article Content"
      className="bg-neutral-50 text-neutral-950 py-16 lg:py-24"
      style={{ paddingInline: TOKENS.paddingInline }}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Outline: cols 1-3 */}
          <div className="lg:col-span-3">
            <ArticleOutline headings={headings} />
          </div>

          {/* Main content: cols 4-10 */}
          <div className="lg:col-span-8 xl:col-span-7">
            <BlockRenderer blocks={blocks} />
          </div>
        </div>
      </div>
    </section>
  );
}
