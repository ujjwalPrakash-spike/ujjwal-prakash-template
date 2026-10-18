"use client";

import React, { useRef, useEffect } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import type { Surface } from "@/lib/tokens";

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  resultCount?: number;
  className?: string;
  placeholder?: string;
  label?: string;
  tone?: Surface;
  id?: string;
  ariaControls?: string;
}

export function SearchInput({
  value,
  onChange,
  resultCount,
  className = "",
  placeholder = "Search name, department or email",
  label = "Search name, department or email",
  tone = "dark",
  id = "directory-search",
  ariaControls = "directory-results",
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isDark = tone === "dark";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === inputRef.current) {
        onChange("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onChange]);

  return (
    <div className={`relative flex items-center ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <IconSearch
        size={16}
        className={`absolute left-3.5 pointer-events-none ${
          isDark ? "text-white/40" : "text-neutral-950/40"
        }`}
      />
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-controls={ariaControls}
        className={`h-11 w-full sm:w-72 pl-10 pr-9 rounded-full text-[13px] transition-all focus:outline-none focus:ring-1 ${
          isDark
            ? "bg-white/5 border border-white/15 text-white placeholder:text-white/40 focus:ring-[#93c5fd]"
            : "bg-neutral-950/5 border border-neutral-950/15 text-neutral-950 placeholder:text-neutral-950/40 focus:ring-neutral-950"
        }`}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className={`absolute right-3 ${
            isDark ? "text-white/50 hover:text-white" : "text-neutral-950/50 hover:text-neutral-950"
          }`}
        >
          <IconX size={14} />
        </button>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {resultCount !== undefined ? `${resultCount} results found` : ""}
      </span>
    </div>
  );
}
