// Featured focal section on light surface with subtle scroll parallax and clip-path reveal.
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { IconArrowUpRight } from "@tabler/icons-react";
import type { Product } from "@/lib/merch/types";
import { formatMerchPrice } from "@/lib/merch/data";
import { Section } from "@/components/shared/layout/Section";
import { ImageSlot } from "@/components/shared/ui/ImageSlot";
import { TOKENS } from "@/lib/tokens";

interface MerchFeaturedProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
}

export function MerchFeatured({ product, onOpenQuickView }: MerchFeaturedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // The only parallax on the page: translates -4% to 4% across scroll range (transform only)
  const translateY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <Section id="featured" surface="light">
      <div
        ref={containerRef}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end"
      >
        {/* Cols 1-7: Huge ImageSlot with clip-path reveal and scroll parallax */}
        <div className="lg:col-span-7 overflow-hidden">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { clipPath: "inset(12% 0% 12% 0%)" }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 1.1, ease: TOKENS.ease }}
            className="w-full overflow-hidden"
          >
            <motion.div
              style={shouldReduceMotion ? {} : { y: translateY }}
              className="w-full will-change-transform"
            >
              <ImageSlot
                src={product.image}
                hoverSrc={product.hoverImage}
                alt={product.name}
                aspectRatio="4:5"
                roleLabel={`Featured // ${product.name}`}
                tone="light"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Cols 8-12: Bottom-aligned text, price, and actions */}
        <div className="lg:col-span-5 flex flex-col justify-end space-y-6 lg:pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500 block mb-3">
              FEATURED ALLOCATION
            </span>
            <h2
              className="font-sans font-medium tracking-tight text-neutral-950 leading-[0.95]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
            >
              {product.name}
            </h2>
            <div className="mt-4 font-mono text-xl text-neutral-950 font-semibold">
              {formatMerchPrice(product.price)}
            </div>
          </div>

          <p className="text-neutral-700 text-base sm:text-lg leading-relaxed font-sans max-w-[54ch]">
            {product.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            {product.available && product.href ? (
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-6 bg-neutral-950 text-white hover:bg-neutral-800 transition-colors font-mono text-xs uppercase tracking-widest font-medium inline-flex items-center justify-center gap-2 rounded"
                style={{ borderRadius: TOKENS.radiusPortrait }}
              >
                <span>Acquire Instrument</span>
                <IconArrowUpRight size={15} />
              </a>
            ) : null}

            <button
              type="button"
              onClick={() => onOpenQuickView(product)}
              className="h-12 px-6 border border-neutral-950/20 text-neutral-950 hover:border-neutral-950 transition-colors font-mono text-xs uppercase tracking-widest inline-flex items-center justify-center rounded cursor-pointer"
              style={{ borderRadius: TOKENS.radiusPortrait }}
            >
              View Full Specs
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default MerchFeatured;
