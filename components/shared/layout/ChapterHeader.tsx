import React from "react";
import { RevealLine, RevealTitleLine } from "../motion/Reveal";
import type { Surface } from "@/lib/tokens";

interface ChapterHeaderProps {
  id?: string;
  index: string;
  title: string;
  count?: string | number;
  tone?: Surface;
  surface?: Surface;
  lead?: string;
  className?: string;
}

export function ChapterHeader({
  id,
  index,
  title,
  count,
  tone,
  surface = "dark",
  lead,
  className = "",
}: ChapterHeaderProps) {
  const effectiveTone = tone ?? surface;
  const isDark = effectiveTone === "dark";

  const displayCount =
    typeof count === "number" ? String(count).padStart(2, "0") : count;

  return (
    <div className={`w-full mb-12 lg:mb-16 ${className}`}>
      <div className="flex items-center gap-4 sm:gap-6 mb-6">
        <span
          className={`font-mono text-sm tracking-widest shrink-0 ${
            isDark ? "text-white/40" : "text-neutral-950/40"
          }`}
        >
          {index}
        </span>
        <div className="flex-1">
          <RevealLine tone={effectiveTone} />
        </div>
        {displayCount ? (
          <span
            className={`font-mono text-xs uppercase tracking-wider shrink-0 ${
              isDark ? "text-white/40" : "text-neutral-950/40"
            }`}
          >
            {displayCount}
          </span>
        ) : null}
      </div>

      <h2
        id={id}
        className={`font-sans font-medium tracking-[-0.03em] leading-none ${
          isDark ? "text-white" : "text-neutral-950"
        }`}
        style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
      >
        <RevealTitleLine>{title}</RevealTitleLine>
      </h2>

      {lead ? (
        <p
          className={`mt-4 leading-[1.6] max-w-[58ch] ${
            isDark ? "text-white/70" : "text-neutral-950/70"
          }`}
          style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)" }}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
