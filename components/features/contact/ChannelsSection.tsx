// Light-band socials channel directory with typographic rows, hover opacity falloff, and Tabler icons.
"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SOCIAL_LINKS } from "@/config/socials";
import { CONTACT_CONFIG } from "@/config/contact";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { ArrowCircle } from "@/components/shared/ui/ArrowCircle";
import { TOKENS } from "@/lib/tokens";

export function ChannelsSection() {
  const shouldReduceMotion = useReducedMotion();
  const activeChannels = SOCIAL_LINKS.filter((item) => Boolean(item.href));

  if (activeChannels.length === 0) return null;

  return (
    <section
      aria-label="Social Channels Directory"
      className="relative w-full bg-neutral-50 text-neutral-950 py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-16">
        <ChapterHeader
          index="02"
          title="Find us everywhere"
          count={activeChannels.length}
          surface="light"
          lead={CONTACT_CONFIG.channelsIntro}
        />

        {/* Channels Typographic List with CSS group hover opacity falloff */}
        <div className="w-full border-t border-neutral-950/10 group/channels">
          {activeChannels.map((channel, idx) => {
            const Icon = channel.icon;
            const indexStr = String(idx + 1).padStart(2, "0");
            const staggerDelay = Math.min(idx, 8) * 0.06;

            return (
              <motion.div
                key={channel.platform}
                initial={{
                  opacity: shouldReduceMotion ? 1 : 0,
                  y: shouldReduceMotion ? 0 : 20,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{
                  duration: 0.7,
                  delay: staggerDelay,
                  ease: TOKENS.ease,
                }}
                className="w-full border-b border-neutral-950/10"
              >
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${channel.label}, opens in a new tab`}
                  className="group relative flex items-center justify-between w-full transition-[opacity,transform] duration-300 [@media(hover:hover)]:group-hover/channels:opacity-40 [@media(hover:hover)]:hover:!opacity-100 outline-none focus-visible:outline-2 focus-visible:outline-neutral-950 focus-visible:outline-offset-4 rounded"
                  style={{
                    paddingTop: "clamp(20px, 3.5vh, 40px)",
                    paddingBottom: "clamp(20px, 3.5vh, 40px)",
                  }}
                >
                  <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                    {/* Mono Index */}
                    <span className="font-mono text-sm text-neutral-950/40 shrink-0">
                      {indexStr}
                    </span>

                    {/* Platform Icon & Label */}
                    <div className="flex items-center gap-3 sm:gap-4 transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:translate-x-4">
                      {Icon && (
                        <span className="text-neutral-950 shrink-0">
                          <Icon size={24} stroke={1.75} />
                        </span>
                      )}
                      <span
                        className="font-sans font-medium tracking-[-0.03em] leading-none text-neutral-950 truncate"
                        style={{ fontSize: "clamp(2rem, 4.6vw, 4.5rem)" }}
                      >
                        {channel.label}
                      </span>
                    </div>
                  </div>

                  {/* Handle & Arrow */}
                  <div className="flex items-center gap-4 sm:gap-8 shrink-0">
                    <span className="hidden sm:inline font-mono text-[15px] text-neutral-950/55">
                      {channel.handle}
                    </span>
                    <ArrowCircle
                      size={44}
                      tone="light"
                      direction="up-right"
                    />
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
