// Restrained image slot component with next/image, hover transition, and tonal placeholder fallback.
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TOKENS } from "@/lib/tokens";

export interface ImageSlotProps {
  src?: string;
  hoverSrc?: string;
  alt?: string;
  aspectRatio?: "4:5" | "1:1" | "16:9" | "3:4" | "full";
  roleLabel?: string;
  priority?: boolean;
  className?: string;
  tone?: "dark" | "light";
  sizes?: string;
}

const ratioStyles: Record<string, string> = {
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square",
  "16:9": "aspect-video",
  "3:4": "aspect-[3/4]",
  full: "w-full h-full min-h-[360px]",
};

export function ImageSlot({
  src,
  hoverSrc,
  alt = "Catalogue asset slot",
  aspectRatio = "4:5",
  roleLabel = "Product",
  priority = false,
  className = "",
  tone = "dark",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px",
}: ImageSlotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const activeSrc = isHovered && hoverSrc ? hoverSrc : src;
  const isDark = tone === "dark";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ borderRadius: TOKENS.radiusPortrait }}
      className={`relative w-full overflow-hidden select-none transition-colors ${
        isDark ? "bg-white/[0.06] border border-white/10" : "bg-neutral-950/[0.06] border border-neutral-950/10"
      } ${ratioStyles[aspectRatio] || "aspect-[4/5]"} ${className}`.trim()}
    >
      {activeSrc ? (
        <Image
          src={activeSrc}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <div
            className={`text-[11px] font-mono uppercase tracking-widest ${
              isDark ? "text-white/40" : "text-neutral-950/40"
            }`}
          >
            [{roleLabel} {"//"} {aspectRatio}]
          </div>
          <div
            className={`mt-1 text-[9px] font-mono tracking-wider ${
              isDark ? "text-white/25" : "text-neutral-950/25"
            }`}
          >
            ASSET SLOT READY
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageSlot;
