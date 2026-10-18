"use client";

import React from "react";

export function HeroStats() {
  return (
    <div className="w-full flex items-center justify-end [@media(max-height:560px)]:hidden">
      {/* Desktop-only 40px Scroll Cue */}
      <div className="hidden lg:flex items-center pl-6 shrink-0 ml-auto">
        <div className="w-[1.5px] h-[40px] bg-white/20 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-[#93c5fd] rounded-full animate-[scrollLine_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

export default HeroStats;
