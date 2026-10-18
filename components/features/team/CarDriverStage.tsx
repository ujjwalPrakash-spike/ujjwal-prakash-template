// Full car side-profile showcase and factory driver lineup for the team section.
"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CAR_SPEC, FACTORY_DRIVERS } from "@/lib/team/members";
import { TOKENS } from "@/lib/tokens";

export function CarDriverStage() {
  const shouldReduceMotion = useReducedMotion();

  const specs = [
    { label: "CHASSIS", value: CAR_SPEC.chassis },
    { label: "ENGINE", value: CAR_SPEC.engine },
    { label: "POWER", value: CAR_SPEC.power },
    { label: "WEIGHT", value: CAR_SPEC.weight },
    { label: "TRANSMISSION", value: CAR_SPEC.transmission },
  ];

  return (
    <section
      id="machine"
      className="relative w-full bg-neutral-950 text-white border-t border-white/10 overflow-hidden"
      style={{
        paddingBlock: "clamp(64px, 10vh, 120px)",
      }}
    >
      <div
        className="mx-auto w-full max-w-[1440px]"
        style={{
          paddingInline: TOKENS.paddingInline,
        }}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-white/50 mb-3">
              00 // MACHINE ARCHITECTURE
            </p>
            <h2
              className="font-sans font-medium tracking-[-0.04em] leading-[0.9] text-white"
              style={{ fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)" }}
            >
              {CAR_SPEC.model}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-mono text-xs text-[#93c5fd] uppercase tracking-wider mb-1">
              {CAR_SPEC.category}
            </p>
            <p className="text-sm md:text-base text-white/65 leading-relaxed">
              The high-downforce weapon engineered for extreme endurance and sprint limits.
              Serving as the physical testbed for all APEX aerodynamic and vehicle dynamics research.
            </p>
          </div>
        </div>

        {/* Side Profile Car Display Canvas */}
        <div className="relative w-full my-8 md:my-14 flex flex-col items-center justify-center">
          {/* Subtle ambient floor lighting */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(147,197,253,0.06)_0%,transparent_70%)]"
          />

          {/* Car Image with subtle entrance */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: TOKENS.ease }}
            className="relative w-full max-w-[1240px] z-10 select-none group"
          >
            <div className="transition-transform duration-700 ease-out group-hover:scale-[1.02]">
              <Image
                src={CAR_SPEC.image}
                alt={`${CAR_SPEC.model} Side Profile Cutout`}
                width={2169}
                height={725}
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="w-full h-auto object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)]"
                priority
              />
            </div>

            {/* Aerodynamic Ground Shadow */}
            <div
              aria-hidden="true"
              className="w-4/5 h-6 mx-auto -mt-3 md:-mt-6 rounded-full bg-black/80 blur-xl pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Technical Specs Strip */}
        <div className="w-full border-y border-white/10 my-12 md:my-16 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex flex-col pt-4 md:pt-0 ${
                  i === 0 ? "md:pl-0" : "md:px-5"
                } ${i === specs.length - 1 ? "md:pr-0" : ""}`}
              >
                <span className="font-mono text-[11px] tracking-widest text-white/45 uppercase mb-1.5">
                  {spec.label}
                </span>
                <span className="font-mono text-sm md:text-[15px] font-medium text-white tracking-tight">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Factory Drivers Lineup */}
        <div className="pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
            <div>
              <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-white/50 mb-1">
                00.1 // THE PILOTS
              </p>
              <h3 className="font-sans text-2xl md:text-3xl font-medium tracking-tight text-white">
                Factory Racing Drivers
              </h3>
            </div>
            <p className="text-xs md:text-sm text-white/55 font-mono max-w-sm">
              Commanding the cockpit across 24-hour endurance challenges and high-speed telemetry development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {FACTORY_DRIVERS.map((driver) => (
              <motion.div
                key={driver.number}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: TOKENS.ease }}
                className="relative bg-neutral-900/40 border border-white/10 p-6 md:p-8 flex flex-col justify-between hover:border-white/20 transition-colors"
              >
                <div>
                  {/* Top Header with Race Number & Badges */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs uppercase px-2 py-0.5 border border-white/15 text-white/80">
                          {driver.license}
                        </span>
                        <span className="font-mono text-xs text-white/50">
                          {driver.nationality}
                        </span>
                      </div>
                      <h4 className="font-sans text-2xl md:text-3xl font-medium tracking-tight text-white">
                        {driver.name}
                      </h4>
                      <p className="font-mono text-xs text-[#93c5fd] mt-1">
                        {driver.role}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="font-mono text-5xl md:text-6xl font-medium text-white/10 select-none tabular-nums"
                    >
                      #{driver.number}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-sm md:text-[15px] text-white/70 leading-relaxed mb-6">
                    {driver.bio}
                  </p>
                </div>

                {/* Accolades & Highlights */}
                <div className="pt-4 border-t border-white/10">
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-white/40 mb-2">
                    Key Highlights
                  </span>
                  <ul className="space-y-1.5">
                    {driver.careerHighlights.map((hl) => (
                      <li key={hl} className="font-mono text-xs text-white/60 flex items-start gap-2">
                        <span className="text-[#93c5fd]">›</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>

                  {driver.email && (
                    <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs font-mono text-white/40">Inquiries:</span>
                      <a
                        href={`mailto:${driver.email}`}
                        className="text-xs font-mono text-white/75 hover:text-[#93c5fd] underline underline-offset-4 decoration-white/20 hover:decoration-[#93c5fd] transition-colors"
                      >
                        {driver.email}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarDriverStage;
