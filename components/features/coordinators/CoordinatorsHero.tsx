"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/features/navigation/Navbar";
import { TOKENS } from "@/lib/tokens";
import { OVERALL_COORDINATORS } from "@/lib/coordinators/overall";
import { ASSISTANT_COORDINATORS } from "@/lib/coordinators/assistants";
import { DEPARTMENT_COORDINATORS } from "@/lib/coordinators/departments";
import { countDistinct } from "@/lib/utils/collections";

export function CoordinatorsHero() {
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    { value: OVERALL_COORDINATORS.length, label: "Overall Coordinators" },
    { value: ASSISTANT_COORDINATORS.length, label: "Assistant Coordinators" },
    { value: DEPARTMENT_COORDINATORS.length, label: "Department Coordinators" },
    {
      value: countDistinct(DEPARTMENT_COORDINATORS, (p) => p.department),
      label: "Distinct Departments",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-neutral-950 text-white flex flex-col justify-between overflow-hidden pt-16">
      <Navbar tone="dark" variant="bar" />

      <div className="flex-1 min-h-[10vh]" />

      <div
        className="mx-auto w-full max-w-[1440px] shrink-0"
        style={{
          paddingInline: TOKENS.paddingInline,
          paddingBottom: "clamp(48px, 8vh, 80px)",
        }}
      >
        <motion.p
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: TOKENS.ease }}
          className="text-[13px] uppercase tracking-[0.12em] text-white/50 mb-4"
        >
          IITK · Students&apos; Placement Office
        </motion.p>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 0.9, delay: 0.1, ease: TOKENS.ease }}
            className="font-sans font-medium tracking-[-0.05em] leading-[0.88] text-white"
            style={{ fontSize: "clamp(3.25rem, 11.5vw, 11.5rem)" }}
          >
            Placement <br /> Coordinators
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: TOKENS.ease }}
          className="text-white/75 text-[17px] sm:text-[19px] leading-[1.6] max-w-[56ch] mb-12"
        >
          Feel free to reach out to us at{" "}
          <a
            href="mailto:spo@iitk.ac.in"
            className="text-white underline underline-offset-4 decoration-1 hover:decoration-[#93c5fd] hover:text-[#93c5fd] transition-colors"
          >
            spo@iitk.ac.in
          </a>
        </motion.p>

        <div className="w-full">
          <div className="h-[1px] w-full bg-white/10 mb-6" />
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: TOKENS.ease }}
            className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col py-4 px-2 sm:px-6 first:pl-0 last:pr-0">
                <span
                  className="font-mono tabular-nums font-medium text-white tracking-tight"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  {stat.value}
                </span>
                <span className="text-[13px] text-white/55 font-normal tracking-wide mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
