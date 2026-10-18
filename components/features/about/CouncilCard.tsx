"use client";

// Individual council card with logo tile and expandable text.

import React, { useState } from "react";
import Image from "next/image";
import type { StudentCouncil } from "@/lib/about/campus-life";

export function CouncilCard({ council }: { council: StudentCouncil }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = council.description.length > 220;

  return (
    <div className="flex flex-col gap-4">
      <div className="h-[72px] w-[72px] rounded-2xl bg-neutral-950/5 flex items-center justify-center p-2.5 overflow-hidden border border-neutral-950/10 shrink-0">
        <Image
          src={council.logo}
          alt={council.alt}
          width={64}
          height={64}
          className="w-full h-full object-contain"
        />
      </div>

      <h4 className="text-[22px] font-medium text-neutral-950 tracking-tight">
        {council.title}
      </h4>

      <p
        className={`text-[15px] leading-[1.65] text-neutral-950/70 text-pretty ${
          !expanded && isLong ? "line-clamp-6" : ""
        }`}
      >
        {council.description}
      </p>

      {isLong ? (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-[13px] text-[#93c5fd] hover:underline self-start font-medium"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      ) : null}
    </div>
  );
}
