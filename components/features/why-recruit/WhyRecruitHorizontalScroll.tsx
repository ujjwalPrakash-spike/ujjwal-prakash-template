"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { WHY_RECRUIT_PANELS, type WhyRecruitPanel } from "@/lib/home/why-recruit";

function FactPanel({
  panel,
  index,
  total,
}: {
  panel: WhyRecruitPanel;
  index: number;
  total: number;
}) {
  const idx = String(index + 1).padStart(2, "0");

  return (
    <li className="shrink-0 w-[80vw] md:w-[80vw] lg:w-[80vw] h-full flex flex-col border-r border-white/10 last:border-r-0">
      <div className="flex-1 flex flex-col px-[clamp(24px,6vw,96px)] pt-[clamp(24px,4vh,48px)] pb-[clamp(24px,5vh,56px)]">
        {/* Top row: category + index */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-auto">
          <span className="text-[13px] uppercase tracking-[0.12em] text-white/60 font-normal">
            {panel.category}
          </span>
          <span className="text-[13px] text-white/45">
            {idx} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Bottom-anchored block */}
        <div className="mt-auto flex flex-col items-start gap-[clamp(8px,1.5vh,16px)]">
          {/* Number */}
          <div
            className="font-medium tracking-[-0.04em] leading-[0.9] tabular-nums text-white"
            style={{ fontSize: "clamp(4rem, min(19vw, 30vh), 19rem)" }}
          >
            {panel.number}
            {panel.suffix ? (
              <span className="text-white/60" style={{ fontSize: "40%" }}>
                {panel.suffix}
              </span>
            ) : null}
          </div>

          {/* Label */}
          <p
            className="font-medium text-white"
            style={{ fontSize: "clamp(20px, 2.2vw, 32px)" }}
          >
            {panel.label}
          </p>

          {/* Context */}
          <p
            className="font-normal text-white/65 max-w-[42ch] [@media(max-height:640px)]:hidden"
            style={{ fontSize: "clamp(15px, 1.25vw, 18px)" }}
          >
            {panel.context}
          </p>
        </div>
      </div>
    </li>
  );
}

