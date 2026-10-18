// Event detail hero with full-bleed background cover, 45% flat scrim, and scroll-linked scale and fade.
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { IconArrowLeft } from "@tabler/icons-react";
import { NAV_INSET } from "@/lib/tokens";
import { formatGalleryDate } from "@/lib/gallery/utils";
import type { GalleryEvent } from "@/lib/gallery/types";

interface EventHeroProps {
  event: GalleryEvent;
}

export function EventHero({ event }: EventHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Scroll transforms: background scales 1 -> 1.1, meta row fades
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const formattedDate = formatGalleryDate(event.date);
  const photoCountLabel = `${event.photos.length} Photographs`;

  return (
    <section
      ref={heroRef}
      aria-label={`${event.title} Exhibition Header`}
      style={{
        paddingLeft: NAV_INSET,
        paddingRight: NAV_INSET,
      }}
      className="relative w-full min-h-[80svh] bg-neutral-950 text-white flex flex-col justify-between pt-24 pb-12 sm:pb-16 overflow-hidden select-none"
    >
      {/* Full-Bleed Background Image with 45% Flat Scrim */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          style={{ scale: reduceMotion ? 1 : bgScale }}
          initial={{ scale: reduceMotion ? 1 : 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          {event.cover ? (
            <Image
              src={event.cover}
              alt={event.coverAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-900" />
          )}
        </motion.div>
        {/* Flat neutral-950 scrim at 45% (passes >4.5:1 text contrast) */}
        <div className="absolute inset-0 bg-neutral-950/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
      </div>

      {/* Top Left: Back link to Gallery with accent underline that grows on hover */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        <Link
          href="/gallery"
          className="group inline-flex items-center gap-2.5 text-[13px] font-mono uppercase tracking-wider text-white/70 hover:text-white transition-colors py-2 outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-sm"
        >
          <IconArrowLeft size={16} className="text-white/60 group-hover:text-white transition-colors" />
          <span className="relative">
            Gallery Archive
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#93c5fd] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </span>
        </Link>
      </div>

      {/* Bottom Anchored Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col justify-end mt-16 sm:mt-24">
        {/* Eyebrow / Series */}
        <div className="mb-3 sm:mb-4">
          <span className="text-xs sm:text-[13px] font-mono uppercase tracking-[0.14em] text-[#93c5fd]">
            {event.series}
          </span>
        </div>

        {/* Monumental Event Title (max 3 lines) */}
        <h1
          className="font-sans font-medium tracking-[-0.045em] leading-[0.9] text-white max-w-5xl"
          style={{ fontSize: "clamp(2.75rem, 8.5vw, 8.5rem)" }}
        >
          {event.title}
        </h1>

        {/* Meta Row (Fades on scroll) */}
        <motion.div
          style={{ opacity: reduceMotion ? 1 : metaOpacity }}
          className="mt-6 sm:mt-8 pt-6 border-t border-white/15 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          {/* Metadata items separated by 1px verticals */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-[13px] font-mono text-white/75">
            <span>{formattedDate}</span>
            <span className="w-[1px] h-3 bg-white/20" />
            <span>{event.location}</span>
            <span className="w-[1px] h-3 bg-white/20" />
            <span className="tabular-nums">{photoCountLabel}</span>
          </div>

          {/* Summary Line (16px white/75, max 50ch) */}
          {event.summary && (
            <p className="text-sm sm:text-base text-white/75 max-w-[50ch] leading-relaxed">
              {event.summary}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default EventHero;
