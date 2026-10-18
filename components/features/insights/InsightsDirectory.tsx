"use client";

import React, { useState, useMemo, useEffect, useTransition } from "react";
import { Insight, InsightType } from "@/lib/insights/types";
import { InsightRow } from "./InsightRow";
import { EmptyResults } from "@/components/directory/EmptyResults";
import { TOKENS } from "@/lib/tokens";
import { IconChevronDown, IconX, IconFilter } from "@tabler/icons-react";

interface InsightsDirectoryProps {
  insights: Insight[];
  query: string;
  onQueryChange: (q: string) => void;
  selectedType: "all" | InsightType;
  onTypeChange: (type: "all" | InsightType) => void;
  onFilteredCountChange?: (count: number) => void;
}

type SortOption = "newest" | "company" | "name";

export function InsightsDirectory({
  insights,
  query,
  onQueryChange,
  selectedType,
  onTypeChange,
  onFilteredCountChange,
}: InsightsDirectoryProps) {
  const [, startTransition] = useTransition();

  // State from URL or defaults via lazy initializers
  const [selectedYear, setSelectedYear] = useState<string>(() => {
    if (typeof window === "undefined") return "all";
    return new URLSearchParams(window.location.search).get("year") || "all";
  });
  const [selectedCompany, setSelectedCompany] = useState<string>(() => {
    if (typeof window === "undefined") return "all";
    return new URLSearchParams(window.location.search).get("company") || "all";
  });
  const [sortOption, setSortOption] = useState<SortOption>(() => {
    if (typeof window === "undefined") return "newest";
    const sort = new URLSearchParams(window.location.search).get("sort");
    if (sort === "newest" || sort === "company" || sort === "name") return sort;
    return "newest";
  });
  const [companySearch, setCompanySearch] = useState<string>("");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync state to URL via history.replaceState
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selectedType !== "all") params.set("type", selectedType);
    if (selectedYear !== "all") params.set("year", selectedYear);
    if (selectedCompany !== "all") params.set("company", selectedCompany);
    if (sortOption !== "newest") params.set("sort", sortOption);

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState(null, "", newUrl);
  }, [query, selectedType, selectedYear, selectedCompany, sortOption]);

  // Derived Year list with counts
  const availableYears = useMemo(() => {
    const counts = new Map<string, number>();
    insights.forEach((it) => {
      counts.set(it.year, (counts.get(it.year) || 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => b.year.localeCompare(a.year));
  }, [insights]);

  // Derived Company list with counts (sorted desc by count then A-Z)
  const availableCompanies = useMemo(() => {
    const counts = new Map<string, number>();
    insights.forEach((it) => {
      if (!it.company) return;
      counts.set(it.company, (counts.get(it.company) || 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([company, count]) => ({ company, count }))
      .sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.company.localeCompare(b.company);
      });
  }, [insights]);

  // Filtered company list in left rail
  const filteredCompanyList = useMemo(() => {
    if (!companySearch.trim()) return availableCompanies;
    const q = companySearch.toLowerCase().trim();
    return availableCompanies.filter((c) => c.company.toLowerCase().includes(q));
  }, [availableCompanies, companySearch]);

  // Main Filtered Insights
  const filteredInsights = useMemo(() => {
    const q = query.toLowerCase().trim();
    return insights.filter((it) => {
      // Type filter
      if (selectedType !== "all" && it.type !== selectedType) return false;
      // Year filter
      if (selectedYear !== "all" && it.year !== selectedYear) return false;
      // Company filter
      if (
        selectedCompany !== "all" &&
        it.company.toLowerCase() !== selectedCompany.toLowerCase()
      ) {
        return false;
      }
      // Query filter
      if (q) {
        const text = `${it.name} ${it.company} ${it.role} ${it.year}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [insights, query, selectedType, selectedYear, selectedCompany]);

  // Notify parent of filtered count
  useEffect(() => {
    onFilteredCountChange?.(filteredInsights.length);
  }, [filteredInsights.length, onFilteredCountChange]);

  // Sorted & Grouped Results
  const groupedResults = useMemo(() => {
    const sorted = [...filteredInsights];
    if (sortOption === "company") {
      sorted.sort((a, b) => a.company.localeCompare(b.company));
    } else if (sortOption === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Group by Year and Type, preserving timeline order:
    // "2025-26 Internship", "2025-26 Placement", "2024-25 Placement", "2023-24 Placement", "2023-24 Internship"
    const groupOrder = [
      "2025-26 Internship",
      "2025-26 Placement",
      "2024-25 Placement",
      "2023-24 Placement",
      "2023-24 Internship",
    ];

    const groupMap = new Map<string, Insight[]>();
    sorted.forEach((it) => {
      const typeLabel = it.type === "internship" ? "Internship" : "Placement";
      const key = `${it.year} ${typeLabel}`;
      if (!groupMap.has(key)) groupMap.set(key, []);
      groupMap.get(key)!.push(it);
    });

    const groups: { title: string; items: Insight[] }[] = [];
    groupOrder.forEach((key) => {
      if (groupMap.has(key)) {
        groups.push({ title: `${key} Insights`, items: groupMap.get(key)! });
        groupMap.delete(key);
      }
    });

    // Any remaining
    Array.from(groupMap.entries()).forEach(([key, items]) => {
      groups.push({ title: `${key} Insights`, items });
    });

    return groups;
  }, [filteredInsights, sortOption]);

  const hasActiveFilters =
    query.trim() !== "" ||
    selectedType !== "all" ||
    selectedYear !== "all" ||
    selectedCompany !== "all" ||
    sortOption !== "newest";

  const clearAllFilters = () => {
    startTransition(() => {
      onQueryChange("");
      onTypeChange("all");
      setSelectedYear("all");
      setSelectedCompany("all");
      setSortOption("newest");
      setCompanySearch("");
    });
  };

  return (
    <section
      id="insights-directory-results"
      aria-label="Insights Directory"
      className="bg-neutral-50 text-neutral-950 py-12 md:py-16"
      style={{ paddingInline: TOKENS.paddingInline }}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Mobile Filter Disclosure (<1024px) */}
        <div className="lg:hidden mb-8">
          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-neutral-950/10 bg-white p-4 font-medium text-sm text-neutral-950 shadow-sm"
          >
            <span className="flex items-center gap-2">
              <IconFilter size={18} />
              <span>Filters & Years</span>
              {hasActiveFilters && (
                <span className="h-2 w-2 rounded-full bg-neutral-950" />
              )}
            </span>
            <IconChevronDown
              size={18}
              className={`transition-transform duration-200 ${
                isMobileFiltersOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isMobileFiltersOpen && (
            <div className="mt-3 rounded-xl border border-neutral-950/10 bg-white p-5 space-y-6">
              {/* Year Chips */}
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-950/50 font-medium mb-3">
                  Year
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedYear("all")}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedYear === "all"
                        ? "bg-neutral-950 text-white"
                        : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                    }`}
                  >
                    All Years
                  </button>
                  {availableYears.map((y) => (
                    <button
                      key={y.year}
                      type="button"
                      onClick={() => setSelectedYear(y.year)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        selectedYear === y.year
                          ? "bg-neutral-950 text-white"
                          : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                      }`}
                    >
                      <span>{y.year}</span>
                      <span className="font-mono text-[11px] opacity-60">
                        {y.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Company Select */}
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-950/50 font-medium mb-3">
                  Company
                </p>
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="w-full rounded-lg border border-neutral-950/15 bg-white px-3 py-2 text-sm text-neutral-950 focus:outline-neutral-950"
                >
                  <option value="all">All Companies</option>
                  {availableCompanies.map((c) => (
                    <option key={c.company} value={c.company}>
                      {c.company} ({c.count})
                    </option>
                  ))}
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="w-full rounded-lg border border-neutral-950/15 py-2 text-center text-xs font-medium text-neutral-950 hover:bg-neutral-100 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* 12-Column Grid (Desktop & Tablet) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Rail (Cols 1-3, Desktop >=1024px) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-[136px] z-10 space-y-8 pr-4">
            {/* Year List */}
            <div>
              <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-neutral-950/50 mb-3">
                Year
              </h3>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedYear("all")}
                  className={`flex w-full items-center justify-between py-2 text-sm transition-colors text-left ${
                    selectedYear === "all"
                      ? "font-medium text-neutral-950 pl-3 border-l-2 border-neutral-950"
                      : "text-neutral-950/65 hover:text-neutral-950 pl-3 border-l-2 border-transparent"
                  }`}
                >
                  <span>All years</span>
                  <span className="font-mono text-xs tabular-nums text-neutral-950/45">
                    {insights.length}
                  </span>
                </button>

                {availableYears.map((y) => (
                  <button
                    key={y.year}
                    type="button"
                    onClick={() => setSelectedYear(y.year)}
                    className={`flex w-full items-center justify-between py-2 text-sm transition-colors text-left ${
                      selectedYear === y.year
                        ? "font-medium text-neutral-950 pl-3 border-l-2 border-neutral-950"
                        : "text-neutral-950/65 hover:text-neutral-950 pl-3 border-l-2 border-transparent"
                    }`}
                  >
                    <span>{y.year}</span>
                    <span className="font-mono text-xs tabular-nums text-neutral-950/45">
                      {y.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Company List with Mini Search */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-neutral-950/50">
                  Company
                </h3>
                {selectedCompany !== "all" && (
                  <button
                    type="button"
                    onClick={() => setSelectedCompany("all")}
                    className="text-xs text-neutral-950/55 hover:text-neutral-950 underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              <input
                type="text"
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
                placeholder="Filter companies..."
                aria-label="Filter companies list"
                className="w-full rounded-md border border-neutral-950/15 bg-white px-2.5 py-1.5 text-xs text-neutral-950 placeholder:text-neutral-950/40 focus:outline-neutral-950 mb-2"
              />

              <div className="max-h-[360px] overflow-y-auto space-y-0.5 pr-2 [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.25)_transparent]">
                <button
                  type="button"
                  onClick={() => setSelectedCompany("all")}
                  className={`flex w-full items-center justify-between py-1.5 text-xs transition-colors text-left ${
                    selectedCompany === "all"
                      ? "font-medium text-neutral-950 pl-2.5 border-l-2 border-neutral-950"
                      : "text-neutral-950/65 hover:text-neutral-950 pl-2.5 border-l-2 border-transparent"
                  }`}
                >
                  <span className="truncate pr-2">All companies</span>
                  <span className="font-mono text-[11px] tabular-nums text-neutral-950/45 shrink-0">
                    {insights.length}
                  </span>
                </button>

                {filteredCompanyList.map((c) => (
                  <button
                    key={c.company}
                    type="button"
                    onClick={() => setSelectedCompany(c.company)}
                    className={`flex w-full items-center justify-between py-1.5 text-xs transition-colors text-left ${
                      selectedCompany === c.company
                        ? "font-medium text-neutral-950 pl-2.5 border-l-2 border-neutral-950"
                        : "text-neutral-950/65 hover:text-neutral-950 pl-2.5 border-l-2 border-transparent"
                    }`}
                  >
                    <span className="truncate pr-2" title={c.company}>
                      {c.company}
                    </span>
                    <span className="font-mono text-[11px] tabular-nums text-neutral-950/45 shrink-0">
                      {c.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear All Filters */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex items-center gap-1.5 text-xs font-medium text-neutral-950 hover:underline pt-2"
              >
                <IconX size={14} />
                <span>Clear all filters</span>
              </button>
            )}
          </aside>

          {/* Main Results (Cols 4-12) */}
          <main className="lg:col-span-9 space-y-12">
            {/* Active Filters Summary & Sort Select */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-950/10">
              <div className="flex flex-wrap items-center gap-2">
                {hasActiveFilters ? (
                  <>
                    <span className="text-xs text-neutral-950/50">Active filters:</span>
                    {query.trim() && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-neutral-950/10 px-2.5 py-1 text-xs text-neutral-950">
                        &quot;{query.trim()}&quot;
                        <button
                          type="button"
                          onClick={() => onQueryChange("")}
                          aria-label="Remove search filter"
                        >
                          <IconX size={12} />
                        </button>
                      </span>
                    )}
                    {selectedType !== "all" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-neutral-950/10 px-2.5 py-1 text-xs text-neutral-950 capitalize">
                        {selectedType}
                        <button
                          type="button"
                          onClick={() => onTypeChange("all")}
                          aria-label="Remove type filter"
                        >
                          <IconX size={12} />
                        </button>
                      </span>
                    )}
                    {selectedYear !== "all" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-neutral-950/10 px-2.5 py-1 text-xs text-neutral-950">
                        {selectedYear}
                        <button
                          type="button"
                          onClick={() => setSelectedYear("all")}
                          aria-label="Remove year filter"
                        >
                          <IconX size={12} />
                        </button>
                      </span>
                    )}
                    {selectedCompany !== "all" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-neutral-950/10 px-2.5 py-1 text-xs text-neutral-950">
                        {selectedCompany}
                        <button
                          type="button"
                          onClick={() => setSelectedCompany("all")}
                          aria-label="Remove company filter"
                        >
                          <IconX size={12} />
                        </button>
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-xs text-neutral-950/50">
                    Showing all available interview & preparation insights
                  </span>
                )}
              </div>

              {/* Sort Select */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <label htmlFor="insights-sort" className="text-xs text-neutral-950/55">
                  Sort:
                </label>
                <select
                  id="insights-sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="rounded-md border border-neutral-950/15 bg-white px-2.5 py-1 text-xs text-neutral-950 focus:outline-neutral-950 font-medium"
                >
                  <option value="newest">Newest year</option>
                  <option value="company">Company A–Z</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredInsights.length === 0 ? (
              <EmptyResults
                query={query || selectedCompany !== "all" ? `${query} ${selectedCompany}` : ""}
                onClear={clearAllFilters}
              />
            ) : (
              /* Grouped Results */
              <div className="space-y-12">
                {groupedResults.map((group) => (
                  <div
                    key={group.title}
                    style={{
                      contentVisibility: "auto",
                      containIntrinsicSize: "0 500px",
                    }}
                  >
                    {/* Sticky Group Header */}
                    <div className="sticky top-[118px] z-20 flex items-center justify-between border-b border-neutral-950/15 bg-neutral-50/95 py-3 backdrop-blur-sm">
                      <h2 className="text-base font-medium tracking-tight text-neutral-950">
                        {group.title}
                      </h2>
                      <span className="font-mono text-xs tabular-nums text-neutral-950/50">
                        {group.items.length}{" "}
                        {group.items.length === 1 ? "entry" : "entries"}
                      </span>
                    </div>

                    {/* Group Rows */}
                    <div className="divide-y divide-neutral-950/10">
                      {group.items.map((item) => (
                        <InsightRow
                          key={item.kind === "article" ? item.slug : item.id}
                          insight={item}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
