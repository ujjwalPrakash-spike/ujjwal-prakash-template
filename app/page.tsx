// Root homepage rendering Hero, Why Recruit, Leadership Stacking Cards, and News + Recruiters.

import { HeroSection } from "@/components/features/home/HeroSection";
import { WhyRecruitHorizontalScroll } from "@/components/features/why-recruit/WhyRecruitHorizontalScroll";
import { LeadershipStackSection } from "@/components/features/leadership/LeadershipStackSection";
import { HomeScrollConfig } from "@/components/ui/HomeScrollConfig";
import { NewsAndRecruiters } from "@/components/features/home/NewsAndRecruiters";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-white text-black selection:bg-[#93c5fd] selection:text-black">
      <HomeScrollConfig />
      <HeroSection />
      <WhyRecruitHorizontalScroll />
      <LeadershipStackSection />
      <NewsAndRecruiters />
    </main>
  );
}

