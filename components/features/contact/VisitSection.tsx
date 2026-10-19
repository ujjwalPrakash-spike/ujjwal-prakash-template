// Dark physical atelier visit section featuring address coordinates, appointment hours, and facility visual.
import React from "react";
import { CONTACT_CONFIG } from "@/config/contact";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { ImageSlot } from "@/components/shared/ui/ImageSlot";

export function VisitSection() {
  const { address, visitSection } = CONTACT_CONFIG;

  if (!address || !address.lines || address.lines.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Atelier Visit & Facility"
      className="relative w-full bg-neutral-950 text-white py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-16">
        <ChapterHeader
          index="03"
          title="Visit the Atelier"
          surface="dark"
          lead={visitSection.hours}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Address and hours in large type */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="block font-mono text-[12px] uppercase tracking-[0.16em] text-[#93c5fd]">
                {visitSection.title}
              </span>

              <address
                className="not-italic font-sans font-medium tracking-[-0.02em] leading-tight text-white space-y-1"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.5rem)" }}
              >
                <span className="block">{address.name}</span>
                {address.lines.map((line, idx) => (
                  <span key={idx} className="block text-white/80">
                    {line}
                  </span>
                ))}
              </address>
            </div>

            <div className="pt-2">
              <a
                href={address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[16px] text-[#93c5fd] hover:text-white transition-colors underline underline-offset-8 decoration-[#93c5fd]/40 hover:decoration-white font-mono"
              >
                <span>{address.mapLabel}</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Right Column: Facility Image Slot aspect-[16/10] */}
          <div className="lg:col-span-7 w-full">
            <ImageSlot
              src={visitSection.image}
              alt="APEX WORKS Atelier Facility"
              aspectRatio="16:9"
              silent={true}
              sizes="(max-width: 1024px) 100vw, 800px"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
