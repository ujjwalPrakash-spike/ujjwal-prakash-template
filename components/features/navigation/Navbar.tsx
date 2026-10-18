"use client";

import * as React from "react";
import { LogoBadge } from "@/components/ui/LogoBadge";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_INSET } from "@/lib/tokens";
import { useScrolled } from "@/hooks/useScrolled";
import { FullscreenMenu } from "./FullscreenMenu";

export interface NavbarProps {
  tone?: "light" | "dark";
  variant?: "default" | "bar";
  stickyScrolled?: boolean;
  transparent?: boolean;
}

export function Navbar({
  tone = "dark",
  variant = "default",
  stickyScrolled = false,
  transparent = false,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const isBar = variant === "bar";
  const isScrolled = useScrolled(24, isBar);
  const shouldReduceMotion = useReducedMotion();
  const isDark = tone === "dark";

  // When variant === "bar" (the minimal bar for the template)
  if (isBar) {
    const isSolid = !transparent || isScrolled;

    return (
      <>
        <header
          className={`fixed top-0 left-0 right-0 w-full z-[110] transition-all ${
            isSolid
              ? "bg-neutral-950/95 backdrop-blur-md border-b border-white/10"
              : "bg-transparent border-b border-transparent"
          } ${isScrolled ? "h-14" : "h-16"}`}
          style={{
            transitionDuration: shouldReduceMotion ? "0ms" : "250ms",
          }}
        >
          <div
            className="flex items-center justify-between w-full max-w-[1920px] mx-auto h-full"
            style={{ paddingInline: NAV_INSET }}
          >
            {/* Left: The Brand */}
            <div className="flex items-center gap-2.5">
              <LogoBadge
                size={isScrolled ? "bar-scrolled" : "bar"}
                onClick={() => {
                  if (isMenuOpen) setIsMenuOpen(false);
                }}
              />
            </div>

            {/* Right: Hamburger / Close Trigger */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              className="group inline-flex items-center gap-3 min-h-[44px] min-w-[44px] px-2 py-2 rounded-full text-white hover:opacity-85 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2 transition-all cursor-pointer select-none"
            >
              <span className="hidden md:inline-block text-[13px] font-mono uppercase tracking-[0.12em] text-white/80 group-hover:text-white transition-colors">
                {isMenuOpen ? "Close" : "Menu"}
              </span>

              {/* 44x44 hit box holding the two 20px x 1.5px lines (6px apart) */}
              <div
                className="w-11 h-11 relative flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                <motion.span
                  initial={false}
                  animate={
                    isMenuOpen
                      ? { rotate: 45, y: 0 }
                      : { rotate: 0, y: -3.75 }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute w-[20px] h-[1.5px] bg-white rounded-full"
                />
                <motion.span
                  initial={false}
                  animate={
                    isMenuOpen
                      ? { rotate: -45, y: 0 }
                      : { rotate: 0, y: 3.75 }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute w-[20px] h-[1.5px] bg-white rounded-full"
                />
              </div>
            </button>
          </div>
        </header>

        {/* Fullscreen Overlay Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <FullscreenMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              triggerRef={menuButtonRef}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  // Default Variant (retained for homepage hero with same clean branding and fullscreen menu)
  return (
    <>
      <header
        className={`z-50 ${
          stickyScrolled
            ? "sticky top-2 z-50 mx-2 w-auto shrink-0 rounded-md border border-white/10 bg-neutral-950/85 px-4 py-2 backdrop-blur-xl sm:mx-3 sm:px-8 md:px-12"
            : `relative w-full ${isDark ? "" : "py-2 sm:py-3"}`
        }`}
      >
        <div
          className={`flex w-full items-center justify-between ${
            stickyScrolled || isDark ? "" : "px-4 sm:px-8 md:px-12"
          }`}
        >
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <LogoBadge size={isDark ? "hero" : "default"} />
          </div>

          {/* Right: Single Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            className="group inline-flex items-center gap-3 min-h-[44px] min-w-[44px] px-2 py-2 rounded-full text-white hover:opacity-85 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2 transition-all cursor-pointer select-none"
          >
            <span className="hidden md:inline-block text-[13px] font-mono uppercase tracking-[0.12em] text-white/80 group-hover:text-white transition-colors">
              {isMenuOpen ? "Close" : "Menu"}
            </span>
            <div
              className="w-11 h-11 relative flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            >
              <motion.span
                initial={false}
                animate={
                  isMenuOpen
                    ? { rotate: 45, y: 0 }
                    : { rotate: 0, y: -3.75 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute w-[20px] h-[1.5px] bg-white rounded-full"
              />
              <motion.span
                initial={false}
                animate={
                  isMenuOpen
                    ? { rotate: -45, y: 0 }
                    : { rotate: 0, y: 3.75 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute w-[20px] h-[1.5px] bg-white rounded-full"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <FullscreenMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            triggerRef={menuButtonRef}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
