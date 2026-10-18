"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Section } from "@/components/shared/layout/Section";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { StudentProcedureStep } from "@/lib/students/data";

function StepRow({
  item,
  index,
  total,
}: {
  item: StudentProcedureStep;
  index: number;
  total: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 80%", "center 50%"],
  });

  const numeralOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 1 : 0.2, 1]
  );

  return (
    <div
      ref={rowRef}
      className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline border-b border-neutral-950/10"
      style={{
        paddingTop: "clamp(28px, 4vh, 48px)",
        paddingBottom: "clamp(28px, 4vh, 48px)",
      }}
    >
      {/* Numeral: cols 1-3 */}
      <div className="md:col-span-3 flex items-baseline">
        <motion.span
          style={{ opacity: numeralOpacity }}
          className="font-mono font-medium tracking-tight text-neutral-950 select-none leading-none tabular-nums"
        >
          <span style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}>
            {item.step}
          </span>
        </motion.span>
      </div>

      {/* Step text: cols 4-11 */}
      <div className="md:col-span-8 md:col-start-4 space-y-2">
        <h3 className="text-sm uppercase tracking-wider text-neutral-950/50 font-medium">
          Step {index + 1} of {total} · {item.title}
        </h3>
        <p
          className="font-normal leading-[1.4] text-neutral-950 max-w-[52ch]"
          style={{ fontSize: "clamp(1.25rem, 1.9vw, 1.75rem)" }}
        >
          {item.text}
        </p>
      </div>
    </div>
  );
}

interface StudentsProcedureProps {
  steps: StudentProcedureStep[];
}

export function StudentsProcedure({ steps }: StudentsProcedureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 75%"],
  });

  const lineScaleY = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 1 : 0, 1]
  );

  return (
    <Section id="steps" surface="light" aria-labelledby="chapter-steps">
      <ChapterHeader
        id="chapter-steps"
        index="02"
        title="Procedure"
        count={`${steps.length} STEPS`}
        tone="light"
        lead="The step-by-step registration, verification, and placement process for IIT Kanpur students."
      />

      <div ref={containerRef} className="relative w-full">
        {/* 1px vertical line running through the numeral column on >=768px */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[1px] bg-neutral-950/10 pointer-events-none">
          <motion.div
            style={{
              scaleY: lineScaleY,
              transformOrigin: "top",
            }}
            className="w-full h-full bg-neutral-950"
          />
        </div>

        <ol className="w-full list-none p-0 m-0 pl-0 md:pl-6 border-t border-neutral-950/10">
          {steps.map((item, idx) => (
            <li key={item.step}>
              <StepRow
                item={item}
                index={idx}
                total={steps.length}
              />
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
