"use client";

import React from "react";
import { Navbar } from "@/components/features/navigation/Navbar";
import { CountUp } from "@/components/shared/motion/CountUp";
import { TOKENS } from "@/lib/tokens";
import {
  COMPANIES_HERO_DATA,
  PROCEDURE_STEPS,
  PLACEMENT_POLICY_DATA,
  INTERNSHIP_POLICY_DATA,
  FACILITIES_DATA,
  COMPANY_FAQS,
} from "@/lib/companies/data";
import { RECRUITERS_STAT } from "@/lib/home/recruiters";

export function CompaniesHero() {
  const stepsCount = PROCEDURE_STEPS.length;
  const policyPointsCount =
    PLACEMENT_POLICY_DATA.points.length +
    1 +
    (INTERNSHIP_POLICY_DATA.points.length + 1);
  const facilitiesCount = FACILITIES_DATA.length;
  const faqsCount = COMPANY_FAQS.length;

  // Extract count from RECRUITERS_STAT ("250+ companies...")
  const recruiterStatMatch = RECRUITERS_STAT.match(/^(\d+)/);
  const recruiterCount = recruiterStatMatch ? parseInt(recruiterStatMatch[1], 10) : 250;

  return (
    <section
      aria-label="For Companies Overview"
      className="relative w-full min-h-[80svh] bg-neutral-950 text-white flex flex-col justify-between"
      style={{
        paddingTop: "var(--nav-h)",
      }}
    >
      <Navbar tone="dark" variant="bar" />

      {/* Large intentional negative space above bottom-anchored content */}
      <div className="flex-1 min-h-[12vh] sm:min-h-[16vh]" aria-hidden="true" />

      <div
        className="w-full mx-auto max-w-[1440px] flex flex-col"
        style={{ paddingInline: TOKENS.paddingInline }}
      >
        <div className="max-w-[1100px]">
          {/* Eyebrow */}
          <p className="text-[13px] uppercase tracking-[0.12em] text-white/50 mb-6 font-medium">
            {COMPANIES_HERO_DATA.eyebrow}
          </p>

          {/* Title on two lines */}
          <h1
            className="font-medium tracking-[-0.05em] text-white select-none"
            style={{
              fontSize: "clamp(3.25rem, 11.5vw, 11.5rem)",
              lineHeight: 0.88,
            }}
          >
            <span className="block">{COMPANIES_HERO_DATA.titleLine1}</span>
            <span className="block">{COMPANIES_HERO_DATA.titleLine2}</span>
          </h1>

          {/* Lead */}
          <p
            className="text-white/75 font-normal leading-[1.6] max-w-[62ch] mt-8 mb-10"
            style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)" }}
          >
            {COMPANIES_HERO_DATA.lead}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-16 sm:mb-20">
            <a
              href={COMPANIES_HERO_DATA.portalLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[14px] font-medium text-neutral-950 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2"
            >
              Recruiter portal login
            </a>
            <a
              href={COMPANIES_HERO_DATA.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-[14px] font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2"
            >
              Placement brochure
            </a>
          </div>
        </div>

        {/* Computed Counts Strip under Hairline */}
        <div className="w-full border-t border-white/10 py-8 sm:py-10">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="flex flex-col pt-4 sm:pt-0 sm:px-4 first:pl-0">
              <span
                className="font-mono tabular-nums text-white font-medium"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                <CountUp value={stepsCount} />
              </span>
              <span className="text-[13px] text-white/55 mt-1 font-normal">
                Procedure steps
              </span>
            </div>

            <div className="flex flex-col pt-4 sm:pt-0 sm:px-4">
              <span
                className="font-mono tabular-nums text-white font-medium"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                <CountUp value={policyPointsCount} />
              </span>
              <span className="text-[13px] text-white/55 mt-1 font-normal">
                Policy points
              </span>
            </div>

            <div className="flex flex-col pt-4 sm:pt-0 sm:px-4">
              <span
                className="font-mono tabular-nums text-white font-medium"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                <CountUp value={facilitiesCount} />
              </span>
              <span className="text-[13px] text-white/55 mt-1 font-normal">
                Recruiting facilities
              </span>
            </div>

            <div className="flex flex-col pt-4 sm:pt-0 sm:px-4">
              <span
                className="font-mono tabular-nums text-white font-medium"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                <CountUp value={faqsCount} />
              </span>
              <span className="text-[13px] text-white/55 mt-1 font-normal">
                Recruiter FAQs
              </span>
            </div>

            <div className="flex flex-col pt-4 sm:pt-0 sm:px-4 col-span-2 sm:col-span-1">
              <span
                className="font-mono tabular-nums text-white font-medium"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
              >
                <CountUp value={recruiterCount} suffix="+" />
              </span>
              <span className="text-[13px] text-white/55 mt-1 font-normal">
                Companies recruited
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
