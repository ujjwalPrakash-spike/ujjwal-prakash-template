import React from "react";
import type { Metadata } from "next";
import { INSIGHTS_DATA } from "@/lib/insights";
import { countDistinct } from "@/lib/collections";
import { InsightsPageClient } from "./InsightsPageClient";

export const metadata: Metadata = {
  title: "SPO Insights | Students' Placement Office, IIT Kanpur",
  description:
    "Explore comprehensive interview experiences, placement strategies, and internship insights shared by IIT Kanpur alumni and students.",
  openGraph: {
    title: "SPO Insights | Students' Placement Office, IIT Kanpur",
    description:
      "Explore comprehensive interview experiences, placement strategies, and internship insights shared by IIT Kanpur alumni and students.",
  },
};

export default function InsightsPage() {
  const totalInsights = INSIGHTS_DATA.length;
  const totalPlacements = INSIGHTS_DATA.filter((i) => i.type === "placement").length;
  const totalInternships = INSIGHTS_DATA.filter((i) => i.type === "internship").length;
  const totalCompanies = countDistinct(INSIGHTS_DATA, (i) => i.company.toLowerCase());

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-[#93c5fd]/30 selection:text-white">
      <main id="main-content">
        <InsightsPageClient
          insights={INSIGHTS_DATA}
          totalInsights={totalInsights}
          totalPlacements={totalPlacements}
          totalInternships={totalInternships}
          totalCompanies={totalCompanies}
        />
      </main>
    </div>
  );
}
