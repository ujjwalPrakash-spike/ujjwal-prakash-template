"use client";

import React from "react";
import { Navbar } from "@/components/features/navigation/Navbar";
import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/shared/motion/CountUp";
import { TOKENS } from "@/lib/tokens";

interface InsightsHeroProps {
  totalInsights: number;
  totalPlacements: number;
  totalInternships: number;
  totalCompanies: number;
}

export function InsightsHero({
  totalInsights,
  totalPlacements,
  totalInternships,
  totalCompanies,
}: InsightsHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const titleAnim = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, transition: { duration: 0.9, ease: TOKENS.ease } };

  return (
    <section
      aria-label="SPO Insights Introduction"
      className="relative flex min-h-[70svh] flex-col justify-between bg-neutral-950 text-white overflow-hidden"
      style={{
        paddingTop: "var(--nav-h)",
      }}
    >
      <Navbar tone="dark" variant="bar" />

      {/* Intentional space above content */}
      <div className="flex-1 min-h-[10vh] sm:min-h-[14vh]" aria-hidden="true" />

      <div
        className="mx-auto w-full max-w-[1440px] pb-12 sm:pb-16"
        style={{ paddingInline: TOKENS.paddingInline }}
      >
        {/* Eyebrow */}
        <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/50 mb-6">
          Students&apos; Placement Office · Insights
        </p>

        {/* Title */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
            animate={titleAnim}
            className="font-medium tracking-[-0.05em] leading-[0.88] text-white"
            style={{ fontSize: "clamp(3.25rem, 11vw, 11rem)" }}
          >
            SPO Insights
          </motion.h1>
        </div>

        {/* Lead */}
        <p
          className="text-white/75 leading-[1.6] max-w-[58ch] mb-12"
          style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)" }}
        >
          Explore interview experiences and preparation strategies from IIT Kanpur students.
        </p>

        {/* Hairline */}
        <div className="h-[1px] w-full bg-white/10 mb-8" />

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div
              className="font-mono tabular-nums font-normal text-white mb-1"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              <CountUp value={totalInsights} />
            </div>
            <p className="text-[13px] text-white/55 font-normal">Total insights</p>
          </div>

          <div className="border-l border-white/10 pl-6 sm:pl-8">
            <div
              className="font-mono tabular-nums font-normal text-white mb-1"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              <CountUp value={totalPlacements} />
            </div>
            <p className="text-[13px] text-white/55 font-normal">Placement experiences</p>
          </div>

          <div className="border-l border-white/10 pl-6 sm:pl-8">
            <div
              className="font-mono tabular-nums font-normal text-white mb-1"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              <CountUp value={totalInternships} />
            </div>
            <p className="text-[13px] text-white/55 font-normal">Internship experiences</p>
          </div>

          <div className="border-l border-white/10 pl-6 sm:pl-8">
            <div
              className="font-mono tabular-nums font-normal text-white mb-1"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              <CountUp value={totalCompanies} />
            </div>
            <p className="text-[13px] text-white/55 font-normal">Companies</p>
          </div>
        </div>
      </div>
    </section>
  );
}
