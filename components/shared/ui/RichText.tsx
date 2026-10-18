import React from "react";

export type TextSegment =
  | string
  | {
      text: string;
      strong?: boolean;
      small?: boolean;
      href?: string;
      className?: string;
    };

export function RichText({ segments }: { segments: TextSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        if (typeof seg === "string") return <React.Fragment key={i}>{seg}</React.Fragment>;
        
        let node: React.ReactNode = seg.text;
        if (seg.strong) {
          node = <strong className={`font-medium ${seg.className ?? ""}`}>{node}</strong>;
        }
        if (seg.small) {
          node = <small className={`text-[13px] opacity-70 ${seg.className ?? ""}`}>{node}</small>;
        }

        if (seg.href) {
          return (
            <a
              key={i}
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline underline-offset-4 decoration-current/30 hover:decoration-current transition-colors ${seg.className ?? ""}`}
            >
              {node}
            </a>
          );
        }

        if (seg.strong || seg.small) {
          return <React.Fragment key={i}>{node}</React.Fragment>;
        }

        return (
          <span key={i} className={seg.className}>
            {seg.text}
          </span>
        );
      })}
    </>
  );
}
