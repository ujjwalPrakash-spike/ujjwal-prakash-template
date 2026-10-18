"use client";

import { HERO_CONFIG } from "@/lib/site/constants";
import { ScrollShrink } from "@/components/ui/ScrollShrink";
import { Navbar } from "@/components/features/navigation/Navbar";
import { HeroContent } from "./HeroContent";
import { HeroStats } from "./HeroStats";

export function HeroSection() {
  return (
    <div className="w-full bg-white">
      <ScrollShrink
        src={HERO_CONFIG.videoUrl}
        poster={HERO_CONFIG.posterUrl}
        mediaType="video"
        endWidth={78}
        endHeight={72}
        startRadius={0}
        endRadius={36}
        mediaZoom={1.15}
        scrollDistance={1.6}
        holdDistance={0.4}
        overlayScrim={0}
        content={
          <div className="w-full h-svh flex flex-col justify-between px-[var(--nav-inset)] select-none">
            {/* Region 1: Header row */}
            <div className="w-full pt-[clamp(12px,2.5vh,28px)] shrink-0">
              <Navbar tone="dark" />
            </div>

            {/* Region 2: Main */}
            <div className="flex-1 min-h-0 flex flex-col justify-end pb-[clamp(12px,2vh,28px)]">
              <HeroContent />
            </div>

            {/* Region 3: Footer */}
            <div className="w-full pb-[clamp(16px,3vh,40px)] shrink-0">
              <HeroStats />
            </div>
          </div>
        }
      />
    </div>
  );
}

export default HeroSection;
