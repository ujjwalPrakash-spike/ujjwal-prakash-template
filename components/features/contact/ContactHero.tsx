// Contact hero section with bottom-anchored display title, editorial intro, and quick facts strip.
"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTACT_CONFIG } from "@/config/contact";
import { TOKENS } from "@/lib/tokens";

export function ContactHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full min-h-[60svh] flex flex-col justify-end bg-neutral-950 text-white pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
      <div
        className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-end"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: TOKENS.ease }}
          className="font-mono text-xs sm:text-[13px] uppercase tracking-[0.2em] text-[#93c5fd] mb-4 sm:mb-6"
        >
          {CONTACT_CONFIG.eyebrow}
        </motion.p>

        {/* Massive Display Title */}
        <div className="overflow-hidden mb-6 sm:mb-8">
          <motion.h1
            initial={{ y: shouldReduceMotion ? 0 : "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: TOKENS.durationText,
              ease: TOKENS.ease,
            }}
            className="font-sans font-medium tracking-[-0.05em] leading-[0.85] text-white"
            style={{ fontSize: "clamp(4rem, 17vw, 17rem)" }}
          >
            {CONTACT_CONFIG.title}
          </motion.h1>
        </div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: TOKENS.ease,
          }}
          className="text-white/75 text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed max-w-[48ch] mb-12 sm:mb-16"
        >
          {CONTACT_CONFIG.intro}
        </motion.p>

        {/* Animated Hairline */}
        <motion.div
          initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: TOKENS.durationLine,
            delay: 0.25,
            ease: TOKENS.ease,
          }}
          className="origin-left w-full h-px bg-white/10 mb-8 sm:mb-10"
        />

        {/* Quick Facts Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 pt-2">
          <div>
            <span className="block font-mono text-[12px] uppercase tracking-[0.14em] text-white/45 mb-1">
              Response Time
            </span>
            <span className="font-mono text-[15px] sm:text-[16px] text-white">
              {CONTACT_CONFIG.quickFacts.responseTime}
            </span>
          </div>

          <div>
            <span className="block font-mono text-[12px] uppercase tracking-[0.14em] text-white/45 mb-1">
              Direct Inquiries
            </span>
            <a
              href={`mailto:${CONTACT_CONFIG.quickFacts.email}`}
              className="font-mono text-[15px] sm:text-[16px] text-white hover:text-[#93c5fd] transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-[#93c5fd]"
            >
              {CONTACT_CONFIG.quickFacts.email}
            </a>
          </div>

          <div>
            <span className="block font-mono text-[12px] uppercase tracking-[0.14em] text-white/45 mb-1">
              Telephone
            </span>
            <a
              href={CONTACT_CONFIG.quickFacts.phoneHref}
              className="font-mono text-[15px] sm:text-[16px] text-white hover:text-[#93c5fd] transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-[#93c5fd]"
            >
              {CONTACT_CONFIG.quickFacts.phone}
            </a>
          </div>

          <div>
            <span className="block font-mono text-[12px] uppercase tracking-[0.14em] text-white/45 mb-1">
              Atelier Hours
            </span>
            <span className="font-mono text-[15px] sm:text-[16px] text-white">
              {CONTACT_CONFIG.quickFacts.hours}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
