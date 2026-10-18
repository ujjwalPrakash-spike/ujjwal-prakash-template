"use client";

import React from "react";
import Link from "next/link";
import { Insight } from "@/lib/insights/types";
import { InsightRow } from "../InsightRow";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import { TOKENS } from "@/lib/tokens";

type ArticleEntry = Extract<Insight, { kind: "article" }>;

interface ArticleContinueProps {
  prevArticle?: ArticleEntry | null;
  nextArticle?: ArticleEntry | null;
  moreFromCompany: Insight[];
  companyName: string;
}

export function ArticleContinue({
  prevArticle,
  nextArticle,
  moreFromCompany,
  companyName,
}: ArticleContinueProps) {
  return (
    <section
      aria-label="Continue Reading"
      className="bg-neutral-50 text-neutral-950 pb-24 border-t border-neutral-950/10"
      style={{
        paddingInline: TOKENS.paddingInline,
        paddingTop: "clamp(48px, 8vh, 80px)",
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] space-y-16 lg:space-y-24">
        {/* Previous & Next Navigation */}
        {(prevArticle || nextArticle) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-neutral-950/10 pb-16">
            {prevArticle ? (
              <Link
                href={`/insights/${prevArticle.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-neutral-950/10 bg-white p-6 sm:p-8 transition-colors hover:border-neutral-950/30 shadow-sm"
              >
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-neutral-950/50 mb-3">
                    Previous insight
                  </p>
                  <h3
                    className="font-medium tracking-tight text-neutral-950 leading-snug group-hover:underline"
                    style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                  >
                    {prevArticle.title}
                  </h3>
                </div>
                <div className="mt-8 flex justify-end">
                  <ArrowCircle
                    size={44}
                    tone="light"
                    direction="left"
                    className="transition-colors group-hover:bg-neutral-950 group-hover:text-white"
                  />
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle && (
              <Link
                href={`/insights/${nextArticle.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-neutral-950/10 bg-white p-6 sm:p-8 transition-colors hover:border-neutral-950/30 shadow-sm"
              >
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-neutral-950/50 mb-3">
                    Next insight
                  </p>
                  <h3
                    className="font-medium tracking-tight text-neutral-950 leading-snug group-hover:underline"
                    style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                  >
                    {nextArticle.title}
                  </h3>
                </div>
                <div className="mt-8 flex justify-end">
                  <ArrowCircle
                    size={44}
                    tone="light"
                    direction="right"
                    className="transition-colors group-hover:bg-neutral-950 group-hover:text-white"
                  />
                </div>
              </Link>
            )}
          </div>
        )}

        {/* More From Company */}
        {moreFromCompany.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-950/10 pb-4">
              <h3 className="text-xl font-medium tracking-tight text-neutral-950">
                More from {companyName}
              </h3>
              <span className="font-mono text-xs tabular-nums text-neutral-950/50">
                {moreFromCompany.length}{" "}
                {moreFromCompany.length === 1 ? "insight" : "insights"}
              </span>
            </div>
            <div className="divide-y divide-neutral-950/10">
              {moreFromCompany.map((item) => (
                <InsightRow
                  key={item.kind === "article" ? item.slug : item.id}
                  insight={item}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Insights Final Row */}
        <div className="pt-6">
          <Link
            href="/insights"
            className="group flex items-center justify-between py-8 border-t border-b border-neutral-950/15 transition-colors hover:bg-neutral-950/[0.02]"
          >
            <span
              className="font-medium tracking-[-0.03em] text-neutral-950 group-hover:underline"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              All insights
            </span>
            <ArrowCircle
              size={56}
              tone="light"
              direction="right"
              className="transition-colors group-hover:bg-neutral-950 group-hover:text-white"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
