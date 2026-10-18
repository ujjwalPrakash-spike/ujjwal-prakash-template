// Sticky filter bar with category segmented control, search, sort, and URL sync.
"use client";

import React from "react";
import { SearchInput } from "@/components/shared/ui/SearchInput";
import { TOKENS } from "@/lib/tokens";

export type CategoryFilter = "all" | "apparel" | "gear" | "limited";
export type SortOption = "featured" | "price-asc" | "price-desc";

interface CategoryCount {
  id: CategoryFilter;
  label: string;
  count: number;
}

interface MerchFilterBarProps {
  categories: CategoryCount[];
  activeCategory: CategoryFilter;
  onCategoryChange: (cat: CategoryFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}

export function MerchFilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  activeSort,
  onSortChange,
  resultCount,
}: MerchFilterBarProps) {
  return (
    <aside
      aria-label="Catalogue filters and search"
      className="sticky top-[var(--nav-h)] z-40 w-full bg-neutral-950 border-b border-white/10"
    >
      <div
        className="mx-auto max-w-[1440px]"
        style={{ paddingInline: TOKENS.paddingInline }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-3">
          {/* Category Segmented Navigation */}
          <nav
            aria-label="Filter categories"
            className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-1 text-[13px]"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onCategoryChange(cat.id)}
                  className={`relative shrink-0 px-3 py-1.5 rounded transition-all select-none flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#93c5fd] cursor-pointer ${
                    isActive
                      ? "bg-white/10 text-white font-medium"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="font-mono text-[11px] text-white/40">
                    ({cat.count})
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-2 h-[1px] bg-[#93c5fd]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Sort, Search, and Live Result Count */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Sort Select */}
            <select
              value={activeSort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sort objects"
              className="h-11 px-3 bg-white/5 border border-white/15 rounded-full text-[13px] font-mono text-white/80 outline-none focus:ring-1 focus:ring-[#93c5fd] cursor-pointer"
            >
              <option value="featured" className="bg-neutral-900 text-white">Sort: Featured</option>
              <option value="price-asc" className="bg-neutral-900 text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-neutral-900 text-white">Price: High to Low</option>
            </select>

            {/* Search Input */}
            <SearchInput
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search products or specs..."
              label="Search products"
              tone="dark"
              resultCount={resultCount}
              className="w-full sm:w-64"
            />

            {/* Live Count */}
            <span
              aria-live="polite"
              className="font-mono text-xs text-white/40 tracking-wider shrink-0 hidden sm:inline-block"
            >
              [{resultCount} {resultCount === 1 ? "Object" : "Objects"}]
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default MerchFilterBar;
