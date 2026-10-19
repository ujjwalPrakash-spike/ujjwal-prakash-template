// Factory racing drivers showcase with alternating editorial grid and scroll parallax.
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { ImageSlot } from "@/components/shared/ui/ImageSlot";
import { CountUp } from "@/components/shared/motion/CountUp";
import { DRIVERS_DATA, type DriverData, type TeamMember } from "@/lib/team/members";
import { useDirectory } from "@/components/directory/DirectoryProvider";
import { TOKENS } from "@/lib/tokens";

interface DriverRowProps {
  driver: DriverData;
  index: number;
}

function DriverRow({ driver, index }: DriverRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isEven = index % 2 === 1;
  const firstName = driver.name.split(" ")[0];

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  // Parallax: image moves -4% to 4% across scroll range (oversized 10%)
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <div
      ref={rowRef}
      className="w-full flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 lg:items-end"
    >
      {/* Driver Portrait */}
      <div
        className={`w-full max-w-[420px] lg:max-w-none mb-8 lg:mb-0 ${
          isEven
            ? "lg:col-span-5 lg:col-start-8 lg:order-2"
            : "lg:col-span-5 lg:order-1"
        }`}
      >
        <motion.div
          initial={{
            clipPath: shouldReduceMotion ? "inset(0% round 12px)" : "inset(8% round 12px)",
            scale: shouldReduceMotion ? 1 : 1.08,
            opacity: shouldReduceMotion ? 1 : 0,
          }}
          whileInView={{
            clipPath: "inset(0% round 12px)",
            scale: 1,
            opacity: 1,
          }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{
            duration: shouldReduceMotion ? 0.3 : 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-full overflow-hidden select-none group focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-4"
          style={{ borderRadius: TOKENS.radiusPortrait }}
        >
          <motion.div
            style={{
              y: shouldReduceMotion ? 0 : parallaxY,
            }}
            className="relative w-full aspect-[4/5] overflow-hidden scale-[1.10] origin-center transition-all duration-600 ease-out grayscale [@media(hover:none)]:grayscale-0 hover:grayscale-0 focus-within:grayscale-0 group-hover:scale-[1.13] group-focus-within:scale-[1.13]"
          >
            <ImageSlot
              src={driver.image}
              alt={driver.imageAlt || `${driver.name} portrait`}
              aspectRatio="4:5"
              tone="light"
              silent
              border={false}
              roleLabel="Driver"
              sizes="(max-width: 1024px) 100vw, 560px"
              className="w-full h-full object-cover !border-0 !shadow-none"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Driver Editorial Text */}
      <div
        className={`w-full flex flex-col justify-end ${
          isEven
            ? "lg:col-span-6 lg:col-start-1 lg:order-1"
            : "lg:col-span-6 lg:col-start-7 lg:order-2"
        }`}
      >
        {/* Giant Car Number */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, delay: 0, ease: TOKENS.ease }}
        >
          <span
            className="font-mono font-medium text-neutral-950 tracking-[-0.06em] leading-[0.85] tabular-nums block select-none"
            style={{ fontSize: "clamp(5rem, 11vw, 11rem)" }}
          >
            {driver.number}
          </span>
        </motion.div>

        {/* Plain Text Meta Line */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, delay: 0.06, ease: TOKENS.ease }}
        >
          <p className="font-sans text-[13px] uppercase tracking-[0.12em] text-neutral-950/55 mt-4 mb-2">
            {driver.class} · {driver.nationality}
          </p>
        </motion.div>

        {/* Driver Name */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, delay: 0.12, ease: TOKENS.ease }}
        >
          <h3
            className="font-sans font-medium text-neutral-950 tracking-[-0.04em] leading-[1.0]"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
          >
            {driver.name}
          </h3>
        </motion.div>

        {/* Role */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, delay: 0.18, ease: TOKENS.ease }}
        >
          <p className="font-sans text-[17px] text-neutral-950/65 mt-2">
            {driver.role}
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, delay: 0.24, ease: TOKENS.ease }}
        >
          <p className="font-sans text-[17px] text-neutral-950/75 max-w-[52ch] leading-relaxed mt-4 mb-6">
            {driver.bio}
          </p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, delay: 0.3, ease: TOKENS.ease }}
          className="w-full border-t border-neutral-950/10 my-4"
        >
          {driver.highlights.slice(0, 3).map((hl, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 py-2.5 border-b border-neutral-950/10 text-[16px]"
            >
              <span className="font-sans font-medium text-neutral-950">
                {hl.label}
              </span>
              <span className="font-sans text-neutral-950/60 text-left sm:text-right">
                {hl.detail}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Optional Stats */}
        {driver.stats ? (
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.6, delay: 0.36, ease: TOKENS.ease }}
            className="grid grid-cols-3 gap-4 pt-3 pb-3 border-b border-neutral-950/10 mb-4"
          >
            <div>
              <span className="font-mono text-2xl md:text-3xl font-medium text-neutral-950 tabular-nums">
                <CountUp value={driver.stats.starts} />
              </span>
              <span className="block font-sans text-[12px] uppercase tracking-wider text-neutral-950/55 mt-1">
                Starts
              </span>
            </div>
            <div>
              <span className="font-mono text-2xl md:text-3xl font-medium text-neutral-950 tabular-nums">
                <CountUp value={driver.stats.wins} />
              </span>
              <span className="block font-sans text-[12px] uppercase tracking-wider text-neutral-950/55 mt-1">
                Wins
              </span>
            </div>
            <div>
              <span className="font-mono text-2xl md:text-3xl font-medium text-neutral-950 tabular-nums">
                <CountUp value={driver.stats.podiums} />
              </span>
              <span className="block font-sans text-[12px] uppercase tracking-wider text-neutral-950/55 mt-1">
                Podiums
              </span>
            </div>
          </motion.div>
        ) : null}

        {/* Contact Link */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, delay: 0.42, ease: TOKENS.ease }}
        >
          <a
            href={`mailto:${driver.email}`}
            className="group/link inline-flex flex-col text-[16px] font-sans font-medium text-neutral-950 whitespace-nowrap pt-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-950 focus-visible:outline-offset-4"
          >
            <span>Contact {firstName}</span>
            <span className="block w-0 group-hover/link:w-full transition-all duration-300 h-[1px] bg-neutral-950" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export function DriversSection() {
  const directory = useDirectory<TeamMember>();
  const isSearching = directory?.isSearching;
  const query = directory?.query?.toLowerCase().trim() || "";

  const displayedDrivers =
    isSearching && query
      ? DRIVERS_DATA.filter((d) =>
          `${d.name} ${d.role} ${d.class} ${d.nationality} ${d.number}`
            .toLowerCase()
            .includes(query)
        )
      : DRIVERS_DATA;

  if (isSearching && displayedDrivers.length === 0) {
    return null;
  }

  const driversCount = `${displayedDrivers.length} ${
    displayedDrivers.length === 1 ? "Driver" : "Drivers"
  }`;

  return (
    <section
      id="drivers"
      aria-label="Factory Racing Drivers"
      className="relative w-full bg-neutral-50 text-neutral-950 overflow-hidden"
      style={{
        paddingInline: TOKENS.paddingInline,
        paddingTop: "clamp(80px, 12vh, 140px)",
        paddingBottom: "clamp(80px, 12vh, 140px)",
      }}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Chapter Header */}
        <ChapterHeader
          index="01"
          title="Drivers"
          count={driversCount}
          tone="light"
        />

        {/* Drivers Stack */}
        <div
          className="flex flex-col"
          style={{
            gap: "clamp(80px, 14vh, 160px)",
          }}
        >
          {displayedDrivers.map((driver, index) => (
            <DriverRow key={driver.slug} driver={driver} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DriversSection;
