"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { StickyIndexBar, IndexBarItem } from "@/components/shared/layout/StickyIndexBar";
import { SearchInput } from "@/components/shared/ui/SearchInput";
import { EmptyResults } from "@/components/directory/EmptyResults";
import {
  StudentsHero,
  StudentsProcedure,
  StudentsResources,
  RoadmapsFocusList,
  StudentsFaqs,
  StudentsClosing,
} from "@/components/features/students";
import {
  STUDENT_PROCEDURE_STEPS,
  STUDENT_RESOURCES,
  STUDENT_ROADMAPS,
  STUDENT_FAQS,
  StudentResource,
  StudentRoadmap,
  StudentFaq,
} from "@/lib/students/data";
import { TickerCompany } from "@/components/features/students/StudentsTicker";
import { IconSearch } from "@tabler/icons-react";
import { TOKENS } from "@/lib/tokens";

interface StudentsPageClientProps {
  totalInsights: number;
  topCompanies: TickerCompany[];
}

export function StudentsPageClient({
  totalInsights,
  topCompanies,
}: StudentsPageClientProps) {
  const [query, setQuery] = useState("");

  const indexBarItems: IndexBarItem[] = [
    {
      id: "insights-link",
      label: "Insights",
      href: "/insights",
      isExternalLink: true,
    },
    {
      id: "steps",
      label: "Procedure",
    },
    {
      id: "resources",
      label: "Resources",
    },
    {
      id: "prepRoadmaps",
      label: "Preparation Roadmaps",
    },
    {
      id: "faqs",
      label: "FAQs",
    },
  ];

  // Live filter Resources, Roadmaps, and FAQs
  const q = query.toLowerCase().trim();

  const filteredResources = useMemo(() => {
    if (!q) return STUDENT_RESOURCES;
    return STUDENT_RESOURCES.filter(
      (r: StudentResource) =>
        r.name.toLowerCase().includes(q) || r.group.toLowerCase().includes(q)
    );
  }, [q]);

  const filteredRoadmaps = useMemo(() => {
    if (!q) return STUDENT_ROADMAPS;
    return STUDENT_ROADMAPS.filter(
      (r: StudentRoadmap) =>
        r.name.toLowerCase().includes(q) || r.group.toLowerCase().includes(q)
    );
  }, [q]);

  const filteredFaqs = useMemo(() => {
    if (!q) return STUDENT_FAQS;
    return STUDENT_FAQS.filter(
      (f: StudentFaq) =>
        f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [q]);

  const totalResults =
    filteredResources.length + filteredRoadmaps.length + filteredFaqs.length;
  const isSearching = Boolean(q);
  const hasNoResults =
    isSearching &&
    filteredResources.length === 0 &&
    filteredRoadmaps.length === 0 &&
    filteredFaqs.length === 0;

  return (
    <>
      <StudentsHero
        totalInsights={totalInsights}
        totalSteps={STUDENT_PROCEDURE_STEPS.length}
        totalResources={STUDENT_RESOURCES.length}
        totalRoadmaps={STUDENT_ROADMAPS.length}
        totalFaqs={STUDENT_FAQS.length}
        topCompanies={topCompanies}
      />

      <StickyIndexBar
        items={indexBarItems}
        trailing={
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-full md:w-64">
              <SearchInput
                value={query}
                onChange={setQuery}
                placeholder="Search resources, roadmaps, FAQs"
                tone="dark"
                ariaControls="students-search-results"
              />
            </div>
            {isSearching && (
              <span
                aria-live="polite"
                className="font-mono text-xs text-white/50 tabular-nums shrink-0"
              >
                {totalResults} {totalResults === 1 ? "match" : "matches"}
              </span>
            )}
          </div>
        }
      />

      {/* When searching, display handoff link to insights */}
      {isSearching && (
        <div
          id="students-search-results"
          className="bg-neutral-900 border-b border-white/10 py-4"
          style={{ paddingInline: TOKENS.paddingInline }}
        >
          <div className="mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-[1440px]">
            <p className="text-sm text-white/70">
              Filtering resources, preparation guides, and resume FAQs for{" "}
              <strong className="text-white font-medium">&quot;{query}&quot;</strong>
            </p>
            <Link
              href={`/insights?q=${encodeURIComponent(query)}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#93c5fd] hover:underline"
            >
              <IconSearch size={14} />
              <span>Search &quot;{query}&quot; in SPO Insights →</span>
            </Link>
          </div>
        </div>
      )}

      {hasNoResults ? (
        <div className="bg-neutral-50 py-24">
          <EmptyResults query={query} onClear={() => setQuery("")} />
        </div>
      ) : (
        <>
          <StudentsProcedure steps={STUDENT_PROCEDURE_STEPS} />

          {filteredResources.length > 0 && (
            <StudentsResources resources={filteredResources} />
          )}

          {filteredRoadmaps.length > 0 && (
            <RoadmapsFocusList roadmaps={filteredRoadmaps} />
          )}

          {filteredFaqs.length > 0 && <StudentsFaqs faqs={filteredFaqs} />}
        </>
      )}

      <StudentsClosing totalInsights={totalInsights} />
    </>
  );
}
