"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface FocusListProps<T> {
  items: T[];
  getKey: (item: T) => string;
  renderRow: (item: T, index: number, isActive: boolean) => React.ReactNode;
  renderPanel: (activeItem: T, activeIndex: number, total: number) => React.ReactNode;
  className?: string;
}

export function FocusList<T>({
  items,
  getKey,
  renderRow,
  renderPanel,
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
        {/* Left Col 1-4: Sticky Panel at >=1024px */}
        <div className="hidden lg:block lg:col-span-4 sticky top-[144px] z-10 self-start">
          <div
            className={`transition-opacity duration-200 ${
              shouldReduceMotion ? "opacity-100" : "opacity-100"
            }`}
          >
            {renderPanel(activeItem, activeIndex, items.length)}
          </div>
        </div>

        {/* Right Col 5-12: The Rows */}
        <div className="lg:col-span-8 flex flex-col">
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
                    : "opacity-30 max-lg:opacity-45"
                }`}
              >
                {renderRow(item, idx, isActive)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
