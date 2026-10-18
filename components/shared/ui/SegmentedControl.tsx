"use client";

import React, { useRef } from "react";

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  tone?: "dark" | "light";
  className?: string;
  ariaLabel?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  tone = "dark",
  className = "",
  ariaLabel = "Filter options",
}: SegmentedControlProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextIndex = (index + 1) % options.length;
      e.preventDefault();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextIndex = (index - 1 + options.length) % options.length;
      e.preventDefault();
    }

    if (nextIndex !== index) {
      onChange(options[nextIndex].value);
      const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
      buttons?.[nextIndex]?.focus();
    }
  };

  const isDark = tone === "dark";

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-1 rounded-full p-1 border transition-colors ${
        isDark
          ? "bg-white/[0.04] border-white/10"
          : "bg-neutral-950/[0.04] border-neutral-950/10"
      } ${className}`}
    >
      {options.map((opt, i) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
              isSelected
                ? isDark
                  ? "bg-white text-neutral-950 shadow-sm"
                  : "bg-neutral-950 text-white shadow-sm"
                : isDark
                ? "text-white/65 hover:text-white hover:bg-white/[0.06]"
                : "text-neutral-950/65 hover:text-neutral-950 hover:bg-neutral-950/[0.06]"
            } focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isDark ? "focus-visible:outline-[#93c5fd]" : "focus-visible:outline-neutral-950"
            }`}
          >
            <span>{opt.label}</span>
            {typeof opt.count === "number" ? (
              <span
                className={`font-mono text-[11px] tabular-nums ${
                  isSelected
                    ? isDark
                      ? "text-neutral-950/60"
                      : "text-white/70"
                    : isDark
                    ? "text-white/40"
                    : "text-neutral-950/40"
                }`}
              >
                {opt.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
