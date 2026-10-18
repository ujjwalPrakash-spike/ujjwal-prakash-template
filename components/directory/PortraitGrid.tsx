/**
 * Generic portrait grid layout.
 * Usage:
 * <PortraitGrid
 *   items={people}
 *   getPortraitProps={(p) => ({ name: p.name, photo: p.photo, linkedin: p.linkedin })}
 *   columns={4}
 * />
 */

import React from "react";
import { Portrait } from "../shared/ui/Portrait";
import { ContactLinks } from "../shared/ui/ContactLinks";
import type { Surface } from "@/lib/tokens";

interface PortraitGridProps<T> {
  items: T[];
  getPortraitProps: (item: T) => {
    name: string;
    photo?: string;
    linkedin?: string;
    email?: string;
    phone?: string;
  };
  columns?: 2 | 4;
  tone?: Surface;
}

export function PortraitGrid<T>({
  items,
  getPortraitProps,
  columns = 4,
  tone = "light",
}: PortraitGridProps<T>) {
  const colClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2 max-w-[840px]"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid gap-8 sm:gap-10 ${colClass}`}>
      {items.map((item, idx) => {
        const p = getPortraitProps(item);
        return (
          <div key={idx} className="flex flex-col gap-4">
            <Portrait name={p.name} photo={p.photo} linkedin={p.linkedin} />
            <div>
              <h3 className="font-medium text-lg tracking-tight mb-1">{p.name}</h3>
              <ContactLinks name={p.name} email={p.email} phone={p.phone} tone={tone} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
