// Chapter 02: Academics at IIT Kanpur on light surface.

import React from "react";
import Image from "next/image";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { RevealText, RevealImage } from "@/components/shared/motion/Reveal";
import { ProgrammeAccordion } from "./ProgrammeAccordion";
import { ACADEMICS_CONTENT } from "@/lib/about/content";
import { ACADEMIC_PROGRAMMES } from "@/lib/about/programmes";
import { ABOUT_TOKENS } from "@/lib/about/tokens";

export function AcademicsSection({
  content = ACADEMICS_CONTENT,
  programmes = ACADEMIC_PROGRAMMES,
}: {
  content?: typeof ACADEMICS_CONTENT;
  programmes?: typeof ACADEMIC_PROGRAMMES;
}) {
  return (
    <section
      id={content.id}
      aria-label={content.title}
      className="w-full bg-neutral-50 text-neutral-950 scroll-mt-[var(--header-stack-h)]"
      style={{
        paddingInline: ABOUT_TOKENS.paddingInline,
        paddingTop: ABOUT_TOKENS.paddingVertical,
        paddingBottom: ABOUT_TOKENS.paddingVertical,
      }}
    >
      <div className="mx-auto max-w-[1440px]">
        <ChapterHeader index={content.index} title={content.title} tone="light" />

        {/* Lead text and Lecture Hall Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
          <div className="lg:col-span-7">
            <RevealText>
              <p
                className="text-neutral-950/80 font-normal leading-[1.6] text-pretty max-w-[56ch]"
                style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)" }}
              >
                {content.lead}
              </p>
            </RevealText>
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

        {/* Programme Accordion list */}
        <div className="w-full">
          <ProgrammeAccordion programmes={programmes} />
        </div>
      </div>
    </section>
  );
}
