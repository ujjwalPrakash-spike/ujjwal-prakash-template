// Signature 2-column offset editorial layout with scroll-linked parallax and image-led cards.
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { IconArrowUpRight } from "@tabler/icons-react";
import { EmptyResults } from "@/components/directory/EmptyResults";
import { TOKENS } from "@/lib/tokens";
import { formatGalleryDate } from "@/lib/gallery/utils";
import type { GalleryEvent } from "@/lib/gallery/types";

interface GalleryEventsProps {
  events: GalleryEvent[];
  onClearFilters?: () => void;
}

function EventCard({ event, index }: { event: GalleryEvent; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();

  // Subtle scroll parallax: -4% to 4%
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  // Alternate aspect ratio: 4/5 default, 4/3 on every 3rd item
  const isAltAspect = (index + 1) % 3 === 0;
  const aspectClass = isAltAspect ? "lg:aspect-[4/3]" : "lg:aspect-[4/5]";

  const formattedDate = formatGalleryDate(event.date);
  const photoCountLabel = `${event.photos.length} photos`;

  return (
    <Link
      ref={cardRef}
      href={`/gallery/${event.slug}`}
      aria-label={`${event.title}, ${formattedDate}, ${photoCountLabel}`}
      className="group flex flex-col w-full text-white outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-8 rounded-lg cursor-pointer"
    >
      {/* Cover Image Frame */}
      <div
        style={{ borderRadius: TOKENS.radiusPortrait }}
        className={`relative w-full aspect-[4/3] ${aspectClass} overflow-hidden bg-white/[0.05]`}
      >
        <motion.div
          style={{ y: reduceMotion ? 0 : parallaxY }}
          className="relative w-full h-[110%] -top-[5%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        >
          {event.cover ? (
            <Image
              src={event.cover}
              alt={event.coverAlt}
              fill
              priority={index < 2}
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-white/[0.08]" />
          )}
        </motion.div>

        {/* Hover View Label with Arrow (bottom-left, fades in on pointer hover only) */}
        <div className="hidden lg:flex absolute bottom-5 left-5 items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md text-xs font-mono uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span>View</span>
          <IconArrowUpRight size={14} className="text-[#93c5fd]" />
        </div>
      </div>

      {/* Meta Block Below Image */}
      <div className="mt-4 sm:mt-5 flex flex-col gap-2">
        {/* Row 1: Title (shifts right 8px on hover, max 2 lines) */}
        <h3
          className="font-sans font-medium tracking-[-0.03em] leading-[1.1] text-white transition-transform duration-300 group-hover:translate-x-2"
          style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)" }}
        >
          {event.title}
        </h3>

        {/* Row 2: Date + Location (left), Photo count (right) */}
        <div className="flex items-center justify-between text-[13px] font-mono text-white/55">
          <span>
            {formattedDate} · {event.location}
          </span>
          <span className="tabular-nums shrink-0">{photoCountLabel}</span>
        </div>
      </div>
    </Link>
  );
}

export function GalleryEvents({ events, onClearFilters }: GalleryEventsProps) {
  if (events.length === 0) {
    return (
      <div className="py-24 max-w-xl mx-auto px-6">
        <EmptyResults
          message="No exhibitions match your selected filter criteria."
          onClear={onClearFilters}
        />
      </div>
    );
  }

  // Split into 2 columns for >=1024px offset layout
  const col1 = events.filter((_, idx) => idx % 2 === 0);
  const col2 = events.filter((_, idx) => idx % 2 === 1);

  return (
    <section
      aria-label="Exhibitions and Spatial Events"
      style={{
        paddingLeft: TOKENS.paddingInline,
        paddingRight: TOKENS.paddingInline,
      }}
      className="w-full max-w-[1440px] mx-auto py-16 sm:py-24 lg:py-32"
    >
      {/* Mobile / Tablet: Single Column List (<1024px) */}
      <div className="flex flex-col gap-12 sm:gap-16 lg:hidden">
        {events.map((event, idx) => (
          <EventCard key={event.slug} event={event} index={idx} />
        ))}
      </div>

      {/* Desktop: 2-Column Offset Editorial Layout (>=1024px, Column 2 offset down by 14vh) */}
      <div className="hidden lg:grid grid-cols-2 gap-16 xl:gap-24 items-start">
        {/* Column 1 */}
        <div className="flex flex-col gap-24">
          {col1.map((event, idx) => (
            <EventCard key={event.slug} event={event} index={idx * 2} />
          ))}
        </div>

        {/* Column 2 (Offset down by 14vh) */}
        <div className="flex flex-col gap-24 pt-[14vh]">
          {col2.map((event, idx) => (
            <EventCard key={event.slug} event={event} index={idx * 2 + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GalleryEvents;
