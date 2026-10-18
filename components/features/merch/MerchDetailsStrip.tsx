// Dark architectural details strip displaying three structural standards from data.
"use client";

import React from "react";
import { Section } from "@/components/shared/layout/Section";
import { DETAILS_STRIP_COLUMNS } from "@/lib/merch/data";

export function MerchDetailsStrip() {
  return (
    <Section id="craft-specs" surface="dark" className="border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {DETAILS_STRIP_COLUMNS.map((col, idx) => (
          <div
            key={idx}
            className="flex flex-col py-8 sm:py-0 px-0 md:px-8 first:pl-0 last:pr-0 space-y-4"
          >
            <div className="font-mono text-xs text-[#93c5fd] tracking-widest uppercase">
              {col.index}
            </div>
            <h3
              className="font-sans font-medium text-white tracking-tight"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
            >
              {col.title}
            </h3>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed font-sans">
              {col.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default MerchDetailsStrip;
