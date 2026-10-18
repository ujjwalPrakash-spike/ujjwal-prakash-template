// Justified uncropped photo grid with S/M/L density control, hover dimming, batch pagination, and lightbox integration.
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { TOKENS, NAV_INSET } from "@/lib/tokens";
import { computeJustifiedRows } from "@/lib/gallery/utils";
import type { GalleryPhoto, Density } from "@/lib/gallery/types";

interface EventPhotosProps {
  photos: GalleryPhoto[];
  onOpenLightbox: (index: number) => void;
}

const DENSITY_HEIGHTS: Record<Density, number> = {
  S: 200,
  M: 260,
  L: 340,
};

const BATCH_SIZE = 36;

export function EventPhotos({ photos, onOpenLightbox }: EventPhotosProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [density, setDensity] = useState<Density>("M");
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);

  // Restore persisted density from localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem("apex_gallery_density") as Density | null;
      if (saved && (saved === "S" || saved === "M" || saved === "L")) {
        setDensity(saved);
      }
    } catch {
      // Storage unavailable or blocked
    }
  }, []);

  const handleDensityChange = (newDensity: Density) => {
    setDensity(newDensity);
    try {
      localStorage.setItem("apex_gallery_density", newDensity);
    } catch {
      // Safe fallback
    }
  };

  // Measure container width accurately on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // IntersectionObserver for auto-loading more photos when entering view
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el || visibleCount >= photos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, photos.length));
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, photos.length]);

  const visiblePhotos = useMemo(() => {
    return photos.slice(0, visibleCount);
  }, [photos, visibleCount]);

  // Compute justified rows for desktop (>=768px)
  const justifiedRows = useMemo(() => {
    if (containerWidth < 768) return [];
    const targetHeight = DENSITY_HEIGHTS[density];
    return computeJustifiedRows(visiblePhotos, containerWidth, targetHeight, 8);
  }, [visiblePhotos, containerWidth, density]);

  const remainingPhotos = photos.length - visibleCount;

  return (
    <section
      aria-label="Event Photographs"
      style={{
        paddingLeft: NAV_INSET,
        paddingRight: NAV_INSET,
      }}
      className="w-full max-w-[1440px] mx-auto py-12 sm:py-16 select-none"
    >
      {/* Quiet Toolbar: Photo count (Left) + Density Control S | M | L (Right) */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 text-xs font-mono">
        <span className="text-white/60 tracking-wider">
          <strong className="text-white font-medium tabular-nums">{photos.length}</strong> ARTIFACTS
          INDEXED
        </span>

        {/* Density Control */}
        <div role="group" aria-label="Grid density control" className="flex items-center gap-1.5">
          <span className="text-white/40 uppercase tracking-widest mr-2 hidden sm:inline-block">
            DENSITY
          </span>
          {(["S", "M", "L"] as Density[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => handleDensityChange(d)}
              aria-pressed={density === d}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] ${
                density === d
                  ? "bg-white text-neutral-950 font-medium shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Container */}
      <div ref={containerRef} className="w-full">
        {/* Mobile & Small Tablets (<768px): 2-Column Responsive Layout */}
        <div className="grid grid-cols-2 gap-2 md:hidden">
          {visiblePhotos.map((photo, idx) => {
            const aspect = photo.width > 0 && photo.height > 0 ? photo.width / photo.height : 1;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onOpenLightbox(idx)}
                aria-label={`Inspect photo ${idx + 1}: ${photo.alt}`}
                style={{ aspectRatio: `${aspect}` }}
                className="relative w-full rounded-md overflow-hidden bg-white/[0.06] group cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
              >
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-white/[0.08]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop (>=768px): Justified Uncropped Rows with Hover Dimming */}
        <div className="hidden md:flex flex-col gap-2 [&:hover_button]:opacity-60 [&:hover_button:hover]:!opacity-100">
          {justifiedRows.length > 0
            ? justifiedRows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-2 w-full items-center">
                  {row.items.map((item) => (
                    <button
                      key={item.index}
                      type="button"
                      onClick={() => onOpenLightbox(item.index)}
                      aria-label={`Inspect photo ${item.index + 1}: ${item.photo.alt}`}
                      style={{
                        width: `${item.width}px`,
                        height: `${item.height}px`,
                      }}
                      className="relative shrink-0 rounded-md overflow-hidden bg-white/[0.06] transition-opacity duration-300 outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] cursor-pointer"
                    >
                      {item.photo.src ? (
                        <Image
                          src={item.photo.src}
                          alt={item.photo.alt}
                          fill
                          sizes={`${item.width}px`}
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/[0.08]" />
                      )}
                    </button>
                  ))}
                </div>
              ))
            : /* SSR or Initial Fallback (Flex wrap) */
              <div className="flex flex-wrap gap-2 w-full">
                {visiblePhotos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onOpenLightbox(idx)}
                    aria-label={`Inspect photo ${idx + 1}: ${photo.alt}`}
                    style={{
                      height: `${DENSITY_HEIGHTS[density]}px`,
                      aspectRatio: `${photo.width / photo.height}`,
                    }}
                    className="relative shrink-0 rounded-md overflow-hidden bg-white/[0.06] outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] cursor-pointer"
                  >
                    {photo.src ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="400px"
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/[0.08]" />
                    )}
                  </button>
                ))}
              </div>}
        </div>
      </div>

      {/* Show More Pagination Trigger */}
      {remainingPhotos > 0 && (
        <div ref={loadMoreRef} className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, photos.length))}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-white text-xs font-mono uppercase tracking-wider text-white hover:bg-white/[0.06] transition-all cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
          >
            <span>Show {Math.min(BATCH_SIZE, remainingPhotos)} more artifacts</span>
            <span className="text-white/40 tabular-nums">({remainingPhotos} remaining)</span>
          </button>
        </div>
      )}
    </section>
  );
}

export default EventPhotos;
