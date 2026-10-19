// Sticky contact details column with atelier address, direct links, operating hours, and tonal image slot.
import React from "react";
import { CONTACT_CONFIG } from "@/config/contact";
import { ImageSlot } from "@/components/shared/ui";

export function ContactDetails() {
  const { address } = CONTACT_CONFIG;

  return (
    <aside
      aria-label="Atelier Coordinates"
      className="w-full flex flex-col space-y-8 lg:sticky lg:top-[88px]"
    >
      {/* Studio Image Slot */}
      <div className="w-full">
        <ImageSlot
          src={address.image}
          alt={address.name}
          aspectRatio="4:5"
          silent={true}
          sizes="(max-width: 1024px) 100vw, 400px"
        />
      </div>

      {/* Address Block */}
      <div className="space-y-3">
        <span className="block font-mono text-[12px] uppercase tracking-[0.14em] text-white/45">
          Atelier Coordinates
        </span>
        <address className="not-italic text-[16px] text-white/80 leading-relaxed font-sans space-y-1">
          <span className="block font-medium text-white">{address.name}</span>
          {address.lines.map((line, idx) => (
            <span key={idx} className="block">
              {line}
            </span>
          ))}
        </address>

        <a
          href={address.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[14px] text-[#93c5fd] hover:underline underline-offset-4 font-mono mt-1"
        >
          {address.mapLabel} &rarr;
        </a>
      </div>

      <div className="w-full h-px bg-white/10" />

      {/* Direct Contact Links */}
      <div className="space-y-4">
        <div>
          <span className="block font-mono text-[12px] uppercase tracking-[0.14em] text-white/45 mb-1">
            Telephone
          </span>
          <a
            href={address.phoneHref}
            className="text-[16px] text-white hover:text-[#93c5fd] transition-colors whitespace-nowrap font-mono"
          >
            {address.phone}
          </a>
        </div>

        <div>
          <span className="block font-mono text-[12px] uppercase tracking-[0.14em] text-white/45 mb-1">
            Electronic Dispatch
          </span>
          <a
            href={address.emailHref}
            className="text-[16px] text-white hover:text-[#93c5fd] transition-colors whitespace-nowrap font-mono"
          >
            {address.email}
          </a>
        </div>

        <div>
          <span className="block font-mono text-[12px] uppercase tracking-[0.14em] text-white/45 mb-1">
            Operating Hours
          </span>
          <p className="text-[15px] text-white/70 font-mono">
            {address.hours}
          </p>
        </div>
      </div>
    </aside>
  );
}