function IntroPanel() {
  return (
    <li className="shrink-0 w-[80vw] md:w-[80vw] lg:w-[80vw] h-full flex flex-col border-r border-white/10">
      <div className="flex-1 flex flex-col px-[clamp(24px,6vw,96px)] pt-[clamp(24px,4vh,48px)] pb-[clamp(24px,5vh,56px)]">
        {/* Top row */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-auto">
          <span className="text-[13px] uppercase tracking-[0.12em] text-white/60 font-normal">
            WHY IIT KANPUR
          </span>
          <span className="text-[13px] text-white/45">
            OVERVIEW
          </span>
        </div>

        {/* Bottom-anchored block */}
        <div className="mt-auto flex flex-col items-start gap-[clamp(8px,1.5vh,16px)]">
          <h2
            className="font-medium tracking-[-0.03em] text-white leading-tight max-w-[14ch]"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            Why recruit from IIT Kanpur
          </h2>
          <p
            className="text-white/75 font-normal"
            style={{ fontSize: "clamp(15px, 1.25vw, 18px)" }}
          >
            Teaching engineering and science since 1959.
          </p>
          <p className="text-white/40 text-[13px] font-normal">
            Figures: IIT Kanpur, NIRF, JEE Advanced, SPO.
          </p>
        </div>
      </div>
    </li>
  );
}

function CtaPanel() {
  return (
    <li className="shrink-0 w-[90vw] h-full flex flex-col">
      <div className="flex-1 flex flex-col px-[clamp(24px,6vw,96px)] pt-[clamp(24px,4vh,48px)] pb-[clamp(24px,5vh,56px)]">
        {/* Top row matching all other panels */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-auto">
          <span className="text-[13px] uppercase tracking-[0.12em] text-white/60 font-normal">
            PARTNER WITH IIT KANPUR
          </span>
          <span className="text-[13px] text-white/45">
            GET STARTED
          </span>
        </div>

        {/* Bottom-anchored block sharing exact baseline */}
        <div className="mt-auto flex flex-col items-start gap-[clamp(8px,1.5vh,16px)]">
          <h2
            className="font-medium tracking-[-0.03em] text-white leading-tight"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            Ready to hire?
          </h2>
          <p
            className="text-white/75 font-normal max-w-[46ch]"
            style={{ fontSize: "clamp(15px, 1.25vw, 18px)" }}
          >
            Hundreds of premier organizations recruit from IIT Kanpur.
          </p>
          <div className="flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-3 mt-2 w-full min-[480px]:w-auto">
            <Link
              href="https://placement.iitk.ac.in/login"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[clamp(40px,5.5vh,48px)] px-6 rounded-md bg-white text-black font-semibold text-sm inline-flex items-center justify-center hover:bg-neutral-200 transition-colors shadow-sm active:scale-95"
            >
              Recruiter portal login
            </Link>
            <Link
              href="/recruiters/why-iitk#steps"
              className="h-[clamp(40px,5.5vh,48px)] px-6 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm inline-flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95"
            >
              Recruitment procedure
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export function WhyRecruitHorizontalScroll({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const panels = WHY_RECRUIT_PANELS;
  const totalFact = panels.length;

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLOListElement | null>(null);
  const [dims, setDims] = useState({ trackWidth: 0, viewportWidth: 1, isMobile: false });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const tw = trackRef.current?.scrollWidth ?? 0;
      setDims({ trackWidth: tw, viewportWidth: vw, isMobile: vw < 768 });
    };

    const raf = requestAnimationFrame(update);

    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, []);

  const { trackWidth, viewportWidth, isMobile } = dims;

  const scrollRange = Math.max(1, trackWidth - viewportWidth);
  const scrollHeight = Math.min(scrollRange, viewportWidth * 3);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollRange]
  );

  // Mobile / reduced-motion: vertical stack
  if (isMobile || shouldReduceMotion) {
    return (
      <section
        id="why-recruit"
        className={`relative w-full bg-neutral-950 text-white ${className}`}
      >
        <ol className="flex flex-col">
          <li className="min-h-[60svh] flex flex-col px-[clamp(24px,6vw,96px)] pt-[clamp(24px,4vh,48px)] pb-[clamp(24px,5vh,56px)] border-b border-white/10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-auto">
              <span className="text-[13px] uppercase tracking-[0.12em] text-white/60 font-normal">
                WHY IIT KANPUR
              </span>
              <span className="text-[13px] text-white/45">
                OVERVIEW
              </span>
            </div>
            <div className="mt-auto flex flex-col items-start gap-[clamp(8px,1.5vh,16px)]">
              <h2
                className="font-medium tracking-[-0.03em] text-white leading-tight max-w-[14ch]"
                style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
              >
                Why recruit from IIT Kanpur
              </h2>
              <p className="text-white/75 font-normal" style={{ fontSize: "clamp(15px, 1.25vw, 18px)" }}>
                Teaching engineering and science since 1959.
              </p>
              <p className="text-white/40 text-[13px] font-normal">
                Figures: IIT Kanpur, NIRF, JEE Advanced, SPO.
              </p>
            </div>
          </li>

          {panels.map((panel, i) => {
            const idx = String(i + 1).padStart(2, "0");
            return (
              <li key={panel.id} className="min-h-[60svh] flex flex-col px-[clamp(24px,6vw,96px)] pt-[clamp(24px,4vh,48px)] pb-[clamp(24px,5vh,56px)] border-b border-white/10 last:border-b-0">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-auto">
                  <span className="text-[13px] uppercase tracking-[0.12em] text-white/60 font-normal">
                    {panel.category}
                  </span>
                  <span className="text-[13px] text-white/45">
                    {idx} / {String(totalFact).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-auto flex flex-col items-start gap-[clamp(8px,1.5vh,16px)]">
                  <div
                    className="font-medium tracking-[-0.04em] leading-[0.9] tabular-nums text-white"
                    style={{ fontSize: "clamp(4rem, min(19vw, 30vh), 19rem)" }}
                  >
                    {panel.number}
                    {panel.suffix ? (
                      <span className="text-white/60" style={{ fontSize: "40%" }}>
                        {panel.suffix}
                      </span>
                    ) : null}
                  </div>
                  <p className="font-medium text-white" style={{ fontSize: "clamp(20px, 2.2vw, 32px)" }}>
                    {panel.label}
                  </p>
                  <p
                    className="font-normal text-white/65 max-w-[42ch] [@media(max-height:640px)]:hidden"
                    style={{ fontSize: "clamp(15px, 1.25vw, 18px)" }}
                  >
                    {panel.context}
                  </p>
                </div>
              </li>
            );
          })}

          <li className="min-h-[60svh] flex flex-col px-[clamp(24px,6vw,96px)] pt-[clamp(24px,4vh,48px)] pb-[clamp(24px,5vh,56px)]">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-auto">
              <span className="text-[13px] uppercase tracking-[0.12em] text-white/60 font-normal">
                PARTNER WITH IIT KANPUR
              </span>
              <span className="text-[13px] text-white/45">
                GET STARTED
              </span>
            </div>
            <div className="mt-auto flex flex-col items-start gap-[clamp(8px,1.5vh,16px)]">
              <h2
                className="font-medium tracking-[-0.03em] text-white leading-tight"
                style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
              >
                Ready to hire?
              </h2>
              <p className="text-white/75 font-normal max-w-[46ch]" style={{ fontSize: "clamp(15px, 1.25vw, 18px)" }}>
                Hundreds of premier organizations recruit from IIT Kanpur.
              </p>
              <div className="flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-3 mt-2 w-full min-[480px]:w-auto">
                <Link
                  href="https://placement.iitk.ac.in/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[clamp(40px,5.5vh,48px)] px-6 rounded-md bg-white text-black font-semibold text-sm inline-flex items-center justify-center hover:bg-neutral-200 transition-colors shadow-sm active:scale-95"
                >
                  Recruiter portal login
                </Link>
                <Link
                  href="/recruiters/why-iitk#steps"
                  className="h-[clamp(40px,5.5vh,48px)] px-6 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm inline-flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95"
                >
                  Recruitment procedure
                </Link>
              </div>
            </div>
          </li>
        </ol>
      </section>
    );
  }

  // Desktop: pinned horizontal scroll
  return (
    <section
      ref={sectionRef}
      id="why-recruit"
      className={`relative w-full bg-neutral-950 text-white ${className}`}
      style={{ height: `${scrollHeight + viewportWidth}px` }}
    >
      <div className="sticky top-0 w-full h-svh overflow-hidden">
        <motion.ol
          ref={trackRef}
          style={{ x }}
          className="flex items-stretch h-full will-change-transform"
        >
          <IntroPanel />
          {panels.map((panel, i) => (
            <FactPanel
              key={panel.id}
              panel={panel}
              index={i}
              total={totalFact}
            />
          ))}
          <CtaPanel />
        </motion.ol>
      </div>
    </section>
  );
}

export default WhyRecruitHorizontalScroll;
