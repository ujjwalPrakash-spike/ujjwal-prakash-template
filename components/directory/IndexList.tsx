import React from "react";
import Link from "next/link";
import { ArrowCircle } from "../shared/ui/ArrowCircle";
import { SURFACES, type Surface } from "@/lib/tokens";

export interface IndexListItem {
  id: string;
  label: string;
  href?: string;
}

interface IndexListProps {
  items: IndexListItem[];
  tone?: Surface;
}

export function IndexList({ items, tone = "light" }: IndexListProps) {
  const s = SURFACES[tone];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t ${s.hairline}`}>
      {items.map((item) => {
        const content = (
          <div
            className={`group py-6 border-b ${s.hairline} flex items-center justify-between gap-4 transition-transform duration-200 ${
              item.href ? "cursor-pointer" : ""
            }`}
          >
            <span
              className="font-medium tracking-tight group-hover:translate-x-3 transition-transform duration-200 ease-out"
              style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.5rem)" }}
            >
              {item.label}
            </span>
            {item.href ? <ArrowCircle /> : null}
          </div>
        );

        return item.href ? (
          <Link key={item.id} href={item.href}>
            {content}
          </Link>
        ) : (
          <div key={item.id}>{content}</div>
        );
      })}
    </div>
  );
}
