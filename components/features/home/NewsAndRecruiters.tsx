"use client";

import { motion, useReducedMotion } from "framer-motion";
import { NewsSection } from "./NewsSection";
import { RecruiterMarquee } from "./RecruiterMarquee";

export function NewsAndRecruiters() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label="News and Past Recruiters"
      className="w-full bg-neutral-50 text-neutral-950"
      style={{
        paddingTop: "clamp(72px, 11vh, 128px)",
        paddingBottom:
          "calc(clamp(96px, 14vh, 160px) + clamp(24px, 3.5vw, 36px))",
      }}
    >
      <div
        className="mx-auto max-w-[1440px]"
        style={{ paddingInline: "clamp(24px, 6vw, 96px)" }}
      >
        <NewsSection />

        <div className="my-[clamp(72px,11vh,128px)]">
          <motion.div
            initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-[1px] w-full bg-neutral-950/10"
          />
        </div>

        <RecruiterMarquee />
      </div>
    </section>
  );
}

export default NewsAndRecruiters;
