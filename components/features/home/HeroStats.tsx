"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HERO_STATS } from "@/lib/home/hero-stats";

export function HeroStats() {
  const shouldReduceMotion = useReducedMotion();
  const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const hasStats = Boolean(HERO_STATS && HERO_STATS.length > 0);

  return (
    <div className="w-full flex items-center justify-between [@media(max-height:560px)]:hidden">
      {hasStats ? (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.35 : 0.6,
            delay: shouldReduceMotion ? 0.1 : 0.8,
            ease: cinematicEase,
          }}
          className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-3 sm:p-4 shadow-2xl flex items-center"
        >
          {/* 2x2 below 640px, one row from 640px up */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-0 sm:divide-x sm:divide-white/15">
            {HERO_STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col px-3 sm:px-5 py-0.5">
                <span className="font-mono tabular-nums text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/65 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <div />
      )}

      {/* Desktop-only 40px Scroll Cue */}
      <div className="hidden lg:flex items-center pl-6 shrink-0 ml-auto">
        <div className="w-[1.5px] h-[40px] bg-white/20 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-[#93c5fd] rounded-full animate-[scrollLine_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

export default HeroStats;
