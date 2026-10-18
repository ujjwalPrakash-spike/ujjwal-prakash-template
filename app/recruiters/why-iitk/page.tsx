import type { Metadata } from "next";
import { StickyIndexBar } from "@/components/shared/layout/StickyIndexBar";
import {
  CompaniesHero,
  ProcedureTimeline,
  PolicySection,
  FacilitiesSection,
  ResourcesSection,
  CommitmentsSection,
  FaqSection,
} from "@/components/features/companies";
import {
  COMPANY_SECTIONS,
  PLACEMENT_POLICY_DATA,
  INTERNSHIP_POLICY_DATA,
  COMPANIES_HERO_DATA,
} from "@/lib/companies";

export const metadata: Metadata = {
  title: "Why Recruit IITK | Students' Placement Office, IIT Kanpur",
  description: COMPANIES_HERO_DATA.lead,
  openGraph: {
    title: "Why Recruit IITK | Students' Placement Office, IIT Kanpur",
    description: COMPANIES_HERO_DATA.lead,
  },
};

export default function WhyRecruitIITKRoute() {
  return (
    <main className="relative w-full bg-neutral-950 text-white selection:bg-[#93c5fd] selection:text-neutral-950">
      {/* Hero Section */}
      <CompaniesHero />

      {/* Sticky Secondary Subnav */}
      <StickyIndexBar items={COMPANY_SECTIONS} />

      {/* Chapter 01: Procedure (light) */}
      <ProcedureTimeline />

      {/* Chapter 02: Placement Policy (dark) */}
      <PolicySection
        id="policy"
        chapterIndex="02"
        surface="dark"
        data={PLACEMENT_POLICY_DATA}
      />

      {/* Chapter 03: Internship Policy (light) */}
      <PolicySection
        id="ipolicy"
        chapterIndex="03"
        surface="light"
        data={INTERNSHIP_POLICY_DATA}
      />

      {/* Chapter 04: Facilities (dark) */}
      <FacilitiesSection />

      {/* Chapter 05: Resources (light) */}
      <ResourcesSection />

      {/* Chapter 06 & 07: Declaration & Violation Guidelines (dark) */}
      <CommitmentsSection />

      {/* Chapter 08: FAQs (light) */}
      <FaqSection />
    </main>
  );
}
