"use client";

import React from "react";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { StudentRoadmap } from "@/lib/students/data";
import { FocusList } from "@/components/shared/ui/FocusList";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import { TOKENS } from "@/lib/tokens";

interface RoadmapsFocusListProps {
  roadmaps: StudentRoadmap[];
}

export function RoadmapsFocusList({ roadmaps }: RoadmapsFocusListProps) {
  const total = roadmaps.length;

  return (
    <section
      id="prepRoadmaps"
      aria-label="Preparation Roadmaps"
      className="bg-neutral-50 text-neutral-950 scroll-mt-28 py-24 lg:py-36"
      style={{ paddingInline: TOKENS.paddingInline }}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <ChapterHeader
          index="04"
          title="Preparation Roadmaps"
          surface="light"
          count={total}
          lead="Curated roadmaps and skill guides spanning core engineering disciplines, analytics, and software roles."
        />

        <div className="mt-16 lg:mt-24">
          <FocusList
            items={roadmaps}
            getKey={(item) => item.name}
            renderPanel={(activeItem, activeIndex, count) => {
              const displayNum = String(activeIndex + 1).padStart(2, "0");
              const totalNum = String(count).padStart(2, "0");
              return (
                <div className="space-y-4">
                  <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-neutral-950/55">
                    {activeItem?.group ?? "Track"}
                  </p>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-mono font-normal tracking-[-0.06em] leading-[0.85] text-neutral-950 tabular-nums select-none"
                      style={{ fontSize: "clamp(7rem, 16vw, 15rem)" }}
                    >
                      {displayNum}
                    </span>
                    <span className="font-mono text-sm text-neutral-950/45 tabular-nums">
                      / {totalNum}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-neutral-950/70 max-w-[24ch]">
                    {activeItem?.name}
                  </p>
                </div>
              );
            }}
            renderRow={(item, idx) => {
              const displayNum = String(idx + 1).padStart(2, "0");
              const isFirstOfGroup =
                idx === 0 || roadmaps[idx - 1].group !== item.group;

              return (
                <div className="w-full">
                  {/* Group Label header when group changes */}
                  {isFirstOfGroup && (
                    <div className="pt-8 pb-3 border-b border-neutral-950/10">
                      <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-neutral-950/45">
                        {item.group}
                      </span>
                    </div>
                  )}

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-[clamp(28px,6vh,64px)] border-b border-neutral-950/10 focus-visible:outline-2 focus-visible:outline-neutral-950 focus-visible:outline-offset-4"
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div className="space-y-2">
                        {/* Mobile index above label (<1024px) */}
                        <div className="lg:hidden font-mono text-[13px] text-neutral-950/45 tabular-nums">
                          {displayNum} · {item.group}
                        </div>
                        <h3
                          className="font-medium tracking-[-0.03em] leading-none text-neutral-950 transition-transform duration-200 group-hover:translate-x-4"
                          style={{ fontSize: "clamp(2rem, 4.6vw, 4.5rem)" }}
                        >
                          {item.name}
                        </h3>
                      </div>

                      <ArrowCircle
                        size={56}
                        tone="light"
                        direction="up-right"
                        className="shrink-0 transition-colors duration-200 group-hover:bg-neutral-950 group-hover:text-white"
                      />
                    </div>
                  </a>
                </div>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}
