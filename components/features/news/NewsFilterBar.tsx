// Sticky news filter bar with category toggles, year segmented control, SearchInput, and URL state sync.
"use client";

import React, { useEffect } from "react";
import { useScrolled } from "@/hooks/useScrolled";
import { SegmentedControl, type SegmentOption } from "@/components/shared/ui/SegmentedControl";
import { SearchInput } from "@/components/shared/ui/SearchInput";
import { NAV_INSET } from "@/lib/tokens";
import type { NewsCategoryCount, NewsYearCount } from "@/lib/news/types";

interface NewsFilterBarProps {
  categories: NewsCategoryCount[];
  years: NewsYearCount[];
  selectedCategory: string;
  selectedYear: string;
  searchQuery: string;
  selectedTag: string;
  onCategoryChange: (category: string) => void;
  onYearChange: (year: string) => void;
  onSearchChange: (query: string) => void;
  onTagClear: () => void;
  filteredCount: number;
}

export function NewsFilterBar({
  categories,
  years,
  selectedCategory,
  selectedYear,
  searchQuery,
  selectedTag,
  onCategoryChange,
  onYearChange,
  onSearchChange,
  onTagClear,
  filteredCount,
}: NewsFilterBarProps) {
  const isScrolled = useScrolled(24);

  // Sync state to URL via history.replaceState
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);

    if (selectedCategory && selectedCategory !== "all") {
      url.searchParams.set("category", selectedCategory);
    } else {
      url.searchParams.delete("category");
    }

    if (selectedYear && selectedYear !== "all") {
      url.searchParams.set("year", selectedYear);
    } else {
      url.searchParams.delete("year");
    }

    if (searchQuery.trim()) {
      url.searchParams.set("q", searchQuery.trim());
    } else {
      url.searchParams.delete("q");
    }

    if (selectedTag) {
      url.searchParams.set("tag", selectedTag);
    } else {
      url.searchParams.delete("tag");
    }

    window.history.replaceState(null, "", url.toString());
  }, [selectedCategory, selectedYear, searchQuery, selectedTag]);

  const yearOptions: SegmentOption<string>[] = [
    { value: "all", label: "All Years" },
    ...years.map((y) => ({ value: y.year, label: y.year, count: y.count })),
  ];

  return (
    <div
      style={{
        top: isScrolled ? 56 : 64,
        paddingInline: NAV_INSET,
      }}
      className="sticky z-40 w-full bg-neutral-950/98 backdrop-blur-md border-b border-white/10 py-3 transition-[top] duration-250 select-none"
    >
      <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left: Category Plain Text Toggles + Year Segmented Control */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full md:w-auto">
          {/* Category Plain Text Toggles (no pills: selected = white with 1px #93c5fd underline, others white/55) */}
          <div role="tablist" aria-label="Filter by category" className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "all"}
              onClick={() => onCategoryChange("all")}
              className={`relative py-1 text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-sm ${
                selectedCategory === "all" ? "text-white font-medium" : "text-white/55 hover:text-white"
              }`}
            >
              <span>All Stories</span>
              {selectedCategory === "all" && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#93c5fd]" />
              )}
            </button>

            {categories.map((c) => {
              const isSelected = selectedCategory.toLowerCase() === c.name.toLowerCase();
              return (
                <button
                  key={c.name}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onCategoryChange(c.name)}
                  className={`relative py-1 text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-sm ${
                    isSelected ? "text-white font-medium" : "text-white/55 hover:text-white"
                  }`}
                >
                  <span>
                    {c.name} <span className="text-white/40 tabular-nums">({c.count})</span>
                  </span>
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#93c5fd]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Year Segmented Control */}
          <SegmentedControl
            options={yearOptions}
            value={selectedYear}
            onChange={onYearChange}
            tone="dark"
            ariaLabel="Filter by publication year"
          />

          {/* Active Tag indicator if filtered by tag */}
          {selectedTag && (
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/10 rounded-full font-mono text-xs text-white">
              <span>Tag: #{selectedTag}</span>
              <button
                type="button"
                onClick={onTagClear}
                aria-label="Remove tag filter"
                className="text-white/60 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Right: SearchInput + Result Count */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <SearchInput
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search stories & transcripts..."
            label="Search stories & transcripts"
            tone="dark"
            id="news-search"
            ariaControls="news-archive-results"
            className="w-full sm:w-64"
          />

          <div
            aria-live="polite"
            className="shrink-0 font-mono text-xs uppercase tracking-wider text-white/50 whitespace-nowrap"
          >
            <span className="text-white tabular-nums">{filteredCount}</span>{" "}
            {filteredCount === 1 ? "Story" : "Stories"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsFilterBar;
