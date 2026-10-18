"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if window.scrollY exceeds the given threshold in pixels.
 * Uses passive scroll listener and handles SSR safely.
 */
export function useScrolled(threshold: number = 24, enabled: boolean = true): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, enabled]);

  return isScrolled;
}
