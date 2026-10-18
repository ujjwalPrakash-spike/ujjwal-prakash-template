import React from "react";
import { CopyButton } from "./CopyButton";
import { formatPhone, phoneHref } from "@/lib/utils/format";
import type { Surface } from "@/lib/tokens";

interface ContactLinksProps {
  name: string;
  email?: string;
  phone?: string;
  tone?: Surface;
  className?: string;
}

export function ContactLinks({
  name,
  email,
  phone,
  tone = "dark",
  className = "",
}: ContactLinksProps) {
  const isDark = tone === "dark";

  return (
    <div className={`flex flex-col gap-1 text-[15px] ${className}`}>
      {email ? (
        <div className="flex items-center gap-1 group/contact">
          <a
            href={`mailto:${email}`}
            className={`truncate hover:underline decoration-1 underline-offset-4 ${
              isDark ? "text-white/70 hover:text-white" : "text-neutral-950/70 hover:text-neutral-950"
            }`}
          >
            {email}
          </a>
          <CopyButton
            value={email}
            label={`Copy email for ${name}`}
            className="opacity-0 group-hover/contact:opacity-100 focus:opacity-100 transition-opacity"
          />
        </div>
      ) : null}
      {phone ? (
        <div className="flex items-center gap-1 group/contact">
          <a
            href={phoneHref(phone)}
            className={`whitespace-nowrap hover:underline decoration-1 underline-offset-4 ${
              isDark ? "text-white/70 hover:text-white" : "text-neutral-950/70 hover:text-neutral-950"
            }`}
          >
            {formatPhone(phone)}
          </a>
          <CopyButton
            value={phone.replace(/\D/g, "")}
            label={`Copy phone for ${name}`}
            className="opacity-0 group-hover/contact:opacity-100 focus:opacity-100 transition-opacity"
          />
        </div>
      ) : null}
    </div>
  );
}
