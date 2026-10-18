"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RECRUITER_LOGOS, type RecruiterLogo } from "@/lib/home/recruiters";

function CountUpRecruiters() {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(shouldReduceMotion ? 250 : 0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const start = 0;
    const end = 250;
    const duration = 1400;
    const startTime = performance.now();

    function update(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (end - start) * easeProgress));
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, [shouldReduceMotion]);

  return (
    <span className="tabular-nums">
      {count}+ companies recruited in Phase 1, 2025–26
    </span>
  );
}

function LogoItem({
  logo,
  ariaHidden = false,
}: {
  logo: RecruiterLogo;
  ariaHidden?: boolean;
}) {
  return (
    <li
      className="shrink-0 flex items-center"
      aria-hidden={ariaHidden || undefined}
      style={{ paddingInline: "clamp(24px, 3vw, 48px)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.src}
        alt={ariaHidden ? "" : logo.name}
        className="object-contain transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        style={{
          height: "clamp(28px, 3vw, 44px)",
          width: "auto",
          maxWidth: "140px",
          opacity: 0.7,
          filter: "grayscale(1)",
          mixBlendMode: "multiply",
        }}
      />
    </li>
  );
}

function MarqueeRow({
  logos,
  direction,
  duration,
}: {
  logos: RecruiterLogo[];
  direction: "left" | "right";
  duration: number;
}) {
  const animClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <ul
        className={`flex items-center ${animClass} hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]`}
        style={{ animationDuration: `${duration}s` }}
        aria-label="Recruiter logos"
      >
        {logos.map((logo) => (
          <LogoItem key={logo.name} logo={logo} />
        ))}
        {logos.map((logo) => (
          <LogoItem key={`dup-${logo.name}`} logo={logo} ariaHidden />
        ))}
      </ul>
    </div>
  );
}

function StaticLogoGrid({ logos }: { logos: RecruiterLogo[] }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
      {logos.map((logo) => (
        <LogoItem key={logo.name} logo={logo} />
      ))}
    </ul>
  );
}

export function RecruiterMarquee() {
  const shouldReduceMotion = useReducedMotion();

  const mid = Math.ceil(RECRUITER_LOGOS.length / 2);
  const row1 = RECRUITER_LOGOS.slice(0, mid);
  const row2 = RECRUITER_LOGOS.slice(mid);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 sm:gap-8 pb-5">
        <div className="overflow-hidden">
          <motion.h2
            id="recruiters-heading"
            initial={{ y: shouldReduceMotion ? 0 : "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-medium tracking-[-0.03em] text-neutral-950"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3.5rem)" }}
          >
            Past recruiters
          </motion.h2>
        </div>

        <p className="text-[15px] text-neutral-950/60 font-normal">
          <CountUpRecruiters />
        </p>
      </div>

      <motion.div
        initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
        className="h-[1px] w-full bg-neutral-950/10 mb-8"
      />

      <div className="flex flex-col gap-10 overflow-hidden">
        {shouldReduceMotion ? (
          <StaticLogoGrid logos={RECRUITER_LOGOS} />
        ) : (
          <>
            <motion.div
              initial={{
                opacity: 0,
                x: "6vw",
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <MarqueeRow logos={row1} direction="left" duration={60} />
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: "-6vw",
              }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <MarqueeRow logos={row2} direction="right" duration={72} />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

export default RecruiterMarquee;
