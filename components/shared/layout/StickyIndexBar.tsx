"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { TOKENS } from "@/lib/tokens";

export interface IndexBarItem {
  id: string;
  label: string;
  href?: string;
  isExternalLink?: boolean;
}

interface StickyIndexBarProps {
  items: readonly IndexBarItem[] | IndexBarItem[];
  trailing?: React.ReactNode;
}

export function StickyIndexBar({ items, trailing }: StickyIndexBarProps) {
  const onPageItems = items.filter((it) => !it.isExternalLink && !it.href?.startsWith("/"));
  const [activeId, setActiveId] = useState<string>(onPageItems[0]?.id || "");
  const shouldReduceMotion = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (onPageItems.length === 0) return;
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = onPageItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(onPageItems[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(onPageItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, onPageItems]);

  useEffect(() => {
    const activeEl = itemRefs.current[activeId];
    if (activeEl && navRef.current) {
      const navContainer = navRef.current;
      const elLeft = activeEl.offsetLeft;
      const elWidth = activeEl.offsetWidth;
      const navWidth = navContainer.offsetWidth;
      navContainer.scrollTo({
        left: elLeft - navWidth / 2 + elWidth / 2,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
  }, [activeId, shouldReduceMotion]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -120;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
      top: y,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
    window.history.pushState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <aside
      aria-label="Section chapters and search"
      className="sticky top-[var(--nav-h)] z-40 w-full bg-neutral-950 border-b border-white/10"
    >
      <div
        className="mx-auto max-w-[1440px]"
        style={{ paddingInline: TOKENS.paddingInline }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-3">
          <nav
            ref={navRef}
            className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((sec, idx) => {
              const isExternal = Boolean(sec.isExternalLink || sec.href?.startsWith("/"));
              const isActive = !isExternal && activeId === sec.id;

              if (isExternal && sec.href) {
                return (
                  <Link
                    key={sec.id}
                    ref={(el) => {
                      itemRefs.current[sec.id] = el;
                    }}
                    href={sec.href}
                    className="relative shrink-0 text-[13px] py-1 text-white/50 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="font-mono text-white/40 mr-1.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{sec.label}</span>
                    <IconArrowUpRight size={13} className="text-white/40" />
                  </Link>
                );
              }

              return (
                <a
                  key={sec.id}
                  ref={(el) => {
                    itemRefs.current[sec.id] = el;
                  }}
                  href={`#${sec.id}`}
                  onClick={(e) => scrollToSection(e, sec.id)}
                  className={`relative shrink-0 text-[13px] py-1 transition-colors focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-4 rounded ${
                    isActive ? "text-white font-medium" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <span className="font-mono text-white/40 mr-1.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>{sec.label}</span>
                  {isActive ? (
                    <motion.div
                      layoutId="activeSubnavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#93c5fd]"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.3, ease: TOKENS.ease }
                      }
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>
          {trailing ? <div className="shrink-0">{trailing}</div> : null}
        </div>
      </div>
    </aside>
  );
}
