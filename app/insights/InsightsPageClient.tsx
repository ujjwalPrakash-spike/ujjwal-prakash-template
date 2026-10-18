"use client";

import React, { useState } from "react";
import { Insight, InsightType } from "@/lib/insights/types";
import {
  InsightsHero,
  InsightsFilterBar,
  InsightsDirectory,
} from "@/components/features/insights";

interface InsightsPageClientProps {
  insights: Insight[];
  totalInsights: number;
  totalPlacements: number;
  totalInternships: number;
  totalCompanies: number;
}

export function InsightsPageClient({
  insights,
  totalInsights,
  totalPlacements,
  totalInternships,
  totalCompanies,
}: InsightsPageClientProps) {
  const [query, setQuery] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("q") || "";
  });
  const [selectedType, setSelectedType] = useState<"all" | InsightType>(() => {
    if (typeof window === "undefined") return "all";
    const t = new URLSearchParams(window.location.search).get("type");
    if (t === "placement" || t === "internship") return t;
    return "all";
  });
  const [filteredCount, setFilteredCount] = useState(totalInsights);

  return (
    <>
      <InsightsHero
        totalInsights={totalInsights}
        totalPlacements={totalPlacements}
        totalInternships={totalInternships}
        totalCompanies={totalCompanies}
      />
      <InsightsFilterBar
        query={query}
        onQueryChange={setQuery}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        totalCount={totalInsights}
        filteredCount={filteredCount}
        placementCount={totalPlacements}
        internshipCount={totalInternships}
      />
      <InsightsDirectory
        insights={insights}
        query={query}
        onQueryChange={setQuery}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        onFilteredCountChange={setFilteredCount}
      />
    </>
  );
}
