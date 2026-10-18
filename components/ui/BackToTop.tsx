"use client";

import { useReducedMotion } from "framer-motion";

export function BackToTop() {
  const shouldReduceMotion = useReducedMotion();

  function handleClick() {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "instant" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-[13px] text-white/50 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-4 rounded cursor-pointer"
      aria-label="Back to top"
    >
      Back to top ↑
    </button>
  );
}
