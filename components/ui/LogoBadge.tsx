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
      className={`inline-flex items-center bg-transparent p-0 hover:opacity-85 transition-opacity group ${className}`}
      aria-label="Ujjwal Prakash"
    >
      <span
        className={`font-mono font-bold tracking-[0.16em] uppercase text-white whitespace-nowrap ${
          isHero ? "text-base tracking-[0.2em]" : isCompact ? "text-xs" : "text-sm"
        }`}
      >
        UJJWAL PRAKASH
      </span>
    </Link>
  );
}

export default LogoBadge;
