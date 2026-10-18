// Article body section with sticky table of contents scrollspy, copy link, and BlockRenderer.
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BlockRenderer } from "@/components/shared/ui/BlockRenderer";
import { slugify } from "@/lib/utils";
import type { NewsPost } from "@/lib/news/types";
import { TOKENS, NAV_HEIGHT_SCROLLED } from "@/lib/tokens";

interface ArticleBodyProps {
  post: NewsPost;
}

export function ArticleBody({ post }: ArticleBodyProps) {
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Extract h2 headings for scrollspy outline
  const headings = post.body
    .filter((b): b is { type: "h2"; content: string } => b.type === "h2")
    .map((h) => ({
      id: slugify(h.content),
      title: h.content,
    }));

  const showOutline = headings.length >= 3;

  // Scrollspy via IntersectionObserver
  useEffect(() => {
    if (!showOutline || headings.length === 0) return;

    const headingEls = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings, showOutline]);

  // Copy article link to clipboard
  const handleCopyLink = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <article
      aria-label="Article Body"
      style={{
        paddingLeft: TOKENS.paddingInline,
        paddingRight: TOKENS.paddingInline,
        paddingBlock: "clamp(64px, 10vh, 120px)",
      }}
      className="relative w-full bg-neutral-50 text-neutral-950"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (cols 1-3): Sticky Outline + Copy Link */}
          <aside className="hidden lg:block lg:col-span-3">
            <div
              style={{
                top: `${NAV_HEIGHT_SCROLLED + 32}px`,
              }}
              className="sticky flex flex-col gap-8 select-none"
            >
              {showOutline && (
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-950/45 block mb-4">
                    On this page
                  </span>
                  <nav aria-label="Table of contents" className="flex flex-col gap-2.5">
                    {headings.map((h) => {
                      const isActive = activeHeadingId === h.id;
                      return (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          className={`relative text-[13px] leading-snug pl-3 font-sans transition-colors outline-none focus-visible:outline-2 focus-visible:outline-neutral-950 rounded-sm ${
                            isActive
                              ? "text-neutral-950 font-medium"
                              : "text-neutral-950/55 hover:text-neutral-950"
                          }`}
                        >
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="absolute left-0 top-1 bottom-1 w-[1px] bg-neutral-950"
                            />
                          )}
                          {h.title}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              )}

              {/* Copy Link Button with aria-live confirmation */}
              <div className="pt-4 border-t border-neutral-950/10">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="font-mono text-xs uppercase tracking-wider text-neutral-950/70 hover:text-neutral-950 underline underline-offset-4 decoration-neutral-950/20 hover:decoration-neutral-950 transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-neutral-950 rounded-sm"
                >
                  {copied ? "Link Copied to Clipboard" : "Copy Article Link"}
                </button>
                <span className="sr-only" aria-live="polite">
                  {copied ? "Article URL copied to clipboard" : ""}
                </span>
              </div>
            </div>
          </aside>

          {/* Main Column (cols 4-10): BlockRenderer + Tags */}
          <div className="lg:col-span-8 lg:col-start-4 max-w-[62ch]">
            <BlockRenderer blocks={post.body} tone="light" />

            {/* Tags Row */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 pt-8 border-t border-neutral-950/10">
                <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-950/45 block mb-3">
                  Filed Under
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/news?tag=${encodeURIComponent(tag)}`}
                      className="font-mono text-xs text-neutral-950/75 hover:text-neutral-950 bg-neutral-950/[0.05] hover:bg-neutral-950/[0.1] px-3 py-1 rounded-sm transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ArticleBody;
