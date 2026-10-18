// Chapter 06: Students' Life & Activities, Councils, Fests, Innovation & CTA.

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { RevealText } from "@/components/shared/motion/Reveal";
import { CouncilCard } from "./CouncilCard";
import { CAMPUS_LIFE_CONTENT } from "@/lib/about/content";
import {
  STUDENT_COUNCILS,
  CAMPUS_FESTIVALS,
  type StudentCouncil,
  type CampusFestival,
} from "@/lib/about/campus-life";
import { ABOUT_TOKENS } from "@/lib/about/tokens";

export function CampusLifeSection({
  content = CAMPUS_LIFE_CONTENT,
  councils = STUDENT_COUNCILS,
  festivals = CAMPUS_FESTIVALS,
}: {
  content?: typeof CAMPUS_LIFE_CONTENT;
  councils?: StudentCouncil[];
  festivals?: CampusFestival[];
}) {
  return (
    <section
      id={content.id}
      aria-label={content.title}
      className="w-full bg-neutral-50 text-neutral-950 scroll-mt-[var(--header-stack-h)]"
    >
      <div
        className="mx-auto max-w-[1440px]"
        style={{
          paddingInline: ABOUT_TOKENS.paddingInline,
          paddingTop: ABOUT_TOKENS.paddingVertical,
          paddingBottom: ABOUT_TOKENS.paddingVertical,
        }}
      >
        <ChapterHeader index={content.index} title={content.title} tone="light" />

        {/* Intro */}
        <RevealText>
          <p className="text-[17px] leading-[1.7] text-neutral-950/75 max-w-[62ch] text-pretty mb-16 lg:mb-24">
            {content.intro}
          </p>
        </RevealText>

        {/* Student Councils */}
        <div className="mb-20 lg:mb-28">
          <h3 className="text-[13px] uppercase tracking-[0.12em] text-neutral-950/50 mb-10">
            Student Councils
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {councils.map((c) => (
              <CouncilCard key={c.id} council={c} />
            ))}
          </div>
        </div>

        {/* Festivals at IITK */}
        <div className="mb-20 lg:mb-28">
          <h3 className="text-[13px] uppercase tracking-[0.12em] text-neutral-950/50 mb-10">
            Festivals at IITK
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-neutral-950/10">
            {festivals.map((fest) => (
              <div key={fest.id} className="py-8 lg:py-0 lg:px-8 first:pl-0 last:pr-0 flex flex-col gap-5">
                <div className="h-[72px] w-[72px] rounded-2xl bg-neutral-950/5 flex items-center justify-center p-2.5 overflow-hidden border border-neutral-950/10 shrink-0">
                  <Image
                    src={fest.logo}
                    alt={fest.alt}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h4
                  className="font-medium text-neutral-950 tracking-tight"
                  style={{ fontSize: "clamp(2rem, 3.6vw, 3.5rem)" }}
                >
                  {fest.title}
                </h4>
                <p className="text-[15px] leading-[1.65] text-neutral-950/70 text-pretty">
                  {fest.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Student Innovation */}
        <div className="pt-12 border-t border-neutral-950/10 mb-20 lg:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
            <div className="lg:col-span-4">
              <h3 className="text-[24px] sm:text-[28px] font-medium text-neutral-950 tracking-tight leading-snug">
                {content.innovationTitle}
              </h3>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[17px] leading-[1.7] text-neutral-950/75 text-pretty">
                {content.innovationParagraph}
              </p>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="pt-12 border-t border-neutral-950/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h4 className="text-[22px] sm:text-[26px] font-medium text-neutral-950 tracking-tight">
              Hiring from IIT Kanpur?
            </h4>
            <p className="text-[15px] text-neutral-950/60 mt-1">
              Connect with the Students&apos; Placement Office to coordinate recruitment.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/recruiters/why-iitk"
              className="h-[46px] px-6 rounded-md bg-neutral-950 text-white font-semibold text-sm inline-flex items-center justify-center hover:bg-neutral-800 transition-colors shadow-sm active:scale-95"
            >
              Recruit with us
            </Link>
            <Link
              href="https://placement.iitk.ac.in/login"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[46px] px-6 rounded-md bg-neutral-950/10 backdrop-blur-md border border-neutral-950/20 text-neutral-950 font-semibold text-sm inline-flex items-center justify-center hover:bg-neutral-950/20 transition-colors active:scale-95"
            >
              Student login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
