// Dark continue reading section with previous/next navigation and related dispatches.
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import type { NewsPost } from "@/lib/news/types";
import { formatDate } from "@/lib/news/utils";
import { TOKENS } from "@/lib/tokens";

interface ContinueStoriesProps {
  previous: NewsPost | null;
  next: NewsPost | null;
  related: NewsPost[];
}

export function ContinueStories({ previous, next, related }: ContinueStoriesProps) {
  return (
    <section
      aria-label="Continue Reading"
      style={{
        paddingLeft: TOKENS.paddingInline,
        paddingRight: TOKENS.paddingInline,
        paddingBlock: "clamp(80px, 12vh, 160px)",
      }}
      className="relative w-full bg-neutral-950 text-white select-none border-t border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Previous & Next Link Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 border-t border-b border-white/10 mb-20">
          {/* Previous Article */}
          <div className="py-8 md:py-12 md:pr-8">
            {previous ? (
              <Link
                href={`/news/${previous.slug}`}
                className="group flex flex-col justify-between h-full outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                    Previous Dispatch
                  </span>
                  <ArrowCircle size={40} tone="dark" direction="left" />
                </div>
                <h3
                  className="font-sans font-medium tracking-tight text-white transition-transform duration-300 group-hover:translate-x-2 line-clamp-2"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)" }}
                >
                  {previous.title}
                </h3>
              </Link>
            ) : (
              <div className="flex flex-col justify-between h-full opacity-40">
                <span className="font-mono text-xs uppercase tracking-widest text-white/50 mb-4">
                  Previous Dispatch
                </span>
                <span className="font-sans text-xl text-white/40">End of Archive</span>
              </div>
            )}
          </div>

          {/* Next Article */}
          <div className="py-8 md:py-12 md:pl-8">
            {next ? (
              <Link
                href={`/news/${next.slug}`}
                className="group flex flex-col justify-between h-full outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-white/50">
                    Next Dispatch
                  </span>
                  <ArrowCircle size={40} tone="dark" direction="right" />
                </div>
                <h3
                  className="font-sans font-medium tracking-tight text-white transition-transform duration-300 group-hover:translate-x-2 line-clamp-2"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.75rem)" }}
                >
                  {next.title}
                </h3>
              </Link>
            ) : (
              <div className="flex flex-col justify-between h-full opacity-40">
                <span className="font-mono text-xs uppercase tracking-widest text-white/50 mb-4">
                  Next Dispatch
                </span>
                <span className="font-sans text-xl text-white/40">Latest Dispatch</span>
              </div>
            )}
          </div>
        </div>

        {/* Related Stories (Archive-style rows, Dark variant) */}
        {related.length > 0 && (
          <div className="mb-20">
            <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-white/50 mb-6">
              RELATED FIELD REPORTS
            </p>
            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {related.map((post) => {
                const dateStr = formatDate(post.date);
                return (
                  <Link
                    key={post.slug}
                    href={`/news/${post.slug}`}
                    aria-label={`${post.title}, ${dateStr}`}
                    className="group block relative w-full py-6 outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-sm"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
                      <div className="md:col-span-2 flex md:flex-col justify-between md:justify-start gap-1">
                        <span className="font-mono text-xs text-white/50 tabular-nums">
                          {dateStr}
                        </span>
                        <span className="text-[12px] font-mono uppercase tracking-wider text-white/70">
                          {post.category}
                        </span>
                      </div>

                      <div className="md:col-span-6 flex flex-col justify-center">
                        <h4
                          className="font-sans font-medium tracking-[-0.02em] leading-[1.15] text-white transition-transform duration-300 ease-out group-hover:translate-x-2 line-clamp-2"
                          style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                        >
                          {post.title}
                        </h4>
                      </div>

                      <div className="md:col-span-3 flex justify-end md:justify-center">
                        <div
                          className="relative w-20 md:w-36 aspect-[3/2] overflow-hidden bg-white/[0.05] shrink-0"
                          style={{ borderRadius: TOKENS.radiusPortrait }}
                        >
                          {post.cover ? (
                            <Image
                              src={post.cover}
                              alt={post.coverAlt || post.title}
                              fill
                              sizes="150px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-white/[0.05]" />
                          )}
                        </div>
                      </div>

                      <div className="hidden md:flex md:col-span-1 justify-end">
                        <ArrowCircle size={40} tone="dark" direction="right" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* All News Link Row */}
        <div>
          <Link
            href="/news"
            className="group flex items-center justify-between py-8 outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-sm border-b border-white/10 hover:border-white/20 transition-colors"
          >
            <span
              className="font-sans font-medium tracking-tight text-white transition-transform duration-300 group-hover:translate-x-3"
              style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.75rem)" }}
            >
              All News & Dispatches
            </span>
            <ArrowCircle size={56} tone="dark" direction="right" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ContinueStories;
