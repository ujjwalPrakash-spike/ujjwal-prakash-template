// News index hero section with monumental title, intro copy, and computed data strip.
"use client";

import React from "react";
import { RevealLine, RevealTitleLine } from "@/components/shared/motion/Reveal";
import { CountUp } from "@/components/shared/motion/CountUp";
import { NEWS_CONFIG } from "@/lib/news/config";
import { TOKENS } from "@/lib/tokens";

interface NewsHeroProps {
  totalStories: number;
  totalCategories: number;
  latestDate: string;
}

export function NewsHero({ totalStories, totalCategories, latestDate }: NewsHeroProps) {
  return (
    <section
      aria-label="News Hero"
      style={{
        paddingLeft: TOKENS.paddingInline,
        paddingRight: TOKENS.paddingInline,
      }}
      className="relative w-full min-h-[60svh] bg-neutral-950 text-white flex flex-col justify-end pt-24 pb-12 sm:pb-16 select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col justify-end">
        {/* Eyebrow */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[13px] font-mono uppercase tracking-[0.12em] text-white/50 block">
            {NEWS_CONFIG.eyebrow}
          </span>
        </div>

        {/* Monumental Title */}
        <h1
          className="font-sans font-medium tracking-[-0.05em] leading-[0.85] text-white"
          style={{ fontSize: "clamp(4rem, 17vw, 17rem)" }}
        >
          <RevealTitleLine>{NEWS_CONFIG.title}</RevealTitleLine>
        </h1>

        {/* Intro text without box */}
        <p
          className="text-white/75 max-w-[48ch] mt-6 sm:mt-8 leading-relaxed font-sans"
          style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)" }}
        >
          {NEWS_CONFIG.intro}
        </p>

        {/* Hairline */}
        <div className="mt-8 sm:mt-12 mb-8">
          <RevealLine tone="dark" />
        </div>

        {/* Computed Metadata Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white tabular-nums">
              <CountUp value={totalStories} />
            </span>
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white/50">
              Published Stories
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white tabular-nums">
              <CountUp value={totalCategories} />
            </span>
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white/50">
              Active Domains
            </span>
          </div>

          <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
            <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-white tabular-nums pt-1">
              {latestDate || "CURRENT"}
            </span>
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white/50">
              Latest Field Report
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsHero;
