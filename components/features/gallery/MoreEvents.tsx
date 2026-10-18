// Previous and next event navigation rows with large typography and ArrowCircle affordance.
"use client";

import React from "react";
import Link from "next/link";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import { TOKENS, NAV_INSET } from "@/lib/tokens";
import type { GalleryEvent } from "@/lib/gallery/types";

interface MoreEventsProps {
  prev: GalleryEvent | null;
  next: GalleryEvent | null;
}

export function MoreEvents({ prev, next }: MoreEventsProps) {
  return (
    <section
      aria-label="Adjacent Exhibitions"
      style={{
        paddingLeft: NAV_INSET,
        paddingRight: NAV_INSET,
      }}
      className="w-full bg-neutral-950 text-white py-16 sm:py-24 border-t border-white/10 select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col divide-y divide-white/15">
        {/* Previous Event Row */}
        {prev && (
          <Link
            href={`/gallery/${prev.slug}`}
            className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 sm:py-10 transition-colors hover:text-[#93c5fd] outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-mono uppercase tracking-[0.14em] text-white/50 group-hover:text-[#93c5fd] transition-colors">
                Previous Exhibition
              </span>
              <h3
                className="font-sans font-medium tracking-tight text-white group-hover:text-white transition-colors"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)" }}
              >
                {prev.title}
              </h3>
            </div>
            <div className="mt-4 sm:mt-0">
              <ArrowCircle size={48} tone="dark" direction="left" />
            </div>
          </Link>
        )}

        {/* Next Event Row */}
        {next && (
          <Link
            href={`/gallery/${next.slug}`}
            className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 sm:py-10 transition-colors hover:text-[#93c5fd] outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-mono uppercase tracking-[0.14em] text-white/50 group-hover:text-[#93c5fd] transition-colors">
                Next Exhibition
              </span>
              <h3
                className="font-sans font-medium tracking-tight text-white group-hover:text-white transition-colors"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)" }}
              >
                {next.title}
              </h3>
            </div>
            <div className="mt-4 sm:mt-0">
              <ArrowCircle size={48} tone="dark" direction="right" />
            </div>
          </Link>
        )}

        {/* All Galleries Row */}
        <Link
          href="/gallery"
          className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 sm:py-10 transition-colors hover:text-[#93c5fd] outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-mono uppercase tracking-[0.14em] text-white/50 group-hover:text-[#93c5fd] transition-colors">
              Index
            </span>
            <h3
              className="font-sans font-medium tracking-tight text-white group-hover:text-white transition-colors"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)" }}
            >
              All Exhibition Archives
            </h3>
          </div>
          <div className="mt-4 sm:mt-0">
            <ArrowCircle size={48} tone="dark" direction="up-right" />
          </div>
        </Link>
      </div>
    </section>
  );
}

export default MoreEvents;
