import React from "react";
import type { Metadata } from "next";
import { INSIGHTS_DATA } from "@/lib/insights";
import { STUDENT_HERO_DATA } from "@/lib/students/data";
import { topNByCount } from "@/lib/collections";
import { StudentsPageClient } from "./StudentsPageClient";

export const metadata: Metadata = {
  title: "For Students | Students' Placement Office, IIT Kanpur",
  description: STUDENT_HERO_DATA.lead,
  openGraph: {
    title: "For Students | Students' Placement Office, IIT Kanpur",
    description: STUDENT_HERO_DATA.lead,
  },
};

export default function StudentsPage() {
  const totalInsights = INSIGHTS_DATA.length;
  // Compute top 12 companies by insight count for the marquee ticker (ties sorted A-Z)
  const topCompanies = topNByCount(
    INSIGHTS_DATA,
    (i) => i.company,
    12
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-[#93c5fd]/30 selection:text-white">
      <main id="main-content">
        <StudentsPageClient
          totalInsights={totalInsights}
          topCompanies={topCompanies}
        />
      </main>
    </div>
  );
}
