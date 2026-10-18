"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/features/navigation/Navbar";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import { TOKENS } from "@/lib/tokens";

interface ArticleHeroProps {
  title: string;
  type: "placement" | "internship";
  year: string;
  date: string;
  readTime: string;
  role?: string;
  company?: string;
}

export function ArticleHero({
  title,
  type,
  year,
  date,
  readTime,
  role,
  company,
}: ArticleHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const typeLabel = type === "placement" ? "Placement" : "Internship";

  return (
    <section
      aria-label="Article Header"
      className="relative flex min-h-[56svh] flex-col justify-between bg-neutral-950 text-white overflow-hidden"
      style={{
        paddingTop: "var(--nav-h)",
      }}
    >
      <Navbar tone="dark" variant="bar" />

      {/* Intentional negative space */}
      <div className="flex-1 min-h-[6vh] sm:min-h-[10vh]" aria-hidden="true" />

      <div
        className="mx-auto w-full max-w-[1440px] pb-10 sm:pb-14"
        style={{ paddingInline: TOKENS.paddingInline }}
      >
        {/* Back Link */}
        <Link
          href="/insights"
          className="group inline-flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors mb-8"
        >
          <IconArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span className="relative">
            SPO Insights
            <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#93c5fd] transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>

        {/* Eyebrow */}
        <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/50 mb-4">
          {typeLabel} · {year}
        </p>

        {/* Title */}
        <motion.h1
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: TOKENS.ease }}
          className="font-medium tracking-[-0.04em] leading-[0.95] text-white mb-8 lg:max-w-[18ch]"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)" }}
        >
          {title}
        </motion.h1>

        {/* Hairline */}
        <div className="h-[1px] w-full bg-white/10 mb-6" />

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-white/65">
          {date && (
            <span className="font-mono text-[13px] tabular-nums text-white/80">
              {date}
            </span>
          )}

          {readTime && (
            <>
              <span className="h-3 w-[1px] bg-white/10" aria-hidden="true" />
              <span>{readTime}</span>
            </>
          )}

          {company && (
            <>
              <span className="h-3 w-[1px] bg-white/10" aria-hidden="true" />
              <span className="font-medium text-white">{company}</span>
            </>
          )}

          {role && (
            <>
              <span className="h-3 w-[1px] bg-white/10" aria-hidden="true" />
              <span>{role}</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
