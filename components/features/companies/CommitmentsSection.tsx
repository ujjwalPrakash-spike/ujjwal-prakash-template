"use client";

import React from "react";
import { Section } from "@/components/shared/layout/Section";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import { RevealText } from "@/components/shared/motion/Reveal";
import {
  DECLARATION_ITEMS,
  DECLARATION_DOC_HREF,
  VIOLATION_GUIDELINES,
  VIOLATION_DOC_HREF,
} from "@/lib/companies/data";

export function CommitmentsSection() {
  return (
    <Section id="declaration" surface="dark" aria-labelledby="chapter-declaration">
      {/* Chapter 06: Declaration by Recruiters */}
      <div className="w-full">
        <ChapterHeader
          id="chapter-declaration"
          index="06"
          title="Declaration by Recruiters"
          count={`${DECLARATION_ITEMS.length} COMMITMENTS`}
          tone="dark"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <p className="text-[14px] uppercase tracking-wider text-white/50 font-medium">
            Uniform Declaration Format
          </p>
          <a
            href={DECLARATION_DOC_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] text-white/80 hover:text-white transition-colors group focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded"
          >
            <span>Download Declaration Form (.docx)</span>
            <div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <ArrowCircle />
            </div>
          </a>
        </div>

        {/* Numbered rows for text points */}
        <ol className="w-full list-none p-0 m-0 divide-y divide-white/10 border-t border-b border-white/10">
          {DECLARATION_ITEMS.map((item, idx) => (
            <li key={item.number} className="py-7">
              <RevealText delay={Math.min(idx * 0.05, 0.3)}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-baseline">
                  <div className="md:col-span-3">
                    <span className="font-mono text-sm tracking-widest text-white/40 select-none">
                      {String(item.number).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:col-span-8 md:col-start-4">
                    <p className="text-[17px] leading-[1.7] text-white/75 max-w-[62ch]">
                      {item.text}
                    </p>
                    {item.link ? (
                      <div className="mt-3">
                        <a
                          href={item.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[14px] text-[#93c5fd] hover:underline"
                        >
                          <span>{item.link.label}</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </RevealText>
            </li>
          ))}
        </ol>
      </div>

      {/* Hairline separator between chapters */}
      <div
        id="violation"
        className="w-full border-t border-white/10 my-20 lg:my-28 scroll-mt-[var(--header-stack-h)]"
        aria-hidden="true"
      />

      {/* Chapter 07: Violation Guidelines by AIPC */}
      <div className="w-full">
        <ChapterHeader
          id="chapter-violation"
          index="07"
          title="Violation Guidelines by AIPC"
          count={`${VIOLATION_GUIDELINES.length} GUIDELINES`}
          tone="dark"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <p className="text-[14px] uppercase tracking-wider text-white/50 font-medium">
            Actions for different violations
          </p>
          <a
            href={VIOLATION_DOC_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] text-white/80 hover:text-white transition-colors group focus-visible:outline-2 focus-visible:outline-[#93c5fd] rounded"
          >
            <span>Download Annexure 4 Document (.docx)</span>
            <div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <ArrowCircle />
            </div>
          </a>
        </div>

        {/* Tabular numbered rows for violation guidelines */}
        <ol className="w-full list-none p-0 m-0 divide-y divide-white/10 border-t border-b border-white/10">
          {VIOLATION_GUIDELINES.map((item, idx) => (
            <li key={item.number} className="py-7">
              <RevealText delay={Math.min(idx * 0.05, 0.35)}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                  <div className="md:col-span-1">
                    <span className="font-mono text-sm tracking-widest text-white/40 select-none">
                      {String(item.number).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:col-span-5">
                    <span className="block text-[12px] uppercase tracking-wider text-white/40 mb-1">
                      Nature of Violation
                    </span>
                    <p className="text-[17px] font-medium leading-[1.5] text-white/90">
                      {item.violation}
                    </p>
                  </div>
                  <div className="md:col-span-6">
                    <span className="block text-[12px] uppercase tracking-wider text-white/40 mb-1">
                      Recommended AIPC Action
                    </span>
                    <p className="text-[16px] leading-[1.6] text-white/75">
                      {item.action}
                    </p>
                  </div>
                </div>
              </RevealText>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
