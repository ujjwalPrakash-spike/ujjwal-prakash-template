"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface FocusListProps<T> {
  items: T[];
  getKey: (item: T) => string;
  renderRow: (item: T, index: number, isActive: boolean) => React.ReactNode;
  renderPanel: (activeItem: T, activeIndex: number, total: number) => React.ReactNode;
  panelPosition?: "left" | "right";
  panelSpan?: string;
  rowsSpan?: string;
  stickyTop?: string;
  className?: string;
}

export function FocusList<T>({
  items,
  getKey,
  renderRow,
  renderPanel,
  panelPosition = "left",
  panelSpan = "lg:col-span-4",
  rowsSpan = "lg:col-span-8",
  stickyTop = "top-[144px]",
  className = "",
}: FocusListProps<T>) {
  const shouldReduceMotion = useReducedMotion();
  const [scrollActiveIndex, setScrollActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeIndex = hoverIndex !== null ? hoverIndex : scrollActiveIndex;
  const activeItem = items[activeIndex] ?? items[0];

  useEffect(() => {
    if (shouldReduceMotion || items.length === 0) return;

    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setScrollActiveIndex(idx);
            }
          });
        },
        {
          root: null,
          rootMargin: "-45% 0px -45% 0px",
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [items, shouldReduceMotion]);

  if (items.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {panelPosition === "left" && (
          <div className={`hidden lg:block ${panelSpan} sticky ${stickyTop} z-10 self-start`}>
            <div className={shouldReduceMotion ? "opacity-100" : "transition-opacity duration-200"}>
              {renderPanel(activeItem, activeIndex, items.length)}
            </div>
          </div>
        )}

        {/* The Rows */}
        <div className={`${rowsSpan} flex flex-col`}>
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={getKey(item)}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                onFocus={() => setHoverIndex(idx)}
                onBlur={() => setHoverIndex(null)}
                className={`transition-opacity duration-300 ${
                  shouldReduceMotion
                    ? "opacity-100"
                    : isActive
                    ? "opacity-100"
                    : "opacity-35 max-lg:opacity-100"
                }`}
              >
                {renderRow(item, idx, isActive)}
              </div>
            );
          })}
        </div>

        {panelPosition === "right" && (
          <div className={`hidden lg:block ${panelSpan} sticky ${stickyTop} z-10 self-start`}>
            <div className={shouldReduceMotion ? "opacity-100" : "transition-opacity duration-200"}>
              {renderPanel(activeItem, activeIndex, items.length)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
