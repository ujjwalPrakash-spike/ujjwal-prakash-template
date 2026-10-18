"use client";

import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  duration?: number;
  pauseOnHover?: boolean;
  className?: string;
  maskEdge?: boolean;
}

export function Marquee({
  children,
  direction = "left",
  duration = 60,
  pauseOnHover = true,
  className = "",
  maskEdge = true,
}: MarqueeProps) {
  const animClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  const pauseClass = pauseOnHover
    ? "hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
    : "";

  const maskStyle: React.CSSProperties = maskEdge
    ? {
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }
    : {};

  return (
    <div className={`relative overflow-hidden ${className}`} style={maskStyle}>
      <div
        className={`flex w-max shrink-0 items-center ${animClass} ${pauseClass}`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true" tabIndex={-1}>
          {children}
        </div>
      </div>
    </div>
  );
}
