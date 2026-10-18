// Server component composing the complete /about route for IIT Kanpur SPO.

import type { Metadata } from "next";
import { AboutHero } from "@/components/features/about/AboutHero";
import { StickyIndexBar } from "@/components/shared/layout/StickyIndexBar";
import { AcademicsSection } from "@/components/features/about/AcademicsSection";
import { ResearchSection } from "@/components/features/about/ResearchSection";
import { AlumniSection } from "@/components/features/about/AlumniSection";
import { FacultySection } from "@/components/features/about/FacultySection";
import { CampusLifeSection } from "@/components/features/about/CampusLifeSection";
import { ABOUT_HERO_CONTENT, ABOUT_SECTIONS } from "@/lib/about/content";

export const metadata: Metadata = {
  title: "About IIT Kanpur | Students' Placement Office",
  description: ABOUT_HERO_CONTENT.subcopy,
  openGraph: {
    title: "About IIT Kanpur | Students' Placement Office",
    description: ABOUT_HERO_CONTENT.subcopy,
    images: [{ url: "/images/about/AboutIITK.jpg", width: 1200, height: 630, alt: "IIT Kanpur Campus" }],
  },
};

export default function AboutPage() {
  return (
    <main className="relative w-full bg-neutral-50 text-neutral-950 selection:bg-[#93c5fd] selection:text-neutral-950">
      <AboutHero />
      <StickyIndexBar items={ABOUT_SECTIONS} />
      <AcademicsSection />
      <ResearchSection />
      <AlumniSection />
      <FacultySection />
      <CampusLifeSection />
    </main>
  );
}
