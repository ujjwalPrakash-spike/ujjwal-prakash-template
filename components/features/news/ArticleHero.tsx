// Article hero component with back link, monumental title, metadata row, and full-bleed cover reveal.
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { IconArrowLeft } from "@tabler/icons-react";
import type { NewsPost } from "@/lib/news/types";
import { formatDate, computeReadTime } from "@/lib/news/utils";
import { TOKENS } from "@/lib/tokens";

interface ArticleHeroProps {
  post: NewsPost;
}

export function ArticleHero({ post }: ArticleHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const dateStr = formatDate(post.date);
  const readTime = computeReadTime(post.body);

  return (
    <header
      aria-label="Article Header"
      style={{
        paddingLeft: TOKENS.paddingInline,
        paddingRight: TOKENS.paddingInline,
      }}
      className="relative w-full min-h-[70svh] bg-neutral-950 text-white flex flex-col justify-between pt-24 pb-12 select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto flex flex-col justify-between flex-1">
        {/* Back Link to /news */}
        <div className="mb-12">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-[13px] font-mono text-white/70 hover:text-white transition-colors outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-sm py-1"
          >
            <IconArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1 text-[#93c5fd]"
            />
            <span className="relative">
              News & Dispatches
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#93c5fd] transition-all duration-300 group-hover:w-full" />
            </span>
          </Link>
        </div>

        {/* Hero Bottom-Anchored Content */}
        <div className="flex flex-col justify-end">
          {/* Category Eyebrow */}
          <span className="text-[13px] font-mono uppercase tracking-[0.14em] text-white/50 mb-4 block">
            {post.category} {"//"} DISPATCH
          </span>

          {/* Monumental Article Title */}
          <h1
            className="font-sans font-medium tracking-[-0.045em] leading-[0.95] text-white mb-8 lg:max-w-[16ch]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
          >
            {post.title}
          </h1>

          {/* Metadata Row separated by 1px white/15 verticals */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/10 font-mono text-xs text-white/60">
            <span className="tabular-nums text-white/75">{dateStr}</span>
            <span className="w-[1px] h-3.5 bg-white/15" />
            <span className="tabular-nums">{readTime} MIN READ</span>
            {post.author && (
              <>
                <span className="w-[1px] h-3.5 bg-white/15" />
                <span className="text-white/80">DISPATCH BY {post.author.toUpperCase()}</span>
              </>
            )}
          </div>
        </div>

        {/* Full-width Cover Reveal (Aspect 21/9) */}
        {post.cover && (
          <motion.div
            initial={{
              opacity: shouldReduceMotion ? 1 : 0,
              clipPath: shouldReduceMotion ? "none" : "inset(12% 0% 12% 0%)",
              scale: shouldReduceMotion ? 1 : 1.08,
            }}
            animate={{
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
            }}
            transition={{
              duration: 1.1,
              delay: 0.2,
              ease: TOKENS.ease,
            }}
            style={{ borderRadius: TOKENS.radiusImage }}
            className="relative w-full aspect-[21/9] mt-12 overflow-hidden bg-white/[0.05]"
          >
            <Image
              src={post.cover}
              alt={post.coverAlt || post.title}
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover"
            />
          </motion.div>
        )}
      </div>
    </header>
  );
}

export default ArticleHero;
