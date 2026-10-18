import React from "react";
import { RichText, TextSegment } from "./RichText";
import { slugify } from "@/lib/format";

export type RichSegment = TextSegment;

export type Rich = RichSegment | RichSegment[];

export type Block =
  | { type: "h2"; content: string }
  | { type: "p"; content: Rich }
  | { type: "ol" | "ul"; content: Rich[] };

interface BlockRendererProps {
  blocks: Block[];
  className?: string;
}

function isNA(content: unknown): boolean {
  if (typeof content === "string") {
    const s = content.trim().toLowerCase();
    return s === "n.a." || s === "n.a" || s === "na" || s === "nan";
  }
  if (Array.isArray(content) && content.length === 1) {
    return isNA(content[0]);
  }
  if (typeof content === "object" && content !== null && "text" in content) {
    return isNA((content as { text: string }).text);
  }
  return false;
}

function toSegments(val: unknown): RichSegment[] {
  if (Array.isArray(val)) {
    return val as RichSegment[];
  }
  if (typeof val === "string" || (typeof val === "object" && val !== null)) {
    return [val as RichSegment];
  }
  return [];
}

export function BlockRenderer({ blocks, className = "" }: BlockRendererProps) {
  return (
    <div className={`space-y-6 text-neutral-950 ${className}`}>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          const headingText = typeof block.content === "string" ? block.content : "";
          const id = slugify(headingText);
          return (
            <h2
              key={i}
              id={id}
              className="scroll-mt-32 text-neutral-950 font-medium tracking-[-0.02em] leading-[1.15] mt-[clamp(40px,6vh,72px)] mb-4"
              style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)" }}
            >
              {headingText}
            </h2>
          );
        }

        if (block.type === "p") {
          const na = isNA(block.content);
          return (
            <p
              key={i}
              className={`text-[18px] leading-[1.7] max-w-[62ch] break-words ${
                na ? "text-neutral-950/45 italic" : "text-neutral-950/80"
              }`}
            >
              <RichText segments={toSegments(block.content)} />
            </p>
          );
        }

        if (block.type === "ol") {
          return (
            <ol key={i} className="my-6 space-y-3 max-w-[62ch] list-none p-0">
              {block.content.map((item, idx) => {
                const itemNum = String(idx + 1).padStart(2, "0");
                return (
                  <li key={idx} className="flex items-start gap-3.5 text-[18px] leading-[1.7] text-neutral-950/80">
                    <span className="font-mono text-[13px] text-neutral-950/40 tabular-nums shrink-0 mt-1 select-none">
                      {itemNum}
                    </span>
                    <div className="flex-1 break-words">
                      <RichText segments={toSegments(item)} />
                    </div>
                  </li>
                );
              })}
            </ol>
          );
        }

        if (block.type === "ul") {
          return (
            <ul key={i} className="my-6 space-y-3 max-w-[62ch] list-none p-0">
              {block.content.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-[18px] leading-[1.7] text-neutral-950/80">
                  <span className="text-neutral-950/40 shrink-0 mt-1 select-none font-mono text-[13px]">
                    —
                  </span>
                  <div className="flex-1 break-words">
                    <RichText segments={toSegments(item)} />
                  </div>
                </li>
              ))}
            </ul>
          );
        }

        return null;
      })}
    </div>
  );
}
