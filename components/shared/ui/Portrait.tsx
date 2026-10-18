/**
 * Portrait tile displaying a photo or 2-letter initials fallback.
 * Usage:
 * <Portrait
 *   name="Piyush Singal"
 *   photo="/images/coordinators/Piyush.png"
 *   linkedin="https://linkedin.com/..."
 * />
 */

import React from "react";
import Image from "next/image";
import { IconBrandLinkedin } from "@tabler/icons-react";
import { TOKENS } from "@/lib/tokens";

interface PortraitProps {
  name: string;
  photo?: string;
  linkedin?: string;
  className?: string;
}

export function Portrait({ name, photo, linkedin, className = "" }: PortraitProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative w-full aspect-[4/5] bg-neutral-100 overflow-hidden group select-none ${className}`}
      style={{ borderRadius: TOKENS.radiusPortrait }}
    >
      {photo ? (
        <Image
          src={photo}
          alt={`${name}, placement coordinator`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
          className="object-cover object-top grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-600 ease-out"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center font-medium text-3xl text-neutral-400">
          {initials}
        </div>
      )}

      {linkedin ? (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          className="absolute bottom-3 right-3 h-10 w-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-neutral-900 opacity-90 sm:opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-200 hover:scale-110"
        >
          <IconBrandLinkedin size={18} />
        </a>
      ) : null}
    </div>
  );
}
