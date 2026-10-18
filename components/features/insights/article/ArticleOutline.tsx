"use client";

import React, { useEffect, useState } from "react";
interface HeadingItem {
  id: string;
  title: string;
}

interface ArticleOutlineProps {
  headings: HeadingItem[];
}

export function ArticleOutline({ headings }: ArticleOutlineProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="On this page outline"
      className="hidden lg:block sticky top-[96px] z-10 space-y-3 pr-6 self-start max-w-[260px]"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-950/45 mb-3">
        On this page
      </p>
      <ul className="space-y-1 text-[13px] border-l border-neutral-950/10">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block py-1 pl-3 text-left transition-colors -ml-[1px] ${
                  isActive
                    ? "border-l-2 border-neutral-950 font-medium text-neutral-950"
                    : "border-l-2 border-transparent text-neutral-950/55 hover:text-neutral-950"
                }`}
              >
                {h.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
