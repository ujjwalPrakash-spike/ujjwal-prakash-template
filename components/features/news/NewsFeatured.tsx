// Featured hero story block on /news with scroll-linked parallax cover and editorial metadata.
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import type { NewsPost } from "@/lib/news/types";
import { formatDate, computeReadTime } from "@/lib/news/utils";
import { TOKENS } from "@/lib/tokens";

interface NewsFeaturedProps {
  post: NewsPost;
}

export function NewsFeatured({ post }: NewsFeaturedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["-4%", "4%"]
  );

  const readTime = computeReadTime(post.body);
  const dateStr = formatDate(post.date);

  return (
    <section
      ref={containerRef}
      aria-label="Featured News Story"
      style={{
        paddingLeft: TOKENS.paddingInline,
        paddingRight: TOKENS.paddingInline,
        paddingBlock: "clamp(48px, 8vh, 96px)",
      }}
      className="relative w-full bg-neutral-950 text-white select-none overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <Link
          href={`/news/${post.slug}`}
          aria-label={`Featured: ${post.title}, ${dateStr}`}
          className="group block outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Cols 1-8: Cover Aspect-[16/10] with Parallax & Hover Scale */}
            <div
              className="lg:col-span-8 relative w-full aspect-[16/10] overflow-hidden bg-white/[0.05]"
              style={{ borderRadius: TOKENS.radiusImage }}
            >
              {post.cover ? (
                <div className="relative w-full h-[110%] -top-[5%] overflow-hidden">
                  <motion.div style={{ y: translateY }} className="relative w-full h-full">
                    <Image
                      src={post.cover}
                      alt={post.coverAlt || post.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 920px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </motion.div>
                </div>
              ) : (
                <div className="w-full h-full bg-white/[0.06] flex items-center justify-center font-mono text-xs text-white/40 uppercase tracking-widest">
                  [FEATURED ASSET // ARCHIVE READY]
                </div>
              )}
            </div>

            {/* Cols 9-12: Editorial Text Block */}
            <div className="lg:col-span-4 flex flex-col justify-end">
              <span className="text-[13px] font-mono uppercase tracking-[0.12em] text-white/60 mb-3 block">
                {post.category} · FEATURED STORY
              </span>

              <h2
                className="font-sans font-medium tracking-[-0.03em] leading-[1.05] text-white mb-4 group-hover:text-white transition-colors"
                style={{ fontSize: "clamp(2rem, 3.6vw, 3.5rem)" }}
              >
                {post.title}
              </h2>

              <p className="text-white/75 text-base leading-relaxed line-clamp-3 mb-6 font-sans">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-3 font-mono text-xs text-white/50 mb-6">
                <span>{dateStr}</span>
                <span>/</span>
                <span>{readTime} MIN READ</span>
              </div>

              {/* Read Story Link with animated underline */}
              <div className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-white">
                <span className="relative">
                  Read story
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#93c5fd] transition-all duration-300 group-hover:w-full" />
                </span>
                <IconArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1.5 text-[#93c5fd]"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default NewsFeatured;
