import React from "react";
import {
  IconArrowUpRight,
  IconArrowRight,
  IconArrowLeft,
  IconArrowDownRight,
} from "@tabler/icons-react";

interface ArrowCircleProps {
  size?: number;
  tone?: "dark" | "light";
  direction?: "right" | "up-right" | "left" | "down-right";
  className?: string;
}

export function ArrowCircle({
  size = 44,
  tone = "light",
  direction = "up-right",
  className = "",
}: ArrowCircleProps) {
  const isDark = tone === "dark";

  let Icon = IconArrowUpRight;
  if (direction === "right") Icon = IconArrowRight;
  else if (direction === "left") Icon = IconArrowLeft;
  else if (direction === "down-right") Icon = IconArrowDownRight;

  const iconSize = Math.round(size * 0.45);

  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`rounded-full flex items-center justify-center transition-all duration-300 ${
        isDark
          ? "border border-white/15 text-white group-hover:bg-white group-hover:text-neutral-950 group-hover:border-white"
          : "border border-neutral-950/15 text-neutral-950 group-hover:bg-neutral-950 group-hover:text-white group-hover:border-neutral-950"
      } ${className}`}
    >
      <Icon size={iconSize} />
    </div>
  );
}
