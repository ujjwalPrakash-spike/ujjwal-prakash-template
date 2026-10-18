"use client";

// Reusable animation wrappers honoring user motion preferences.

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TOKENS } from "@/lib/tokens";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealLine({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{
        duration: TOKENS.durationLine,
        ease: TOKENS.ease,
      }}
      style={{ transformOrigin: "left" }}
      className={`h-[1px] w-full ${
        tone === "dark" ? "bg-white/10" : "bg-neutral-950/10"
      } ${className}`}
      aria-hidden="true"
    />
  );
}

export function RevealText({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
        y: shouldReduceMotion ? 0 : 20,
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : TOKENS.durationText,
        delay,
        ease: TOKENS.ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealTitleLine({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{
          opacity: shouldReduceMotion ? 1 : 0,
          y: shouldReduceMotion ? 0 : "100%",
        }}
        whileInView={{ opacity: 1, y: "0%" }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{
          duration: shouldReduceMotion ? 0.35 : TOKENS.durationText,
          delay,
          ease: TOKENS.ease,
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function RevealImage({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
        scale: shouldReduceMotion ? 1 : 1.08,
      }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{
        duration: shouldReduceMotion ? 0.4 : TOKENS.durationImage,
        delay,
        ease: TOKENS.ease,
      }}
      className={`overflow-hidden ${className}`}
      style={{ borderRadius: TOKENS.radiusImage }}
    >
      {children}
    </motion.div>
  );
}

export function RevealList({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
