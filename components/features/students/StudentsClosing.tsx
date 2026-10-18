"use client";

import React from "react";
import Link from "next/link";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import { CountUp } from "@/components/shared/motion/CountUp";
import { STUDENT_CLOSING_DATA } from "@/lib/students/data";
import { TOKENS } from "@/lib/tokens";

interface StudentsClosingProps {
  totalInsights: number;
}

export function StudentsClosing({ totalInsights }: StudentsClosingProps) {
  return (
    <section
      aria-label="Insights Directory Link"
      className="bg-neutral-50 text-neutral-950 py-24 lg:py-36"
      style={{ paddingInline: TOKENS.paddingInline }}
    >
      <div className="mx-auto w-full max-w-[1440px] space-y-12">
        <h2
          className="font-medium tracking-[-0.03em] leading-tight text-neutral-950 max-w-[20ch]"
          style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
        >
          {STUDENT_CLOSING_DATA.heading}
        </h2>

        <div className="border-t border-b border-neutral-950/15">
          <Link
            href={STUDENT_CLOSING_DATA.linkHref}
            className="group flex items-center justify-between py-10 transition-colors hover:bg-neutral-950/[0.02] px-4 -mx-4 rounded-xl"
          >
            <div className="flex items-center gap-6 sm:gap-8">
              <span className="font-mono text-sm text-neutral-950/40 tabular-nums">
                01
              </span>
              <span
                className="font-medium tracking-[-0.02em] text-neutral-950 transition-transform duration-200 group-hover:translate-x-3"
                style={{ fontSize: "clamp(1.5rem, 3.2vw, 3rem)" }}
              >
                {STUDENT_CLOSING_DATA.linkText}
              </span>
            </div>

            <div className="flex items-center gap-6">
              <span className="font-mono text-base text-neutral-950/50 tabular-nums">
                <CountUp value={totalInsights} /> experiences
              </span>
              <ArrowCircle
                size={56}
                tone="light"
                direction="right"
                className="transition-colors group-hover:bg-neutral-950 group-hover:text-white"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
