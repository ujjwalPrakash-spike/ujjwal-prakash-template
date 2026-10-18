import React from "react";
import { RichText, TextSegment } from "./RichText";
import { slugify } from "@/lib/utils";

import Image from "next/image";
import { TOKENS } from "@/lib/tokens";

export type RichSegment = TextSegment;

export type Rich = RichSegment | RichSegment[];

export type Block =
  | { type: "h2"; content: string }
  | { type: "p"; content: Rich }
  | { type: "ol" | "ul"; content: Rich[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "figure"; src?: string; width: number; height: number; alt: string; caption?: string };

interface BlockRendererProps {
  blocks: Block[];
  className?: string;
  tone?: "light" | "dark";
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

export function BlockRenderer({ blocks, className = "", tone = "light" }: BlockRendererProps) {
  const isDark = tone === "dark";

  return (
    <div className={`space-y-6 ${isDark ? "text-white" : "text-neutral-950"} ${className}`}>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          const headingText = typeof block.content === "string" ? block.content : "";
          const id = slugify(headingText);
          return (
            <h2
              key={i}
              id={id}
              className={`scroll-mt-32 font-medium tracking-[-0.02em] leading-[1.15] mt-[clamp(40px,6vh,72px)] mb-4 ${
                isDark ? "text-white" : "text-neutral-950"
              }`}
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
                isDark
                  ? na ? "text-white/45 italic" : "text-white/80"
                  : na ? "text-neutral-950/45 italic" : "text-neutral-950/80"
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
                  <li
                    key={idx}
                    className={`flex items-start gap-3.5 text-[18px] leading-[1.7] ${
                      isDark ? "text-white/80" : "text-neutral-950/80"
                    }`}
                  >
                    <span
                      className={`font-mono text-[13px] tabular-nums shrink-0 mt-1 select-none ${
                        isDark ? "text-white/40" : "text-neutral-950/40"
                      }`}
                    >
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
                <li
                  key={idx}
                  className={`flex items-start gap-3.5 text-[18px] leading-[1.7] ${
                    isDark ? "text-white/80" : "text-neutral-950/80"
                  }`}
                >
                  <span
                    className={`shrink-0 mt-1 select-none font-mono text-[13px] ${
                      isDark ? "text-white/40" : "text-neutral-950/40"
                    }`}
                  >
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

        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className={`my-8 pl-6 border-l ${
                isDark ? "border-white/20 text-white" : "border-neutral-950 text-neutral-950"
              }`}
            >
              <p
                className="font-medium tracking-[-0.02em] leading-[1.25]"
                style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)" }}
              >
                {block.text}
              </p>
              {block.cite && (
                <cite
                  className={`font-mono text-[13px] not-italic block mt-3 ${
                    isDark ? "text-white/55" : "text-neutral-950/55"
                  }`}
                >
                  — {block.cite}
                </cite>
              )}
            </blockquote>
          );
        }

        if (block.type === "figure") {
          return (
            <figure key={i} className="my-10 w-full col-span-full">
              <div
                className={`overflow-hidden ${
                  isDark ? "bg-white/[0.05]" : "bg-neutral-950/[0.05]"
                }`}
                style={{ borderRadius: TOKENS.radiusPortrait }}
              >
                {block.src ? (
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={block.width}
                    height={block.height}
                    sizes="(max-width: 1024px) 100vw, 840px"
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <div
                    className="w-full flex items-center justify-center font-mono text-xs uppercase tracking-widest py-20"
                    style={{ aspectRatio: `${block.width} / ${block.height}` }}
                  >
                    <span className={isDark ? "text-white/40" : "text-neutral-950/40"}>
                      [Figure // {block.alt}]
                    </span>
                  </div>
                )}
              </div>
              {block.caption && (
                <figcaption
                  className={`font-mono text-[13px] mt-2.5 ${
                    isDark ? "text-white/55" : "text-neutral-950/55"
                  }`}
                >
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
}

