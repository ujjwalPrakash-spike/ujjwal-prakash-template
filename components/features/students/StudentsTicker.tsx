"use client";

import React from "react";
import Link from "next/link";
import { Marquee } from "@/components/shared/ui/Marquee";
import { useReducedMotion } from "framer-motion";
import { TOKENS } from "@/lib/tokens";

export interface TickerCompany {
  key: string;
  count: number;
}

interface StudentsTickerProps {
  companies: TickerCompany[];
}

export function StudentsTicker({ companies }: StudentsTickerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (!companies || companies.length < 4) return null;

  if (shouldReduceMotion) {
    return (
      <div className="w-full border-t border-white/10 bg-neutral-950/40 h-12 flex items-center">
        <div
          className="mx-auto flex w-full max-w-[1440px] items-center gap-x-6 overflow-x-auto no-scrollbar"
          style={{ paddingInline: TOKENS.paddingInline }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45 shrink-0 select-none">
            Insights from
          </span>
          <div className="flex items-center gap-6 shrink-0">
            {companies.map((c) => (
              <Link
                key={c.key}
                href={`/insights?company=${encodeURIComponent(c.key)}`}
                className="group inline-flex items-center gap-1.5 text-[13px] text-white/55 hover:text-white transition-colors"
              >
                <span>{c.key}</span>
                <span className="font-mono text-[11px] text-white/35 tabular-nums">
                  {c.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border-t border-white/10 bg-neutral-950/40 h-12 flex items-center">
      <div
        className="w-full mx-auto max-w-[1440px] flex items-center h-full"
        style={{ paddingInline: TOKENS.paddingInline }}
      >
        {/* Left static label outside scrolling area */}
        <div className="shrink-0 pr-5 border-r border-white/10 hidden sm:flex items-center h-full">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45 select-none">
            Insights from
          </span>
        </div>

        {/* Scrolling Marquee with edge fade */}
        <div
          className="flex-1 overflow-hidden pl-0 sm:pl-5 h-full flex items-center"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          }}
        >
          <Marquee direction="left" duration={65} pauseOnHover maskEdge={false}>
            <div className="flex items-center">
              {companies.map((c) => (
                <div key={c.key} className="flex items-center">
                  <Link
                    href={`/insights?company=${encodeURIComponent(c.key)}`}
                    className="group inline-flex items-center gap-2 px-5 text-[14px] text-white/55 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2"
                  >
                    <span className="transition-colors group-hover:text-white">
                      {c.key}
                    </span>
                    <span className="font-mono text-[12px] text-white/35 tabular-nums">
                      {c.count}
                    </span>
                  </Link>
                  <span className="h-3 w-[1px] bg-white/10 shrink-0" aria-hidden="true" />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
}
