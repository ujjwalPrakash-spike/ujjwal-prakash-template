// Dark bottom-anchored closing section on /news with large link row.
"use client";

import React from "react";
import Link from "next/link";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import { NEWS_CONFIG } from "@/lib/news/config";
import { TOKENS } from "@/lib/tokens";

export function NewsClosing() {
  return (
    <section
      aria-label="News Inquiries & Subscriptions"
      style={{
        paddingLeft: TOKENS.paddingInline,
        paddingRight: TOKENS.paddingInline,
        paddingBlock: "clamp(80px, 12vh, 160px)",
      }}
      className="relative w-full bg-neutral-950 text-white select-none border-t border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-white/50 mb-6">
          DISPATCH PROTOCOL
        </p>

        <h2
          className="font-sans font-medium tracking-[-0.04em] leading-[0.95] text-white max-w-[18ch] mb-12 sm:mb-16"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)" }}
        >
          {NEWS_CONFIG.closing.heading}
        </h2>

        {/* Large Link Row */}
        <div className="border-t border-b border-white/15">
          <Link
            href={NEWS_CONFIG.closing.linkHref}
            className="group flex items-center justify-between py-8 md:py-12 outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-sm transition-colors"
          >
            <span
              className="font-sans font-medium tracking-tight text-white transition-transform duration-300 ease-out group-hover:translate-x-3"
              style={{ fontSize: "clamp(1.5rem, 3.2vw, 3rem)" }}
            >
              {NEWS_CONFIG.closing.linkLabel}
            </span>

            <ArrowCircle size={56} tone="dark" direction="right" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NewsClosing;
