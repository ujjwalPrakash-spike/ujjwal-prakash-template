"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export function HeroContent() {
  const shouldReduceMotion = useReducedMotion();
  const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const eyebrowVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.35 : 0.5,
        delay: shouldReduceMotion ? 0.05 : 0.1,
        ease: cinematicEase,
      },
    },
  };

  const line1Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.35 : 0.65,
        delay: shouldReduceMotion ? 0.1 : 0.22,
        ease: cinematicEase,
      },
    },
  };

  const line2Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.35 : 0.65,
        delay: shouldReduceMotion ? 0.15 : 0.31,
        ease: cinematicEase,
      },
    },
  };

  const subcopyVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.35 : 0.55,
        delay: shouldReduceMotion ? 0.2 : 0.48,
        ease: cinematicEase,
      },
    },
  };

  const ctaVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.35 : 0.55,
        delay: shouldReduceMotion ? 0.25 : 0.62,
        ease: cinematicEase,
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left gap-[clamp(10px,2vh,24px)] [@media(max-height:640px)]:gap-2.5">
      {/* Eyebrow */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={eyebrowVariants}
        className="inline-flex items-center gap-2 max-w-full [@media(max-height:520px)]:hidden"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#93c5fd] shrink-0" />
        <span
          className="font-mono font-semibold tracking-[0.14em] text-white/85 uppercase truncate sm:whitespace-normal"
          style={{ fontSize: "clamp(10px, 1.1vw, 12px)" }}
        >
          STUDENTS&apos; PLACEMENT OFFICE · IIT KANPUR · 2026–27
        </span>
      </motion.div>

      {/* Two-line Headline */}
      <h1
        className="text-white font-semibold tracking-[-0.02em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, min(4.6vw, 8vh), 4.75rem)" }}
      >
        <div className="overflow-hidden">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={line1Variants}
            className="block lg:whitespace-nowrap"
          >
            Where India&apos;s sharpest minds
          </motion.span>
        </div>
        <div className="overflow-hidden">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={line2Variants}
            className="block lg:whitespace-nowrap"
          >
            meet their next move.
          </motion.span>
        </div>
      </h1>

      {/* Subcopy */}
      <motion.p
        initial="hidden"
        animate="visible"
        variants={subcopyVariants}
        className="text-white/75 font-normal leading-relaxed max-w-[46ch] [@media(max-height:640px)]:hidden"
        style={{ fontSize: "clamp(14px, min(1.15vw, 2.2vh), 18px)" }}
      >
        Recruit from one of India&apos;s most selective engineering campuses. One portal, one process, end to end.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={ctaVariants}
        className="flex flex-col min-[480px]:flex-row items-stretch min-[480px]:items-center gap-3 w-full min-[480px]:w-auto"
      >
        <Link
          href="/recruiters/why-iitk"
          className="h-[clamp(40px,5.5vh,48px)] px-6 rounded-md bg-white text-black font-semibold text-sm inline-flex items-center justify-center hover:bg-neutral-200 transition-colors shadow-sm active:scale-95"
        >
          Recruit with us
        </Link>
        <Link
          href="https://placement.iitk.ac.in/login"
          target="_blank"
          rel="noopener noreferrer"
          className="h-[clamp(40px,5.5vh,48px)] px-6 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm inline-flex items-center justify-center hover:bg-white/20 transition-colors active:scale-95"
        >
          Student login
        </Link>
      </motion.div>
    </div>
  );
}

export default HeroContent;
