"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { IconArrowUpRight } from "@tabler/icons-react";
import { LeadershipCardItem } from "@/lib/home/leadership";
import { TOKENS } from "@/lib/tokens";

interface LeadershipCardProps {
  card: LeadershipCardItem;
  index: number;
  totalCards: number;
}

const EASE_CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function LeadershipCard({
  card,
  index,
  totalCards,
}: LeadershipCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const reduceMotion = Boolean(prefersReduced);

  // Scroll tracking across this card's sticky range
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Stacking scale & fade for cards covered by the subsequent card
  const isLast = index === totalCards - 1;
  const stackScaleTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.96]
  );
  const stackOpacityTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.6]
  );

  // Parallax: translates image inside card -6% to 6%
  const imageParallaxTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["-6%", "6%"]
  );

  const cardScale = reduceMotion || isLast ? 1 : stackScaleTransform;
  const cardOpacity = reduceMotion || isLast ? 1 : stackOpacityTransform;
  const imageY = reduceMotion ? "0%" : imageParallaxTransform;

  // Formatted index: "01 / 04"
  const formattedIndex = `${card.index.padStart(2, "0")} / ${String(
    totalCards
  ).padStart(2, "0")}`;

  // Entrance variants
  const cardEntranceVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.2 : 0.8,
        ease: EASE_CUBIC,
      },
    },
  };

  const titleLineVariants: Variants = {
    hidden: {
      y: reduceMotion ? 0 : "100%",
    },
    visible: {
      y: 0,
      transition: {
        duration: reduceMotion ? 0.2 : 0.9,
        delay: reduceMotion ? 0 : 0.1,
        ease: EASE_CUBIC,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="sticky w-full"
      style={{
        top: `calc(clamp(72px, 10vh, 96px) + ${index * 24}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        variants={cardEntranceVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        style={{
          scale: cardScale,
          opacity: cardOpacity,
          borderRadius: TOKENS.radiusPortrait,
        }}
        className="group relative w-full h-[clamp(420px,78svh,820px)] max-md:h-[clamp(380px,72svh,560px)] min-h-[360px] overflow-hidden bg-neutral-950 text-white select-none shadow-none border-0"
      >
        <Link
          href={card.href}
          aria-label={`${card.title}, ${card.category}`}
          className="block w-full h-full relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#93c5fd] focus-visible:ring-offset-4 rounded-[inherit]"
        >
          {/* Full-bleed Oversized Image Container (enables -6% to 6% parallax) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div
              style={{ y: imageY }}
              className="absolute -top-[8%] left-0 w-full h-[116%] transition-transform duration-700 ease-out group-hover:scale-[1.04] [@media(hover:none)]:!transform-none"
            >
              {card.image ? (
                <Image
                  src={card.image}
                  alt={card.imageAlt || card.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1280px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/[0.08]" />
              )}
            </motion.div>
          </div>

          {/* Flat Scrim: Tuned at 40% neutral-950 for >= 4.5:1 text contrast */}
          <div
            className="absolute inset-0 bg-neutral-950/40 pointer-events-none"
            aria-hidden="true"
          />

          {/* Card Content Overlay */}
          <div className="relative z-10 w-full h-full p-[clamp(24px,4vw,56px)] flex flex-col justify-between">
            {/* Top Bar: Mono Index (Left) & Category (Right) */}
            <div className="flex items-center justify-between w-full">
              <span className="font-mono text-[13px] text-white/70 tracking-wider">
                {formattedIndex}
              </span>
              <span className="font-mono text-[13px] text-white/70 uppercase tracking-[0.14em]">
                {card.category}
              </span>
            </div>

            {/* Bottom: Title, Short Line & View Link Affordance */}
            <div className="flex flex-col items-start max-w-2xl transition-transform duration-300 ease-out group-hover:-translate-y-1.5 [@media(hover:none)]:!transform-none">
              {/* Title Mask Reveal */}
              <div className="overflow-hidden leading-[0.95]">
                <motion.h3
                  variants={titleLineVariants}
                  className="text-[clamp(2rem,5.5vw,5.5rem)] max-md:text-[clamp(2rem,9vw,3.25rem)] font-medium tracking-[-0.04em] leading-[0.95] text-white max-w-[14ch]"
                >
                  {card.title}
                </motion.h3>
              </div>

              {/* Single Short Line */}
              <p className="mt-3 text-[16px] max-md:text-[14px] leading-relaxed text-white/80 max-w-[60ch] line-clamp-1">
                {card.line}
              </p>

              {/* Text Link "View" Affordance */}
              <div className="mt-5 inline-flex items-center gap-1.5 text-[15px] text-white font-medium">
                <span className="relative">
                  View
                  <span
                    aria-hidden="true"
                    className="absolute left-0 -bottom-0.5 w-full h-[1px] bg-[#93c5fd] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </span>
                <IconArrowUpRight
                  size={17}
                  stroke={1.8}
                  className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export default LeadershipCard;
