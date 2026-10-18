// Light bottom-anchored closing call-to-action section before the overlapping footer.
"use client";

import React from "react";
import { Section } from "@/components/shared/layout/Section";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import { MERCH_CONFIG } from "@/lib/merch/config";

export function MerchClosing() {
  return (
    <Section id="inquiries" surface="light" className="pb-36 sm:pb-48">
      <div className="space-y-8 max-w-4xl">
        <span className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500 block">
          COMMISSION & ARCHIVE DISPATCH
        </span>

        <h2
          className="font-sans font-medium tracking-tight text-neutral-950 leading-[0.92]"
          style={{ fontSize: "clamp(2.75rem, 7vw, 7rem)" }}
        >
          {MERCH_CONFIG.closingHeading}
        </h2>

        {/* Large link row with ArrowCircle */}
        <div className="pt-6">
          <a
            href={MERCH_CONFIG.contactLink}
            className="group flex items-center justify-between py-6 sm:py-8 border-y border-neutral-950/15 hover:border-neutral-950 transition-colors"
          >
            <span
              className="font-sans font-medium text-neutral-950 tracking-tight group-hover:translate-x-2 transition-transform duration-300"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)" }}
            >
              {MERCH_CONFIG.closingActionText}
            </span>
            <ArrowCircle size={52} tone="light" direction="up-right" />
          </a>
        </div>
      </div>
    </Section>
  );
}

export default MerchClosing;
