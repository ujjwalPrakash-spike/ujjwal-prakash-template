// Light band news archive grouped by month with editorial rows, sticky headers, and infinite load.
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import { EmptyResults } from "@/components/directory/EmptyResults";
import type { MonthGroup, NewsPost } from "@/lib/news/types";
import { formatDate } from "@/lib/news/utils";
import { TOKENS, NAV_HEIGHT_SCROLLED } from "@/lib/tokens";

interface NewsArchiveProps {
  groups: MonthGroup[];
  totalFiltered: number;
  onClearFilters: () => void;
  isFiltered: boolean;
}

const PAGE_SIZE = 12;

export function NewsArchive({
  groups,
  totalFiltered,
  onClearFilters,
  isFiltered,
}: NewsArchiveProps) {
  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Flatten posts across groups up to visibleLimit
  let countSoFar = 0;
  const renderedGroups = groups
    .map((grp) => {
      if (countSoFar >= visibleLimit) return null;
      const available = visibleLimit - countSoFar;
      const sliced = grp.posts.slice(0, available);
      countSoFar += sliced.length;
      return {
        ...grp,
        posts: sliced,
      };
    })
    .filter((g): g is MonthGroup => g !== null && g.posts.length > 0);

  const hasMore = visibleLimit < totalFiltered;

  // Auto-load next batch with IntersectionObserver when entering view
  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleLimit((prev) => prev + PAGE_SIZE);
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  if (totalFiltered === 0) {
    return (
      <section
        id="news-archive-results"
        aria-label="Archive Results"
        style={{
          paddingLeft: TOKENS.paddingInline,
          paddingRight: TOKENS.paddingInline,
          paddingBlock: "clamp(64px, 10vh, 120px)",
        }}
        className="w-full bg-neutral-50 text-neutral-950"
      >
        <div className="w-full max-w-[1440px] mx-auto">
          <EmptyResults
            message="No field reports or dispatches matching your active filters."
            onClear={onClearFilters}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="news-archive-results"
      aria-label="News Archive"
      style={{
        paddingLeft: TOKENS.paddingInline,
        paddingRight: TOKENS.paddingInline,
        paddingBlock: "clamp(64px, 10vh, 120px)",
      }}
      className="relative w-full bg-neutral-50 text-neutral-950"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        {renderedGroups.map((group, groupIdx) => (
          <div
            key={group.monthKey}
            style={{
              contentVisibility: groupIdx > 0 ? "auto" : "visible",
            }}
            className="relative mb-16 last:mb-0"
          >
            {/* Sticky Month Heading (sticks below filter bar and nav) */}
            <div
              style={{
                top: `${NAV_HEIGHT_SCROLLED + 48}px`,
              }}
              className="sticky z-20 bg-neutral-50/95 backdrop-blur-sm py-4 border-b border-neutral-950/10 flex items-center justify-between select-none mb-4"
            >
              <h2 className="font-mono text-sm uppercase tracking-widest font-medium text-neutral-950">
                {group.monthLabel}
              </h2>
              <span className="font-mono text-xs text-neutral-950/45 tabular-nums">
                [{group.posts.length} {group.posts.length === 1 ? "entry" : "entries"}]
              </span>
            </div>

            {/* List of Rows */}
            <div className="divide-y divide-neutral-950/10">
              {group.posts.map((post) => (
                <NewsArchiveRow key={post.slug} post={post} />
              ))}
            </div>
          </div>
        ))}

        {/* Load More Trigger */}
        {hasMore && (
          <div ref={loadMoreRef} className="pt-12 text-center select-none">
            <button
              type="button"
              onClick={() => setVisibleLimit((prev) => prev + PAGE_SIZE)}
              className="font-mono text-xs uppercase tracking-wider text-neutral-950 underline underline-offset-4 decoration-neutral-950/30 hover:decoration-neutral-950 transition-colors p-3"
            >
              Show more stories ({totalFiltered - visibleLimit} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function NewsArchiveRow({ post }: { post: NewsPost }) {
  const dateStr = formatDate(post.date);

  return (
    <Link
      href={`/news/${post.slug}`}
      aria-label={`${post.title}, ${dateStr}`}
      className="group block relative w-full outline-none focus-visible:outline-2 focus-visible:outline-neutral-950 rounded-sm"
      style={{
        paddingBlock: "clamp(20px, 3vh, 32px)",
      }}
    >
      {/* Hover background fill across the row with negative margins */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 -inset-x-4 pointer-events-none transition-colors duration-200 group-hover:bg-neutral-950/[0.04] rounded-lg"
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
        {/* Cols 1-2: Date & Category */}
        <div className="md:col-span-2 flex md:flex-col justify-between md:justify-start gap-1">
          <span className="font-mono text-xs text-neutral-950/50 tabular-nums">
            {dateStr}
          </span>
          <span className="text-[12px] font-mono uppercase tracking-wider text-neutral-950/70">
            {post.category}
          </span>
        </div>

        {/* Cols 3-8: Title & Excerpt */}
        <div className="md:col-span-6 flex flex-col justify-center">
          <h3
            className="font-sans font-medium tracking-[-0.02em] leading-[1.15] text-neutral-950 transition-transform duration-300 ease-out group-hover:translate-x-2 line-clamp-3"
            style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)" }}
          >
            {post.title}
          </h3>
          <p className="hidden sm:block text-[15px] md:text-base text-neutral-950/65 line-clamp-2 mt-2 font-sans leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Cols 9-11: Thumbnail (aspect 3:2, token radius, tonal placeholder if no cover) */}
        <div className="md:col-span-3 flex justify-end md:justify-center">
          <div
            className="relative w-24 md:w-full aspect-[3/2] overflow-hidden bg-neutral-950/[0.06] shrink-0"
            style={{ borderRadius: TOKENS.radiusPortrait }}
          >
            {post.cover ? (
              <Image
                src={post.cover}
                alt={post.coverAlt || post.title}
                fill
                sizes="(max-width: 768px) 96px, 280px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            ) : (
              <div className="w-full h-full bg-neutral-950/[0.06]" />
            )}
          </div>
        </div>

        {/* Col 12: ArrowCircle (hidden on small mobile, visible on desktop) */}
        <div className="hidden md:flex md:col-span-1 justify-end">
          <ArrowCircle size={44} tone="light" direction="right" />
        </div>
      </div>
    </Link>
  );
}

export default NewsArchive;
