/**
 * Generic typographic tabular row list.
 * Usage:
 * <RowList
 *   items={assistants}
 *   columns={[
 *     { key: "name", label: "Name", className: "col-span-4", render: (p) => p.name }
 *   ]}
 * />
 */

import React from "react";
import type { Surface } from "@/lib/tokens";

export interface RowColumn<T> {
  key: string;
  label?: string;
  className?: string;
  render: (item: T, index: number) => React.ReactNode;
}

interface RowListProps<T> {
  items: T[];
  columns: RowColumn<T>[];
  tone?: Surface;
}

export function RowList<T>({ items, columns, tone = "dark" }: RowListProps<T>) {
  const isDark = tone === "dark";

  return (
    <ul
      className={`w-full divide-y ${
        isDark
          ? "divide-white/10 border-white/10"
          : "divide-neutral-950/10 border-neutral-950/10"
      } border-t border-b`}
    >
      {items.map((item, idx) => (
        <li
          key={idx}
          className={`group py-5 px-3 -mx-3 rounded-lg transition-colors duration-150 ${
            isDark ? "hover:bg-white/[0.04]" : "hover:bg-neutral-950/[0.04]"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {columns.map((col) => (
              <div key={col.key} className={col.className}>
                {col.render(item, idx)}
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
