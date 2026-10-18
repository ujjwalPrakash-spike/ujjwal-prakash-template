"use client";

import React from "react";
import { Section } from "@/components/shared/layout/Section";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { RichText } from "@/components/shared/ui/RichText";
import { RevealText } from "@/components/shared/motion/Reveal";
import { FACILITIES_DATA } from "@/lib/companies/data";

export function FacilitiesSection() {
  return (
    <Section id="facilities" surface="dark" aria-labelledby="chapter-facilities">
      <ChapterHeader
        id="chapter-facilities"
        index="04"
        title="Facilities"
        count={`${FACILITIES_DATA.length} ITEMS`}
        tone="dark"
      />

      <ul className="w-full list-none p-0 m-0 grid grid-cols-1 lg:grid-cols-2 gap-x-16 border-t border-white/10">
        {FACILITIES_DATA.map((fac, idx) => (
          <li
            key={fac.id}
            className="py-7 border-b border-white/10"
          >
            <RevealText delay={Math.min(idx * 0.05, 0.35)}>
              <div className="flex items-baseline gap-4 sm:gap-6">
                <span className="font-mono text-sm tracking-widest text-white/40 shrink-0 select-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p
                  className="font-normal leading-[1.6] text-white/80"
                  style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)" }}
                >
                  <RichText segments={fac.segments} />
                </p>
              </div>
            </RevealText>
          </li>
        ))}
      </ul>
    </Section>
  );
}
