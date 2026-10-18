"use client";

import React, { useMemo } from "react";
import { Section } from "@/components/shared/layout/Section";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { SearchInput } from "@/components/shared/ui/SearchInput";
import { Accordion, type AccordionItem } from "@/components/shared/ui/Accordion";
import { RichText } from "@/components/shared/ui/RichText";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import { DirectoryProvider, useDirectory } from "@/components/directory/DirectoryProvider";
import { EmptyResults } from "@/components/directory/EmptyResults";
import { COMPANY_FAQS, type CompanyFaqItem } from "@/lib/companies/data";

function FaqContent() {
  const { query, setQuery, filteredItems, resultCount, isSearching } =
    useDirectory<CompanyFaqItem>();

  const accordionItems: AccordionItem[] = useMemo(() => {
    return filteredItems.map((faq) => ({
      id: faq.id,
      title: faq.question,
      content: (
        <div className="space-y-4">
          <p className="whitespace-pre-line text-pretty">
            <RichText segments={faq.answerSegments} />
          </p>

          {faq.links && faq.links.length > 0 ? (
            <div className="pt-2 flex flex-col gap-2">
              {faq.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-neutral-950 underline decoration-neutral-950/30 hover:decoration-neutral-950 transition-colors w-fit group"
                >
                  <span>{link.label}</span>
                  <div className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <ArrowCircle />
                  </div>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      ),
    }));
  }, [filteredItems]);

  // When searching, first matching item is open, others collapsed.
  // When not searching, first item (faq-1) is open by default.
  const defaultOpenId = filteredItems[0]?.id || "";

  return (
    <Section id="faqs" surface="light" aria-labelledby="chapter-faqs">
      <div className="w-full">
        <ChapterHeader
          id="chapter-faqs"
          index="08"
          title="FAQs"
          count={`${COMPANY_FAQS.length} QUESTIONS`}
          tone="light"
        />

        {/* Search header with SearchInput and live result count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-neutral-950/10">
          <SearchInput
            value={query}
            onChange={setQuery}
            resultCount={resultCount}
            placeholder="Search questions"
            label="Search questions"
            tone="light"
            id="faq-search"
            ariaControls="faq-results"
            className="w-full sm:w-auto"
          />

          <div
            className="font-mono text-[13px] text-neutral-950/60 tabular-nums shrink-0"
            aria-live="polite"
          >
            {isSearching ? (
              <span>
                {resultCount} {resultCount === 1 ? "match" : "matches"} found
              </span>
            ) : (
              <span>{COMPANY_FAQS.length} questions available</span>
            )}
          </div>
        </div>

        {/* Accordion or Empty State */}
        <div id="faq-results">
          {isSearching && filteredItems.length === 0 ? (
            <EmptyResults
              message={`No questions matching "${query}"`}
              onClear={() => setQuery("")}
            />
          ) : (
            <Accordion
              items={accordionItems}
              defaultOpenId={defaultOpenId}
            />
          )}
        </div>
      </div>
    </Section>
  );
}

export function FaqSection() {
  const getSearchText = (faq: CompanyFaqItem) => {
    const answerText = faq.answerSegments
      .map((seg) => (typeof seg === "string" ? seg : seg.text))
      .join(" ");
    return `${faq.question} ${answerText}`;
  };

  return (
    <DirectoryProvider items={COMPANY_FAQS} getSearchText={getSearchText}>
      <FaqContent />
    </DirectoryProvider>
  );
}
