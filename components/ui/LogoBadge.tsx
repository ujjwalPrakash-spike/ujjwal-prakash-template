"use client";

import Link from "next/link";

interface LogoBadgeProps {
  className?: string;
  onClick?: () => void;
  imageClassName?: string;
  size?: "default" | "hero" | "footer" | "bar" | "bar-scrolled";
}

export function LogoBadge({
  className = "",
  onClick,
  size = "default",
}: LogoBadgeProps) {
  const isHero = size === "hero";
  const isCompact = size === "bar-scrolled" || size === "footer";

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 bg-transparent p-0 hover:opacity-85 transition-opacity group ${className}`}
      aria-label="Apex Atelier Home"
    >
      {/* Geometric Apex Monogram */}
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono font-black transition-transform group-hover:scale-105 ${
          isHero
            ? "w-11 h-11 text-lg"
            : isCompact
            ? "w-7 h-7 text-xs"
            : "w-8 h-8 text-sm"
        }`}
      >
        <span>▲</span>
      </div>

      {/* Brutalist Brand Wordmark */}
      <div className="flex flex-col text-left leading-none">
        <span
          className={`font-mono font-bold tracking-[0.16em] uppercase text-white ${
            isHero ? "text-base tracking-[0.2em]" : isCompact ? "text-xs" : "text-sm"
          }`}
        >
          APEX<span className="text-[#93c5fd]">.</span>WORKS
        </span>
      </div>
    </Link>
  );
}

export default LogoBadge;
