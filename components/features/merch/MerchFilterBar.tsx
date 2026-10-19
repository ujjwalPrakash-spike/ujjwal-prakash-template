// Streamlined sticky filter bar with category tabs, search, and dynamic navbar offset.
"use client";

import React from "react";
import { useScrolled } from "@/hooks/useScrolled";
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
  const isScrolled = useScrolled(24);

  return (
    <aside
      aria-label="Catalogue filters and search"
      style={{
        top: isScrolled ? 56 : 64,
        paddingInline: TOKENS.paddingInline,
      }}
      className="sticky z-40 w-full bg-neutral-950/95 backdrop-blur-md border-b border-white/10 transition-[top] duration-250 select-none py-2.5 sm:py-3"
    >
      <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Category Navigation Tabs */}
        <nav
          aria-label="Filter categories"
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 text-[13px]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`relative shrink-0 px-3 py-1.5 rounded transition-all select-none flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#93c5fd] cursor-pointer whitespace-nowrap ${
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

        {/* Right Controls: Sort & Search */}
        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
          {/* Sort Select */}
          <select
            value={activeSort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            aria-label="Sort objects"
            className="h-10 px-3 bg-white/5 border border-white/15 rounded-full text-[12px] font-mono text-white/80 outline-none focus:ring-1 focus:ring-[#93c5fd] cursor-pointer shrink-0"
          >
            <option value="featured" className="bg-neutral-900 text-white">Sort: Featured</option>
            <option value="price-asc" className="bg-neutral-900 text-white">Price: Low to High</option>
            <option value="price-desc" className="bg-neutral-900 text-white">Price: High to Low</option>
          </select>

          {/* Search Input */}
          <div className="flex-1 md:w-56 lg:w-64">
            <SearchInput
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search products or specs..."
              label="Search products"
              tone="dark"
              resultCount={resultCount}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default MerchFilterBar;
