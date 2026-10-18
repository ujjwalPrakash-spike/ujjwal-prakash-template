"use client";

import React from "react";
import Link from "next/link";
import { Section } from "@/components/shared/layout/Section";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import { RevealText } from "@/components/shared/motion/Reveal";
import { RESOURCES_DATA } from "@/lib/companies/data";

function isPdf(href?: string): boolean {
  if (!href) return false;
  const clean = href.split("?")[0].split("#")[0].toLowerCase();
  return clean.endsWith(".pdf");
}

function isDocx(href?: string): boolean {
  if (!href) return false;
  const clean = href.split("?")[0].split("#")[0].toLowerCase();
  return clean.endsWith(".docx");
}

export function ResourcesSection() {
  return (
    <Section id="resources" surface="light" aria-labelledby="chapter-resources">
      <ChapterHeader
        id="chapter-resources"
        index="05"
        title="Resources"
        count={`${RESOURCES_DATA.length} RESOURCES`}
        tone="light"
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-16 border-t border-neutral-950/10">
        {RESOURCES_DATA.map((res, idx) => {
          const hasPdf = isPdf(res.href);
          const hasDocx = isDocx(res.href);
          const isFileOrExternal =
            res.external || (res.href && (res.href.startsWith("http") || res.href.startsWith("/assets/")));

          const innerContent = (
            <div className="group py-7 border-b border-neutral-950/10 flex items-center justify-between gap-4 transition-transform duration-200">
              <div className="flex items-center gap-3">
                <span
                  className={`font-medium tracking-tight text-neutral-950 transition-colors ${
                    res.href ? "group-hover:text-neutral-950/80" : ""
                  }`}
                  style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.5rem)" }}
                >
                  {res.label}
                </span>
                {hasPdf ? (
                  <span className="font-mono text-[13px] uppercase tracking-wider px-2 py-0.5 rounded border border-neutral-950/20 text-neutral-950/60 font-medium">
                    PDF
                  </span>
                ) : null}
                {hasDocx ? (
                  <span className="font-mono text-[13px] uppercase tracking-wider px-2 py-0.5 rounded border border-neutral-950/20 text-neutral-950/60 font-medium">
                    DOCX
                  </span>
                ) : null}
              </div>

              {res.href ? (
                <div className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
                  <ArrowCircle />
                </div>
              ) : null}
            </div>
          );

          return (
            <RevealText key={res.id} delay={Math.min(idx * 0.05, 0.35)}>
              {res.href ? (
                isFileOrExternal ? (
                  <a
                    href={res.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus-visible:outline-2 focus-visible:outline-neutral-950 focus-visible:outline-offset-4 rounded cursor-pointer"
                  >
                    {innerContent}
                  </a>
                ) : (
                  <Link
                    href={res.href}
                    className="block focus-visible:outline-2 focus-visible:outline-neutral-950 focus-visible:outline-offset-4 rounded cursor-pointer"
                  >
                    {innerContent}
                  </Link>
                )
              ) : (
                <div>{innerContent}</div>
              )}
            </RevealText>
          );
        })}
      </div>
    </Section>
  );
}
