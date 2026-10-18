// Gallery index hero section with monumental title, bottom-anchored layout, and computed statistics strip.
"use client";

import React from "react";
import { RevealLine, RevealTitleLine } from "@/components/shared/motion/Reveal";
import { CountUp } from "@/components/shared/motion/CountUp";
import { GALLERY_CONFIG } from "@/lib/gallery/config";
import type { GalleryStats } from "@/lib/gallery/utils";
import { TOKENS } from "@/lib/tokens";

interface GalleryHeroProps {
  stats: GalleryStats;
}

export function GalleryHero({ stats }: GalleryHeroProps) {
  const statItems = [
    { label: "EXHIBITIONS", value: stats.eventsCount },
    { label: "PHOTOGRAPHS", value: stats.photosCount },
    { label: "DOCUMENTARIES", value: stats.filmsCount },
    { label: "ACTIVE YEARS", value: stats.yearsCount },
  ];

  return (
    <section
      aria-label="Gallery Hero"
      style={{
        paddingLeft: TOKENS.paddingInline,
        paddingRight: TOKENS.paddingInline,
      }}
      className="relative w-full min-h-[70svh] bg-neutral-950 text-white flex flex-col justify-end pt-24 pb-12 sm:pb-16 select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col justify-end">
        {/* Eyebrow */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[13px] font-mono uppercase tracking-[0.12em] text-white/50 block">
            {GALLERY_CONFIG.eyebrow}
          </span>
        </div>

        {/* Monumental Title */}
        <h1
          className="font-sans font-medium tracking-[-0.05em] leading-[0.85] text-white"
          style={{ fontSize: "clamp(4rem, 17vw, 17rem)" }}
        >
          <RevealTitleLine>{GALLERY_CONFIG.title}</RevealTitleLine>
        </h1>

        {/* 1px Hairline */}
        <div className="mt-8 sm:mt-12 mb-8">
          <RevealLine tone="dark" />
        </div>

        {/* Computed Statistics Strip: 4 items, 2x2 below 640px */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {statItems.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white tabular-nums">
                <CountUp end={item.value} />
              </span>
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white/50">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GalleryHero;
