"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/features/navigation/Navbar";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { IconArrowUpRight, IconArrowDown } from "@tabler/icons-react";
import { StudentsTicker, TickerCompany } from "./StudentsTicker";
import { STUDENT_HERO_DATA } from "@/lib/students/data";
import { HERO_CONFIG } from "@/lib/site/constants";
import { TOKENS } from "@/lib/tokens";

interface StudentsHeroProps {
  totalInsights?: number;
  totalSteps?: number;
  totalResources?: number;
  totalRoadmaps?: number;
  totalFaqs?: number;
  topCompanies?: TickerCompany[];
}

function useMediaQuery(query: string, defaultState = false) {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => defaultState
  );
}

export function StudentsHero({
  totalInsights = 0,
  topCompanies = [],
}: StudentsHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const isMobile = useMediaQuery("(max-width: 767px)", false);
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)", false);

  // Parallax scroll hooks
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Background photo parallax: 0 to 25% translateY, 1.18 to 1.06 scale (halved on mobile)
  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion
      ? ["0%", "0%"]
      : isMobile
      ? ["0%", "12.5%"]
      : ["0%", "25%"]
  );

  const photoScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion
      ? [1.06, 1.06]
      : isMobile
      ? [1.12, 1.04]
      : [1.18, 1.06]
  );

  // Title lines drift apart as you scroll
  const forY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion
      ? ["0vh", "0vh"]
      : isMobile
      ? ["0vh", "3vh"]
      : ["0vh", "6vh"]
  );

  const studentsY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion
      ? ["0vh", "0vh"]
      : isMobile
      ? ["0vh", "-2vh"]
      : ["0vh", "-4vh"]
  );

  // Bottom row and ticker fade over the last 35% of the hero scroll range
  const bottomOpacity = useTransform(
    scrollYProgress,
    [0.65, 1],
    shouldReduceMotion ? [1, 1] : [1, 0]
  );

  // Pointer parallax (subtle spring-damped, max 8px, disabled on touch/mobile/reduced motion)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const pointerX = useSpring(rawMouseX, { damping: 30, stiffness: 180, mass: 0.5 });
  const pointerY = useSpring(rawMouseY, { damping: 30, stiffness: 180, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || isMobile || !canHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 16 - 8;
    const y = ((e.clientY - rect.top) / rect.height) * 16 - 8;
    rawMouseX.set(x);
    rawMouseY.set(y);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="For Students Introduction"
      className="relative flex min-h-[100svh] w-full flex-col justify-between bg-neutral-950 text-white overflow-hidden"
    >
      {/* 1. Background Photo Layer with Parallax */}
      <motion.div
        style={{
          y: photoY,
          scale: photoScale,
          willChange: "transform",
        }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <motion.div
          style={{
            x: pointerX,
            y: pointerY,
          }}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeOut" },
            scale: { duration: 1.6, ease: TOKENS.ease },
          }}
          className="relative w-full h-full"
        >
          {HERO_CONFIG.posterUrl && (
            <Image
              src={HERO_CONFIG.posterUrl}
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className="object-cover"
            />
          )}
          {/* Flat dark scrim over it (neutral-950 at ~55% opacity, no gradients, passes 4.5:1) */}
          <div className="absolute inset-0 bg-neutral-950/55 pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* Main Navbar */}
      <Navbar tone="dark" variant="bar" />

      {/* 2 & 3 & 4. Foreground Content Container */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between"
        style={{
          paddingInline: TOKENS.paddingInline,
          paddingTop: "calc(var(--nav-h-top, 64px) + 32px)",
        }}
      >
        {/* Top-left Eyebrow (at least 32px below the navbar) */}
        <div className="shrink-0">
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: TOKENS.ease }}
            className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/60 select-none"
          >
            {STUDENT_HERO_DATA.eyebrow}
          </motion.p>
        </div>

        {/* Intentionally empty photo space in upper third */}
        <div className="flex-1 min-h-[4vh] sm:min-h-[8vh]" aria-hidden="true" />

        {/* Focal Point: Two-line editorial title block in lower third */}
        <div className="w-full shrink-0 mb-6 sm:mb-8">
          {/* Line 1: "For" (left-aligned) */}
          <div className="overflow-hidden">
            <motion.div
              style={{
                y: forY,
                willChange: "transform",
              }}
            >
              <motion.span
                initial={shouldReduceMotion ? { opacity: 0 } : { y: "100%" }}
                animate={shouldReduceMotion ? { opacity: 1 } : { y: "0%" }}
                transition={{ duration: 0.9, ease: TOKENS.ease }}
                className="block font-medium tracking-[-0.05em] text-white select-none"
                style={{
                  fontSize: isMobile
                    ? "clamp(3.5rem, 18vw, 7rem)"
                    : "clamp(4.5rem, min(14.5vw, 22vh), 16rem)",
                  lineHeight: 0.85,
                }}
              >
                {STUDENT_HERO_DATA.titlePart1}
              </motion.span>
            </motion.div>
          </div>

          {/* Line 2: "students" (indented to start at column 3 of 12-col grid on >=768px) */}
          <div className="overflow-hidden md:pl-[16.666%]">
            <motion.div
              style={{
                y: studentsY,
                willChange: "transform",
              }}
            >
              <motion.span
                initial={shouldReduceMotion ? { opacity: 0 } : { y: "100%" }}
                animate={shouldReduceMotion ? { opacity: 1 } : { y: "0%" }}
                transition={{ duration: 0.9, delay: 0.12, ease: TOKENS.ease }}
                className="block font-medium tracking-[-0.05em] text-white select-none"
                style={{
                  fontSize: isMobile
                    ? "clamp(3.5rem, 18vw, 7rem)"
                    : "clamp(4.5rem, min(14.5vw, 22vh), 16rem)",
                  lineHeight: 0.85,
                }}
              >
                {STUDENT_HERO_DATA.titlePart2}
              </motion.span>
            </motion.div>
          </div>
        </div>

        {/* Bottom Row: Lead sentence & Links (stays fixed relative to hero, fades on last 35%) */}
        <motion.div
          style={{ opacity: bottomOpacity }}
          className="w-full shrink-0 pb-6 sm:pb-8"
        >
          {/* Optional announcement notice if non-empty */}
          {STUDENT_HERO_DATA.notice ? (
            <div className="mb-3 flex items-center gap-2 text-xs text-[#93c5fd]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#93c5fd] animate-pulse shrink-0" />
              <span>{STUDENT_HERO_DATA.notice}</span>
            </div>
          ) : null}

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            {/* Left: Lead sentence */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: TOKENS.ease }}
              className="font-normal text-white/75 leading-[1.5] max-w-[36ch]"
              style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)" }}
            >
              {STUDENT_HERO_DATA.lead}
            </motion.p>

            {/* Right: Primary & Secondary Links */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: TOKENS.ease }}
              className="flex flex-wrap items-center gap-6 sm:gap-8 shrink-0"
            >
              {/* Primary Link: SPO Insights */}
              <Link
                href="/insights"
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-4 rounded"
              >
                <span className="relative">
                  SPO Insights
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#93c5fd] transition-all duration-300 ease-out group-hover:w-full" />
                </span>
                {totalInsights > 0 && (
                  <span className="font-mono text-[13px] text-white/60 tabular-nums">
                    {totalInsights} insights
                  </span>
                )}
                <IconArrowUpRight
                  size={16}
                  className="text-white/60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#93c5fd]"
                />
              </Link>

              {/* Secondary Link: Browse resources */}
              <a
                href="#steps"
                className="group inline-flex items-center gap-1.5 text-[14px] text-white/60 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-4 rounded"
              >
                <span className="relative">
                  Browse resources
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white/40 transition-all duration-300 ease-out group-hover:w-full" />
                </span>
                <IconArrowDown
                  size={16}
                  className="text-white/40 transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-white"
                />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 5. Company Ticker (quieter, bottom edge of hero, fades on last 35%) */}
      {topCompanies && topCompanies.length >= 4 && (
        <motion.div
          style={{ opacity: bottomOpacity }}
          className="relative z-10 w-full shrink-0"
        >
          <StudentsTicker companies={topCompanies} />
        </motion.div>
      )}
    </section>
  );
}
