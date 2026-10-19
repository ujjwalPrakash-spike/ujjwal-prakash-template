// Full-screen accessible lightbox dialog with object-contain viewing, keyboard nav, swipe, and deep linking.
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { IconX, IconChevronLeft, IconChevronRight, IconCopy, IconCheck, IconDownload } from "@tabler/icons-react";
import { GALLERY_CONFIG } from "@/lib/gallery/config";
import type { GalleryPhoto } from "@/lib/gallery/types";

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function GalleryLightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
  triggerRef,
}: GalleryLightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < photos.length;
  const currentPhoto = isOpen ? photos[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null || photos.length === 0) return;
    const nextIdx = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null || photos.length === 0) return;
    const nextIdx = (currentIndex + 1) % photos.length;
    onNavigate(nextIdx);
  }, [currentIndex, photos.length, onNavigate]);

  // Focus trap, lock body scroll, keyboard arrows, and Escape
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const triggerEl = triggerRef?.current;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerEl?.focus();
    };
  }, [isOpen, onClose, handlePrev, handleNext, triggerRef]);

  // Sync URL ?photo={n} (1-indexed) via replaceState
  useEffect(() => {
    if (!isOpen || currentIndex === null) return;
    const url = new URL(window.location.href);
    url.searchParams.set("photo", String(currentIndex + 1));
    window.history.replaceState(null, "", url.toString());

    return () => {
      const cleanupUrl = new URL(window.location.href);
      cleanupUrl.searchParams.delete("photo");
      window.history.replaceState(null, "", cleanupUrl.toString());
    };
  }, [isOpen, currentIndex]);

  // Touch Swipe (horizontal drag with 60px threshold)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) >= 60) {
      if (diff > 0) {
        handleNext(); // swipe left -> next
      } else {
        handlePrev(); // swipe right -> prev
      }
    }
    setTouchStartX(null);
  };

  const handleCopyLink = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !currentPhoto) return null;

  // Preload indices
  const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
  const nextIdx = (currentIndex + 1) % photos.length;
  const prevPhoto = photos[prevIdx];
  const nextPhoto = photos[nextIdx];

  const formattedCounter = `${String(currentIndex + 1).padStart(2, "0")} / ${String(
    photos.length
  ).padStart(2, "0")}`;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo ${currentIndex + 1} of ${photos.length}: ${currentPhoto.alt}`}
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="fixed inset-0 z-[150] w-full h-[100svh] bg-neutral-950 flex flex-col justify-between p-4 sm:p-6 lg:p-8 select-none"
      >
        {/* Hidden Preloader for previous and next images */}
        <div className="hidden" aria-hidden="true">
          {prevPhoto?.src && <Image src={prevPhoto.src} alt="" width={100} height={100} priority />}
          {nextPhoto?.src && <Image src={nextPhoto.src} alt="" width={100} height={100} priority />}
        </div>

        {/* Top Bar: Counter (Left) + Actions & Close (Right) */}
        <header className="flex items-center justify-between w-full shrink-0 z-10">
          <span className="font-mono text-xs sm:text-sm tracking-wider text-white/70">
            {formattedCounter}
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors py-2 px-3 rounded-full hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
            >
              {copied ? <IconCheck size={14} className="text-[#93c5fd]" /> : <IconCopy size={14} />}
              <span>{copied ? "Copied" : "Copy link"}</span>
            </button>

            {GALLERY_CONFIG.allowDownload && currentPhoto.src && (
              <a
                href={currentPhoto.src}
                download
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors py-2 px-3 rounded-full hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
              >
                <IconDownload size={14} />
                <span>Download</span>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close lightbox"
              className="w-11 h-11 flex items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors focus-visible:outline-2 focus-visible:outline-[#93c5fd] cursor-pointer"
            >
              <IconX size={22} />
            </button>
          </div>
        </header>

        {/* Center: Image Display with side buttons */}
        <main className="relative flex-1 w-full h-full min-h-0 flex items-center justify-center py-2 sm:py-4">
          {/* Previous Button (Hidden on touch) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="hidden md:flex absolute left-2 lg:left-4 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/15 text-white/80 hover:text-white transition-all focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
          >
            <IconChevronLeft size={24} />
          </button>

          {/* Active Image (Contained, Never Cropped) */}
          <div className="relative w-full h-full max-w-[calc(100vw-32px)] sm:max-w-[calc(100vw-80px)] lg:max-w-[calc(100vw-180px)] max-h-[calc(100svh-140px)] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {currentPhoto.src ? (
                  <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1600px"
                    className="object-contain"
                    priority
                  />
                ) : (
                  <div className="w-full max-w-xl aspect-[4/3] bg-white/[0.06] rounded-xl flex items-center justify-center border border-white/10">
                    <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                      [PHOTOGRAPH {currentPhoto.width}x{currentPhoto.height}]
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button (Hidden on touch) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="hidden md:flex absolute right-2 lg:right-4 z-20 w-12 h-12 items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/15 text-white/80 hover:text-white transition-all focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
          >
            <IconChevronRight size={24} />
          </button>
        </main>

        {/* Bottom Bar: Caption (Bottom-left) */}
        <footer className="w-full shrink-0 flex items-center justify-between text-xs text-white/60 z-10 min-h-[24px]">
          {currentPhoto.caption ? (
            <p className="max-w-2xl truncate text-white/75">{currentPhoto.caption}</p>
          ) : (
            <p className="max-w-2xl truncate text-white/40">{currentPhoto.alt}</p>
          )}
          <span className="font-mono text-[11px] text-white/35 shrink-0 ml-4 hidden sm:inline-block">
            {currentPhoto.width} × {currentPhoto.height}
          </span>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}

export default GalleryLightbox;
