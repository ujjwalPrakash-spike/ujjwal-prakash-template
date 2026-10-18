"use client";

// Chapter 04: Notable Alumni on light surface with expandable list.

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { RevealText, RevealImage } from "@/components/shared/motion/Reveal";
import { ALUMNI_CONTENT } from "@/lib/about/content";
import { NOTABLE_ALUMNI, type NotableAlumnus } from "@/lib/about/alumni";
import { ABOUT_TOKENS } from "@/lib/about/tokens";

export function AlumniSection({
  content = ALUMNI_CONTENT,
  alumni = NOTABLE_ALUMNI,
}: {
  content?: typeof ALUMNI_CONTENT;
  alumni?: NotableAlumnus[];
}) {
  const [showAll, setShowAll] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const visibleCount = 8;
  const initialList = alumni.slice(0, visibleCount);
  const remainingList = alumni.slice(visibleCount);

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

        {/* Full-width Banner Image */}
        <RevealImage className="relative w-full aspect-[4/3] sm:aspect-[21/9] mb-12 lg:mb-16">
          <Image
            src={content.bannerImage.src}
            alt={content.bannerImage.alt}
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover"
          />
        </RevealImage>

        {/* Lead paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8 flex flex-col gap-5">
            {content.paragraphs.map((p, idx) => (
              <RevealText key={idx} delay={idx * 0.07}>
                <p className="text-[17px] leading-[1.7] text-neutral-950/75 max-w-[62ch] text-pretty">
                  {p}
                </p>
              </RevealText>
            ))}
          </div>
        </div>

        {/* Notable Alumni Name Roll */}
        <div className="w-full">
          <h3 className="text-[13px] uppercase tracking-[0.12em] text-neutral-950/50 mb-6">
            Notable Alumni
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 border-t border-neutral-950/10">
            {initialList.map((item) => (
              <div key={item.id} className="py-5 border-b border-neutral-950/10 flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm text-neutral-950/40">{item.id}</span>
                  <span
                    className="font-medium text-neutral-950 tracking-tight"
                    style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)" }}
                  >
                    {item.name}
                  </span>
                </div>
                <p className="text-[15px] text-neutral-950/60 pl-8 leading-snug">{item.role}</p>
              </div>
            ))}
          </div>

          {/* Expandable remaining alumni */}
          {remainingList.length > 0 ? (
            <div>
              <AnimatePresence initial={false}>
                {showAll ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.4, ease: ABOUT_TOKENS.ease }
                    }
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
                      {remainingList.map((item) => (
                        <div
                          key={item.id}
                          className="py-5 border-b border-neutral-950/10 flex flex-col gap-1"
                        >
                          <div className="flex items-baseline gap-3">
                            <span className="font-mono text-sm text-neutral-950/40">{item.id}</span>
                            <span
                              className="font-medium text-neutral-950 tracking-tight"
                              style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)" }}
                            >
                              {item.name}
                            </span>
                          </div>
                          <p className="text-[15px] text-neutral-950/60 pl-8 leading-snug">{item.role}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="mt-8 flex justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="px-6 py-2.5 rounded-md border border-neutral-950/20 text-neutral-950 text-sm font-medium hover:bg-neutral-950/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-4"
                >
                  {showAll ? "Show less" : `Show all (${alumni.length})`}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
