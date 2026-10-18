import React from "react";
import { cn } from "@/lib/utils";
import { SURFACES, TOKENS, type Surface } from "@/lib/tokens";

interface SectionProps {
  id?: string;
  surface: Surface;
  "aria-labelledby"?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  surface,
  "aria-labelledby": ariaLabelledby,
  className,
  children,
}: SectionProps) {
  const s = SURFACES[surface];
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn("w-full scroll-mt-[var(--header-stack-h)]", s.bg, s.text, className)}
      style={{
        paddingInline: TOKENS.paddingInline,
        paddingTop: TOKENS.paddingVertical,
        paddingBottom: TOKENS.paddingVertical,
      }}
    >
      <div className="mx-auto w-full max-w-[1440px]">{children}</div>
    </section>
  );
}
