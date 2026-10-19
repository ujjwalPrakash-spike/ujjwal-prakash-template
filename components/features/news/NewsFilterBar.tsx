// Streamlined sticky news filter bar with category tabs, search input, and dynamic navbar offset.
"use client";

import React, { useEffect } from "react";
import { useScrolled } from "@/hooks/useScrolled";
import { SearchInput } from "@/components/shared/ui/SearchInput";
import { NAV_INSET } from "@/lib/tokens";
import type { NewsCategoryCount, NewsYearCount } from "@/lib/news/types";

interface NewsFilterBarProps {
  categories: NewsCategoryCount[];
  years?: NewsYearCount[];
  selectedCategory: string;
  selectedYear?: string;
  searchQuery: string;
  selectedTag: string;
  onCategoryChange: (category: string) => void;
  onYearChange?: (year: string) => void;
  onSearchChange: (query: string) => void;
  onTagClear: () => void;
  filteredCount: number;
}

export function NewsFilterBar({
  categories,
  selectedCategory,
  searchQuery,
  selectedTag,
  onCategoryChange,
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
  }, [selectedCategory, searchQuery, selectedTag]);

  return (
    <div
      style={{
        top: isScrolled ? 56 : 64,
        paddingInline: NAV_INSET,
      }}
      className="sticky z-40 w-full bg-neutral-950/98 backdrop-blur-md border-b border-white/10 py-2.5 sm:py-3 transition-[top] duration-250 select-none"
    >
      <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Left: Category Plain Text Toggles */}
        <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto overflow-x-auto no-scrollbar py-0.5">
          <div role="tablist" aria-label="Filter by category" className="flex items-center gap-3 sm:gap-5 shrink-0">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "all"}
              onClick={() => onCategoryChange("all")}
              className={`relative py-1 text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-sm whitespace-nowrap ${
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
                  className={`relative py-1 text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-sm whitespace-nowrap ${
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

          {/* Active Tag indicator if filtered by tag */}
          {selectedTag && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 rounded-full font-mono text-xs text-white shrink-0">
              <span>#{selectedTag}</span>
              <button
                type="button"
                onClick={onTagClear}
                aria-label="Remove tag filter"
                className="text-white/60 hover:text-white text-xs cursor-pointer ml-1"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Right: SearchInput */}
        <div className="w-full md:w-56 lg:w-64 shrink-0">
          <SearchInput
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search stories & dispatches..."
            label="Search stories"
            tone="dark"
            id="news-search"
            ariaControls="news-archive-results"
            resultCount={filteredCount}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default NewsFilterBar;
