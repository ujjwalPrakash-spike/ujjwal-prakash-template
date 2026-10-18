/**
 * Generic grouped list with sticky group headers.
 * Usage:
 * <GroupedList
 *   items={departmentCoordinators}
 *   getGroup={(p) => p.department}
 *   renderItem={(p) => <PersonCard person={p} />}
 * />
 */

import React from "react";
import { groupBy } from "@/lib/utils/collections";
import type { Surface } from "@/lib/tokens";

interface GroupedListProps<T> {
  items: T[];
  getGroup: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  tone?: Surface;
}

export function GroupedList<T>({
  items,
  getGroup,
  renderItem,
  tone = "light",
}: GroupedListProps<T>) {
  const groups = groupBy(items, getGroup);
  const isDark = tone === "dark";

  return (
    <div
      className={`flex flex-col divide-y ${
        isDark ? "divide-white/10" : "divide-neutral-950/10"
      }`}
    >
      {groups.map(({ group, items: groupItems }) => (
        <div
          key={group}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 first:pt-0 last:pb-0"
        >
          <div className="lg:col-span-4 lg:sticky lg:top-[var(--header-stack-h)] self-start">
            <h3
              className={`font-medium text-2xl tracking-tight ${
                isDark ? "text-white" : "text-neutral-950"
              }`}
            >
              {group}
            </h3>
            <span
              className={`font-mono text-xs block mt-1 ${
                isDark ? "text-white/40" : "text-neutral-950/40"
              }`}
            >
              {String(groupItems.length).padStart(2, "0")} coordinators
            </span>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {groupItems.map((item, idx) => (
              <div key={idx}>{renderItem(item)}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
