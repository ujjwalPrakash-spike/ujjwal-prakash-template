"use client";

import React from "react";
import { Section } from "@/components/shared/layout/Section";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { RichText } from "@/components/shared/ui/RichText";
import { RevealText } from "@/components/shared/motion/Reveal";
import type { PolicyData } from "@/lib/companies/data";
import type { Surface } from "@/lib/tokens";

interface PolicySectionProps {
  id: string;
  chapterIndex: string;
  surface: Surface;
  data: PolicyData;
}

export function PolicySection({
  id,
  chapterIndex,
  surface,
  data,
}: PolicySectionProps) {
  const isDark = surface === "dark";
  const totalCount = data.points.length + 1;

  return (
    <Section id={id} surface={surface} aria-labelledby={`chapter-${id}`}>
      <ChapterHeader
        id={`chapter-${id}`}
        index={chapterIndex}
        title={data.title}
        count={`${totalCount} POINTS`}
        tone={surface}
      />

      <div className="w-full">
        {/* Point 01: Headline statement at lead size */}
        <div
          className={`pb-12 mb-10 border-b ${
            isDark ? "border-white/10" : "border-neutral-950/10"
          }`}
        >
          <RevealText>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
              <div className="md:col-span-3">
                <span
                  className={`font-mono text-sm tracking-wider ${
                    isDark ? "text-white/40" : "text-neutral-950/40"
                  }`}
                >
                  01
                </span>
              </div>
              <div className="md:col-span-8 md:col-start-4">
                <h3
                  className={`font-normal leading-[1.5] max-w-[62ch] ${
                    isDark ? "text-white/90" : "text-neutral-950/90"
                  }`}
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                >
                  <RichText segments={data.lead} />
                </h3>
              </div>
            </div>
          </RevealText>
        </div>

        {/* Points 02 onward: Numbered rows at 17px */}
        <ol className="w-full list-none p-0 m-0 divide-y divide-white/10 dark:divide-white/10 divide-neutral-950/10">
          {data.points.map((pt, idx) => (
            <li
              key={pt.number}
              className="py-6 first:pt-0"
            >
              <RevealText delay={Math.min(idx * 0.05, 0.4)}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline">
                  <div className="md:col-span-3">
                    <span
                      className={`font-mono text-[13px] tracking-wider select-none ${
                        isDark ? "text-white/40" : "text-neutral-950/40"
                      }`}
                    >
                      {String(pt.number).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:col-span-8 md:col-start-4">
                    <p
                      className={`text-[17px] leading-[1.7] max-w-[62ch] ${
                        isDark ? "text-white/75" : "text-neutral-950/75"
                      }`}
                    >
                      <RichText segments={pt.segments} />
                    </p>
                  </div>
                </div>
              </RevealText>
            </li>
          ))}
        </ol>

        {/* Footnote slot separated by hairline */}
        <div
          className={`mt-12 pt-8 border-t ${
            isDark ? "border-white/10" : "border-neutral-950/10"
          }`}
        >
          <RevealText delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline">
              <div className="md:col-span-3">
                <span
                  className={`font-mono text-sm ${
                    isDark ? "text-white/40" : "text-neutral-950/40"
                  }`}
                >
                  {data.footnote.marker}
                </span>
              </div>
              <div className="md:col-span-8 md:col-start-4">
                <p
                  className={`text-[13px] leading-[1.6] max-w-[62ch] ${
                    isDark ? "text-white/55" : "text-neutral-950/55"
                  }`}
                >
                  {data.footnote.text}
                </p>
              </div>
            </div>
          </RevealText>
        </div>
      </div>
    </Section>
  );
}
