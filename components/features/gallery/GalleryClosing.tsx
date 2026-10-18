// Dark bottom-anchored closing section before site footer with large link row and ArrowCircle.
"use client";

import React from "react";
import Link from "next/link";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import { GALLERY_CONFIG } from "@/lib/gallery/config";
import { TOKENS } from "@/lib/tokens";

export function GalleryClosing() {
  return (
    <section
      aria-label="Atelier Inquiries"
      style={{
        paddingLeft: TOKENS.paddingInline,
        paddingRight: TOKENS.paddingInline,
      }}
      className="w-full bg-neutral-950 text-white pt-24 pb-36 sm:pb-48 select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col justify-end space-y-8">
        <span className="text-xs font-mono uppercase tracking-[0.16em] text-white/50 block">
          {GALLERY_CONFIG.closingEyebrow}
        </span>

        <h2
          className="font-sans font-medium tracking-tight text-white leading-[0.95]"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)" }}
        >
          {GALLERY_CONFIG.closingHeading}
        </h2>

        {/* Large link row with ArrowCircle */}
        <div className="pt-6">
          <Link
            href={GALLERY_CONFIG.contactLink}
            className="group flex items-center justify-between py-6 sm:py-8 border-y border-white/15 hover:border-white transition-colors outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
          >
            <span
              className="font-sans font-medium text-white tracking-tight group-hover:translate-x-2 transition-transform duration-300"
              style={{ fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)" }}
            >
              {GALLERY_CONFIG.closingActionText}
            </span>
            <ArrowCircle size={52} tone="dark" direction="up-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GalleryClosing;
