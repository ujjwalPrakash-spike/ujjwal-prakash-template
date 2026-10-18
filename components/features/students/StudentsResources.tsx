"use client";

import React from "react";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { StudentResource } from "@/lib/students/data";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import { isPdf } from "@/lib/format";
import { TOKENS } from "@/lib/tokens";

interface StudentsResourcesProps {
  resources: StudentResource[];
}

export function StudentsResources({ resources }: StudentsResourcesProps) {
  const groups: ("Policies" | "Forms" | "Previous years")[] = [
    "Policies",
    "Forms",
    "Previous years",
  ];

  return (
    <section
      id="resources"
      aria-label="Student Resources & Documents"
      className="bg-neutral-950 text-white scroll-mt-28 py-20 lg:py-28"
      style={{ paddingInline: TOKENS.paddingInline }}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <ChapterHeader
          index="03"
          title="Resources"
          surface="dark"
          count={resources.length}
          lead="Essential policies, clearance forms, absence waivers, and proformas for candidate preparation."
        />

        <div className="mt-16 space-y-16">
          {groups.map((group) => {
            const groupItems = resources.filter((r) => r.group === group);
            if (groupItems.length === 0) return null;

            return (
              <div key={group} className="space-y-4">
                <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/50">
                  {group}
                </h3>

                <div className="border-t border-white/10 divide-y divide-white/10">
                  {groupItems.map((item, idx) => {
                    const hasLink = Boolean(item.link);
                    const isPdfFile = isPdf(item.link);
                    const isExternal = item.link.startsWith("http");

                    const content = (
                      <div className="group relative flex items-center justify-between py-5 px-3 -mx-3 rounded-lg transition-colors hover:bg-white/[0.04] w-full">
                        <div className="flex items-center gap-4 sm:gap-6">
                          <span className="font-mono text-xs text-white/40 tabular-nums">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="font-medium text-white transition-transform duration-200 group-hover:translate-x-2"
                            style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                          >
                            {item.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {isPdfFile && (
                            <span className="font-mono text-xs uppercase text-white/45 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                              PDF
                            </span>
                          )}
                          <ArrowCircle
                            size={40}
                            tone="dark"
                            direction={isExternal ? "up-right" : "right"}
                            className="transition-colors group-hover:bg-white group-hover:text-neutral-950"
                          />
                        </div>
                      </div>
                    );

                    if (!hasLink) {
                      return <div key={item.name}>{content}</div>;
                    }

                    return (
                      <a
                        key={item.name}
                        href={item.link}
                        target={isExternal || isPdfFile ? "_blank" : undefined}
                        rel={isExternal || isPdfFile ? "noopener noreferrer" : undefined}
                        className="block focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
                      >
                        {content}
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
