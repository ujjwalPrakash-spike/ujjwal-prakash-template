"use client";

// Chapter 01: Complete "About IIT Kanpur" section combining Hero typography, facts, narrative, and campus imagery on dark surface.

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/features/navigation/Navbar";
import { RevealText, RevealImage } from "@/components/shared/motion/Reveal";
import { ABOUT_TOKENS } from "@/lib/about/tokens";
import { ABOUT_HERO_CONTENT, ABOUT_INTRO_CONTENT } from "@/lib/about/content";
import { ABOUT_FACTS, type FactItem } from "@/lib/about/facts";

function FactCounter({ item }: { item: FactItem }) {
  const shouldReduceMotion = useReducedMotion();
  const [val, setVal] = useState<string>(item.value);

  useEffect(() => {
    if (shouldReduceMotion || !item.countUp) return;
    const match = item.value.match(/^(\d+)(.*)$/);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1200;
    const start = performance.now();

    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.floor(progress * target);
      setVal(`${current.toLocaleString()}${suffix}`);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }, [item.value, item.countUp, shouldReduceMotion]);

  return (
    <div className="flex flex-col py-4 px-2 sm:px-6 first:pl-0 last:pr-0">
      <span
        className="font-mono tabular-nums font-medium text-white tracking-tight"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
      >
        {val}
      </span>
      <span className="text-[13px] text-white/60 font-normal tracking-wide mt-1">
        {item.label}
      </span>
    </div>
  );
}

export function AboutHero({
  content = ABOUT_HERO_CONTENT,
  introContent = ABOUT_INTRO_CONTENT,
  facts = ABOUT_FACTS,
}: {
  content?: typeof ABOUT_HERO_CONTENT;
  introContent?: typeof ABOUT_INTRO_CONTENT;
  facts?: FactItem[];
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-label="About IIT Kanpur"
      className="relative w-full bg-neutral-950 text-white scroll-mt-[var(--header-stack-h)] pt-16"
    >
      <Navbar tone="dark" variant="bar" />

      {/* Hero Header Block */}
      <div
        className="mx-auto w-full max-w-[1440px]"
        style={{
          paddingInline: ABOUT_TOKENS.paddingInline,
          paddingTop: "clamp(32px, 5vh, 64px)",
          paddingBottom: "clamp(48px, 8vh, 80px)",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: ABOUT_TOKENS.ease }}
          className="text-[13px] uppercase tracking-[0.12em] text-white/50 mb-4"
        >
          {content.eyebrow}
        </motion.p>

        {/* Title */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 0.9, delay: 0.1, ease: ABOUT_TOKENS.ease }}
            className="font-sans font-medium tracking-[-0.05em] leading-[0.85] text-white"
            style={{ fontSize: "clamp(4rem, 15vw, 15rem)" }}
          >
            {content.title}
          </motion.h1>
        </div>

        {/* Lead subcopy */}
        <motion.p
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: ABOUT_TOKENS.ease }}
          className="text-white/75 text-[17px] sm:text-[19px] leading-[1.6] max-w-[52ch] mb-12 text-pretty"
        >
          {content.subcopy}
        </motion.p>

        {/* Facts strip */}
        <div className="w-full">
          <div className="h-[1px] w-full bg-white/10 mb-6" />
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: ABOUT_TOKENS.ease }}
            className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
          >
            {facts.map((fact, idx) => (
              <FactCounter key={idx} item={fact} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Narrative & Campus Imagery Block */}
      <div
        className="mx-auto max-w-[1440px]"
        style={{
          paddingInline: ABOUT_TOKENS.paddingInline,
          paddingBottom: ABOUT_TOKENS.paddingVertical,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
          <div className="lg:col-span-5">
            <RevealText>
              <p
                className="font-medium text-white leading-[1.4] text-pretty"
                style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)" }}
              >
                {introContent.quote}
              </p>
            </RevealText>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-5">
            {introContent.paragraphs.map((p, i) => (
              <RevealText key={i} delay={i * 0.07}>
                <p className="text-[17px] leading-[1.7] text-white/75 max-w-[62ch] text-pretty">
                  {p}
                </p>
              </RevealText>
            ))}
          </div>
        </div>

        {/* Entrance wall image */}
        <RevealImage className="relative w-full aspect-[4/3] sm:aspect-[21/9]">
          <Image
            src={introContent.image.src}
            alt={introContent.image.alt}
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover"
          />
        </RevealImage>
      </div>
    </section>
  );
}
