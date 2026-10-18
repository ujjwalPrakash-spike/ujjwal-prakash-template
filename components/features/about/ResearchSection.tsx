// Chapter 03: Research and Development on dark surface.

import React from "react";
import Image from "next/image";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { RevealText, RevealImage } from "@/components/shared/motion/Reveal";
import { RESEARCH_CONTENT } from "@/lib/about/content";
import { RESEARCH_CENTRES, type ResearchCentre } from "@/lib/about/research";
import { ABOUT_TOKENS } from "@/lib/about/tokens";

export function ResearchSection({
  content = RESEARCH_CONTENT,
  centres = RESEARCH_CENTRES,
}: {
  content?: typeof RESEARCH_CONTENT;
  centres?: ResearchCentre[];
}) {
  return (
    <section
      id={content.id}
      aria-label={content.title}
      className="w-full bg-neutral-950 text-white scroll-mt-[var(--header-stack-h)]"
      style={{
        paddingInline: ABOUT_TOKENS.paddingInline,
        paddingTop: ABOUT_TOKENS.paddingVertical,
        paddingBottom: ABOUT_TOKENS.paddingVertical,
      }}
    >
      <div className="mx-auto max-w-[1440px]">
        <ChapterHeader index={content.index} title={content.title} tone="dark" />

        {/* Intro copy and Cleanroom Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
          <div className="lg:col-span-7 flex flex-col gap-6">
            {content.paragraphs.map((p, idx) => (
              <RevealText key={idx} delay={idx * 0.08}>
                <p className="text-[17px] leading-[1.7] text-white/75 max-w-[62ch] text-pretty">
                  {p}
                </p>
              </RevealText>
            ))}
          </div>

          <div className="lg:col-span-5">
            <RevealImage className="relative w-full aspect-[4/3] sm:aspect-[4/5]">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </RevealImage>
          </div>
        </div>

        {/* Typographic index of 15 Centres and Facilities */}
        <div className="w-full">
          <h3 className="text-[13px] uppercase tracking-[0.12em] text-white/50 mb-8">
            Centres and Facilities
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 border-t border-white/10">
            {centres.map((centre) => (
              <div
                key={centre.id}
                className="group py-5 border-b border-white/10 flex items-center gap-4 transition-transform duration-200"
              >
                <span className="font-mono text-sm text-white/35 group-hover:text-white transition-colors">
                  {centre.id}
                </span>
                <span
                  className="font-medium text-white tracking-tight transition-transform duration-200 ease-out group-hover:translate-x-2"
                  style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.65rem)" }}
                >
                  {centre.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
