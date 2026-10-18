// Bottom-anchored dark editorial Hero section for the /merch lookbook.
"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/features/navigation/Navbar";
import { CountUp } from "@/components/shared/motion/CountUp";
import { TOKENS } from "@/lib/tokens";
import { MERCH_CONFIG } from "@/lib/merch/config";
import { getMerchStats, PRODUCTS } from "@/lib/merch/data";

export function MerchHero() {
  const shouldReduceMotion = useReducedMotion();
  const stats = getMerchStats(PRODUCTS);

  const heroStats = [
    { value: stats.total, label: "Catalogue Objects" },
    { value: stats.categories, label: "Technical Categories" },
    { value: stats.available, label: "Available Now" },
    { value: 100, suffix: "%", label: "Tested Integrity" },
  ];

  return (
    <section className="relative w-full min-h-[80svh] bg-neutral-950 text-white flex flex-col justify-between overflow-hidden pt-16">
      <Navbar tone="dark" variant="bar" />

      {/* Spacer to push content towards bottom */}
      <div className="flex-1 min-h-[8vh]" />

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
          {MERCH_CONFIG.eyebrow}
        </motion.p>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 0.9, delay: 0.1, ease: TOKENS.ease }}
            className="font-sans font-medium tracking-[-0.05em] leading-[0.88] text-white"
            style={{ fontSize: "clamp(3.5rem, 13vw, 13rem)" }}
          >
            {MERCH_CONFIG.title}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: TOKENS.ease }}
          className="text-white/75 text-[17px] sm:text-[19px] leading-[1.6] max-w-[56ch] mb-12"
        >
          {MERCH_CONFIG.lead}
        </motion.p>

        {/* Computed Stats Strip Under 1px Hairline */}
        <div className="w-full">
          <div className="h-[1px] w-full bg-white/10 mb-6" />
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: TOKENS.ease }}
            className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
          >
            {heroStats.map((st, idx) => (
              <div key={idx} className="flex flex-col py-4 px-2 sm:px-6 first:pl-0 last:pr-0">
                <span
                  className="font-mono tabular-nums font-medium text-white tracking-tight"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  <CountUp value={st.value} suffix={st.suffix} />
                </span>
                <span className="text-[13px] text-white/55 font-normal tracking-wide mt-1">
                  {st.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default MerchHero;
