// Full-screen media that starts full-bleed (no margins) and shrinks into a rounded frame on scroll.
"use client";

import React, { useCallback, useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

export interface ScrollShrinkProps {
  src?: string;
  mediaType?: "image" | "video";
  poster?: string;
  alt?: string;
  content?: ReactNode;
  title?: ReactNode;
  scrollHint?: ReactNode;
  topControls?: ReactNode;
  bottomControls?: ReactNode;
  endWidth?: number;
  endHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

export function ScrollShrink({
  src = "",
  mediaType = "image",
  poster = "",
  alt = "",
  content,
  title,
  scrollHint,
  topControls,
  bottomControls,
  endWidth = 80,
  endHeight = 72,
  startRadius = 0,
  endRadius = 36,
  mediaZoom = 1.15,
  scrollDistance = 1.6,
  holdDistance = 0.4,
  smoothing = 0.08,
  overlayScrim = 0.35,
  useWindowScroll = true,
  enabled = true,
  children,
  className = "",
  style,
  ...rest
}: ScrollShrinkProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement & HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const topControlsRef = useRef<HTMLDivElement | null>(null);
  const bottomControlsRef = useRef<HTMLDivElement | null>(null);

  const applyProgress = useCallback(
    (p: number) => {
      const frame = frameRef.current;
      const media = mediaRef.current;
      if (!frame || !media) return;

      const e = smoothstep(0, 1, p);

      // Start full-bleed (0% inset, 0px radius) and smoothly transition to shrunk frame on white background
      const startInsetX = 0;
      const startInsetY = 0;
      const endInsetX = Math.max(0, (100 - endWidth) / 2);
      const endInsetY = Math.max(0, (100 - endHeight) / 2);
      const ix = startInsetX + (endInsetX - startInsetX) * e;
      const iy = startInsetY + (endInsetY - startInsetY) * e;
      const r = startRadius + (endRadius - startRadius) * e;
      frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

      media.style.transform = `scale(${mediaZoom + (1 - mediaZoom) * e})`;

      if (scrimRef.current) scrimRef.current.style.opacity = `${overlayScrim * (1 - e)}`;

      // Fade out unified content layer
      if (contentRef.current) {
        const out = smoothstep(0, 0.35, p);
        contentRef.current.style.opacity = `${1 - out}`;
        contentRef.current.style.transform = `translate3d(0, ${-24 * out}px, 0)`;
        contentRef.current.style.pointerEvents = out > 0.5 ? "none" : "auto";
      }

      // Fade out title
      if (titleRef.current) {
        const out = smoothstep(0, 0.45, p);
        titleRef.current.style.opacity = `${1 - out}`;
        titleRef.current.style.transform = `translate3d(0, ${-36 * out}px, 0) scale(${1 + 0.04 * out})`;
      }

      // Fade out scroll hint
      if (hintRef.current) {
        const gone = smoothstep(0, 0.18, p);
        hintRef.current.style.opacity = `${1 - gone}`;
        hintRef.current.style.transform = `translate3d(0, ${10 * gone}px, 0)`;
      }

      // Fade out top controls (Logo + Chapters)
      if (topControlsRef.current) {
        const out = smoothstep(0, 0.25, p);
        topControlsRef.current.style.opacity = `${1 - out}`;
        topControlsRef.current.style.transform = `translate3d(0, ${-20 * out}px, 0)`;
        topControlsRef.current.style.pointerEvents = out > 0.5 ? "none" : "auto";
      }

      // Fade out bottom controls (Know the Man + Indicator)
      if (bottomControlsRef.current) {
        const out = smoothstep(0, 0.25, p);
        bottomControlsRef.current.style.opacity = `${1 - out}`;
        bottomControlsRef.current.style.transform = `translate3d(0, ${20 * out}px, 0)`;
        bottomControlsRef.current.style.pointerEvents = out > 0.5 ? "none" : "auto";
      }
    },
    [endWidth, endHeight, startRadius, endRadius, mediaZoom, overlayScrim]
  );

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      stageH = useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;

      const extra = enabled ? Math.max(0, scrollDistance) + Math.max(0, holdDistance) : 0;
      track.style.height = `${stageH * (1 + extra)}px`;
    };

    const readProgress = () => {
      if (!enabled) return 0;
      const span = stageH * Math.max(0.01, scrollDistance);
      if (useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const k = smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll, enabled, scrollDistance, holdDistance, smoothing]);

  const media =
    mediaType === "video" ? (
      <video
        ref={mediaRef}
        className="absolute inset-0 w-full h-full object-cover origin-center select-none [will-change:transform]"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    ) : (
      <div className="absolute inset-0 w-full h-full">
        <Image
          ref={mediaRef}
          src={src || poster}
          alt={alt}
          fill
          priority
          className="object-cover origin-center select-none [will-change:transform]"
        />
      </div>
    );

  return (
    <div
      ref={rootRef}
      className={`relative w-full bg-white ${
        useWindowScroll
          ? ""
          : "h-full overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      } ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="relative w-full min-h-[300vh]">
        <div ref={stageRef} className="sticky top-0 w-full h-screen overflow-hidden bg-white">
          {/* Shrinking framed media canvas */}
          <div
            ref={frameRef}
            className="absolute inset-0 [clip-path:inset(0%_0%_0%_0%_round_0px)] [will-change:clip-path] bg-black shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {media}
            {/* Gradient overlays matching video boundaries exactly */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-black/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-black/35 to-transparent" />
            </div>
            {overlayScrim > 0 ? (
              <div
                ref={scrimRef}
                className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-black/50"
                style={{ opacity: overlayScrim }}
              />
            ) : null}
          </div>

          {/* Unified Content layer or fallback multi-slot */}
          {content ? (
            <div
              ref={contentRef}
              className="absolute inset-0 z-30 pointer-events-auto [will-change:opacity,transform]"
            >
              {content}
            </div>
          ) : (
            <>
              {/* Top Controls Overlay: LogoBadge + Chapters/Hamburger */}
              {topControls ? (
                <div
                  ref={topControlsRef}
                  className="absolute top-0 inset-x-0 z-30 pointer-events-auto [will-change:opacity,transform]"
                >
                  {topControls}
                </div>
              ) : null}

              {/* Center Title Container */}
              {title ? (
                <div
                  ref={titleRef}
                  className="absolute inset-0 flex items-center justify-center m-0 px-[4%] text-center pointer-events-none [will-change:opacity,transform] z-10"
                >
                  {title}
                </div>
              ) : null}

              {/* Bottom Controls Overlay: Action Button + Scroll Hint */}
              {bottomControls ? (
                <div
                  ref={bottomControlsRef}
                  className="absolute bottom-0 inset-x-0 z-30 pointer-events-auto [will-change:opacity,transform]"
                >
                  {bottomControls}
                </div>
              ) : null}

              {/* Scroll Hint */}
              {scrollHint ? (
                <div
                  ref={hintRef}
                  className="absolute inset-x-0 bottom-0 pointer-events-none [will-change:opacity,transform] z-10"
                >
                  {scrollHint}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      {/* Children Section released after scrolling */}
      {children ? <div className="relative w-full z-20 bg-[#06080d]">{children}</div> : null}
    </div>
  );
}

export default ScrollShrink;
