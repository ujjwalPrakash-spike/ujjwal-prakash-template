// Photography-led car architectural showcase with scroll-linked layered depth.
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ImageSlot } from "@/components/shared/ui/ImageSlot";
import { CountUp } from "@/components/shared/motion/CountUp";
import { RevealLine, RevealTitleLine } from "@/components/shared/motion/Reveal";
import { CAR_DATA } from "@/lib/team/members";
import { TOKENS } from "@/lib/tokens";

export function CarSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Car translates -3vw to 3vw and scales 1.0 to 1.04
  const carX = useTransform(smoothProgress, [0, 1], ["-3vw", "3vw"]);
  const carScale = useTransform(smoothProgress, [0, 1], [1.0, 1.04]);
  // Title moves opposite way at a third distance: 1vw to -1vw
  const titleX = useTransform(smoothProgress, [0, 1], ["1vw", "-1vw"]);

  return (
    <section
      ref={sectionRef}
      id="car"
      aria-label="Machine Architecture"
      className="relative w-full bg-neutral-950 text-white overflow-hidden"
      style={{
        paddingInline: TOKENS.paddingInline,
        paddingTop: "clamp(64px, 10vh, 120px)",
        paddingBottom: "clamp(64px, 10vh, 120px)",
      }}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Top Meta Strip: Eyebrow + Single Right-Aligned Sentence */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4 md:mb-6">
          <p className="font-sans text-[13px] uppercase tracking-[0.12em] text-white/50 shrink-0">
            The car
          </p>
          <p className="font-sans text-[16px] md:text-[17px] text-white/75 max-w-[44ch] md:text-right leading-relaxed">
            {CAR_DATA.line}
          </p>
        </div>

        {/* Layered Moment: Giant Title behind Car */}
        <div className="relative w-full flex flex-col items-center justify-center my-4 md:my-8">
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : titleX,
            }}
            className="relative z-0 w-full text-center select-none pointer-events-none"
          >
            <h2
              className="font-sans font-medium text-white tracking-[-0.05em] leading-[0.85] whitespace-nowrap"
              style={{ fontSize: "clamp(5rem, 17vw, 17rem)" }}
            >
              <RevealTitleLine delay={0.05}>{CAR_DATA.title}</RevealTitleLine>
            </h2>
          </motion.div>

          {/* Car ImageSlot overlapping bottom 25% of title */}
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : carX,
              scale: shouldReduceMotion ? 1 : carScale,
            }}
            className="relative z-10 w-[85vw] max-w-[1360px] -mt-[4vw] md:-mt-[5vw] lg:-mt-[6vw]"
          >
            <ImageSlot
              src={CAR_DATA.image}
              alt={CAR_DATA.imageAlt || `${CAR_DATA.title} silhouette`}
              aspectRatio="21:7"
              tone="dark"
              silent
              border={false}
              imageClassName="object-contain"
              sizes="(max-width: 1440px) 85vw, 1360px"
              className="w-full aspect-[21/7] !border-0 !shadow-none"
            />
          </motion.div>
        </div>

        {/* Specs Strip */}
        <div className="w-full mt-10 md:mt-14">
          <RevealLine tone="dark" className="mb-6 md:mb-8" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {CAR_DATA.specs.slice(0, 5).map((spec, i) => {
              const numValue = Number(spec.value);
              const isNumeric = !Number.isNaN(numValue) && spec.value.trim() !== "";

              return (
                <div
                  key={spec.label}
                  className={`flex flex-col pt-4 md:pt-0 ${
                    i === 0 ? "md:pl-0" : "md:px-5 lg:px-6"
                  } ${i === CAR_DATA.specs.length - 1 ? "md:pr-0" : ""}`}
                >
                  <span className="font-sans text-[13px] uppercase tracking-[0.12em] text-white/50 mb-2">
                    {spec.label}
                  </span>
                  <div
                    className="font-sans font-medium text-white tracking-[-0.02em] flex items-baseline"
                    style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.5rem)" }}
                  >
                    {isNumeric ? (
                      <span className="font-mono tabular-nums">
                        <CountUp value={numValue} />
                      </span>
                    ) : (
                      <span>{spec.value}</span>
                    )}
                    {spec.unit ? (
                      <span className="text-white/55 font-sans font-normal text-sm md:text-base ml-1.5">
                        {spec.unit}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <RevealLine tone="dark" className="mt-6 md:mt-8" />
        </div>
      </div>
    </section>
  );
}

export default CarSection;
