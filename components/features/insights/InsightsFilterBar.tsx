"use client";

import React from "react";
import { SearchInput } from "@/components/shared/ui/SearchInput";
import { SegmentedControl } from "@/components/shared/ui/SegmentedControl";
import { InsightType } from "@/lib/insights/types";
import { TOKENS } from "@/lib/tokens";

interface InsightsFilterBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedType: "all" | InsightType;
  onTypeChange: (type: "all" | InsightType) => void;
  totalCount: number;
  filteredCount: number;
  placementCount: number;
  internshipCount: number;
}

export function InsightsFilterBar({
  query,
  onQueryChange,
  selectedType,
  onTypeChange,
  totalCount,
  filteredCount,
  placementCount,
  internshipCount,
}: InsightsFilterBarProps) {
  const typeOptions: { value: "all" | InsightType; label: string; count: number }[] = [
    { value: "all", label: "All", count: totalCount },
    { value: "placement", label: "Placement", count: placementCount },
    { value: "internship", label: "Internship", count: internshipCount },
  ];

  return (
    <aside
      aria-label="Insights filters and search"
      className="sticky top-[var(--nav-h)] z-40 w-full bg-neutral-950 border-b border-white/10"
    >
      <div
        className="mx-auto flex w-full max-w-[1440px] flex-col md:flex-row items-center justify-between gap-4 py-3.5"
        style={{ paddingInline: TOKENS.paddingInline }}
      >
        {/* Search Input */}
        <div className="w-full md:w-80 lg:w-96">
          <SearchInput
            value={query}
            onChange={onQueryChange}
            placeholder="Search name, company, role"
            tone="dark"
            ariaControls="insights-directory-results"
          />
        </div>

        {/* Segmented Control & Live Count */}
        <div className="flex w-full md:w-auto items-center justify-between md:justify-end gap-4">
          <SegmentedControl
            options={typeOptions}
            value={selectedType}
            onChange={onTypeChange}
            tone="dark"
            ariaLabel="Filter insights by type"
          />

          {/* Result Count (Polite Live Region) */}
          <div
            aria-live="polite"
            className="font-mono text-xs text-white/50 tabular-nums shrink-0"
          >
            {filteredCount} {filteredCount === 1 ? "result" : "results"}
          </div>
        </div>
      </div>
    </aside>
  );
}
