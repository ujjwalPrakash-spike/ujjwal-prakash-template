// Sticky gallery filter bar with year segmented control, plain text series toggles, and URL sync.
"use client";

import React, { useEffect } from "react";
import { useScrolled } from "@/hooks/useScrolled";
import { SegmentedControl, type SegmentOption } from "@/components/shared/ui/SegmentedControl";
import { NAV_INSET } from "@/lib/tokens";
import type { YearOption, SeriesOption } from "@/lib/gallery/utils";

interface GalleryFilterBarProps {
  years: YearOption[];
  seriesList: SeriesOption[];
  selectedYear: string;
  selectedSeries: string;
  onYearChange: (year: string) => void;
  onSeriesChange: (series: string) => void;
  filteredCount: number;
}

export function GalleryFilterBar({
  years,
  seriesList,
  selectedYear,
  selectedSeries,
  onYearChange,
  onSeriesChange,
  filteredCount,
}: GalleryFilterBarProps) {
  const isScrolled = useScrolled(24);

  // Sync filters to URL via history.replaceState without full reload
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);

    if (selectedYear && selectedYear !== "all") {
      url.searchParams.set("year", selectedYear);
    } else {
      url.searchParams.delete("year");
    }

    if (selectedSeries && selectedSeries !== "all") {
      url.searchParams.set("series", selectedSeries);
    } else {
      url.searchParams.delete("series");
    }

    window.history.replaceState(null, "", url.toString());
  }, [selectedYear, selectedSeries]);

  const yearOptions: SegmentOption<string>[] = [
    { value: "all", label: "All" },
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
        {/* Left: Year Segmented Control + Series Plain Text Chips */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full md:w-auto">
          {/* Year Segmented Control */}
          <SegmentedControl
            options={yearOptions}
            value={selectedYear}
            onChange={onYearChange}
            tone="dark"
            ariaLabel="Filter by year"
          />

          {/* Series Plain Text Toggles (no pills: selected = white with 1px #93c5fd underline, others white/55) */}
          <div role="tablist" aria-label="Filter by series" className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              role="tab"
              aria-selected={selectedSeries === "all"}
              onClick={() => onSeriesChange("all")}
              className={`relative py-1 text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-sm ${
                selectedSeries === "all" ? "text-white font-medium" : "text-white/55 hover:text-white"
              }`}
            >
              <span>All Series</span>
              {selectedSeries === "all" && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#93c5fd]" />
              )}
            </button>

            {seriesList.map((s) => {
              const isSelected = selectedSeries === s.series;
              return (
                <button
                  key={s.series}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSeriesChange(s.series)}
                  className={`relative py-1 text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded-sm ${
                    isSelected ? "text-white font-medium" : "text-white/55 hover:text-white"
                  }`}
                >
                  <span>{s.series}</span>
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#93c5fd]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Results Count with aria-live="polite" */}
        <div className="shrink-0 self-end md:self-auto">
          <div aria-live="polite" className="font-mono text-xs uppercase tracking-wider text-white/50">
            <span className="text-white tabular-nums">{filteredCount}</span>{" "}
            {filteredCount === 1 ? "Exhibition" : "Exhibitions"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryFilterBar;
