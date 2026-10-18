// Signature dark hover-preview product index driven by FocusList and IntersectionObserver.
"use client";

import React, { useState } from "react";
import type { Product } from "@/lib/merch/types";
import { formatMerchPrice } from "@/lib/merch/data";
import { FocusList } from "@/components/shared/ui/FocusList";
import { ImageSlot } from "@/components/shared/ui/ImageSlot";
import { Section } from "@/components/shared/layout/Section";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { EmptyResults } from "@/components/directory/EmptyResults";

interface MerchProductIndexProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onClearFilters?: () => void;
}

export function MerchProductIndex({
  products,
  onSelectProduct,
  onClearFilters,
}: MerchProductIndexProps) {
  const [slowDwell, setSlowDwell] = useState(false);

  return (
    <Section id="catalogue" surface="dark" className="overflow-visible">
      <ChapterHeader
        index="01"
        title="Catalogue & Roster"
        count={`${products.length} objects`}
        tone="dark"
        lead="Technical outerwear, trackside carry systems, and numbered objects. Select any instrument for complete engineering dossier."
      />

      {products.length === 0 ? (
        <EmptyResults
          message="No catalogue objects matching your criteria."
          onClear={onClearFilters}
        />
      ) : (
        <FocusList<Product>
          items={products}
          getKey={(p) => p.id}
          panelPosition="right"
          panelSpan="lg:col-span-6"
          rowsSpan="lg:col-span-6"
          stickyTop="top-[144px]"
          className="w-full"
          renderPanel={(activeProduct) => {
            return (
              <div
                className="w-full flex flex-col space-y-4"
                onMouseEnter={() => setSlowDwell(true)}
                onMouseLeave={() => setSlowDwell(false)}
              >
                <div className="w-full transition-opacity duration-250 ease-out">
                  <ImageSlot
                    src={slowDwell && activeProduct.hoverImage ? activeProduct.hoverImage : activeProduct.image}
                    hoverSrc={activeProduct.hoverImage}
                    alt={activeProduct.name}
                    aspectRatio="4:5"
                    roleLabel={activeProduct.name}
                    priority
                    className="shadow-2xl"
                  />
                </div>
                <div className="flex justify-between items-baseline font-mono text-xs pt-2 border-t border-white/10">
                  <span className="text-[#93c5fd] uppercase tracking-widest">
                    {activeProduct.category} {"//"} {activeProduct.badge || "CORE SPEC"}
                  </span>
                  <span className="text-white font-medium">
                    {activeProduct.available
                      ? formatMerchPrice(activeProduct.price)
                      : "ARCHIVE ONLY"}
                  </span>
                </div>
              </div>
            );
          }}
          renderRow={(product, idx, isActive) => {
            const isSoldOut = !product.available;

            return (
              <button
                type="button"
                onClick={() => onSelectProduct(product)}
                className={`w-full text-left py-[clamp(20px,3.5vh,36px)] border-b border-white/10 flex items-center justify-between group outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] cursor-pointer ${
                  isSoldOut ? "cursor-default" : ""
                }`}
              >
                <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0 pr-4">
                  {/* Mobile-only 72px square thumbnail */}
                  <div className="lg:hidden w-[72px] h-[72px] shrink-0">
                    <ImageSlot
                      src={product.image}
                      alt={product.name}
                      aspectRatio="1:1"
                      roleLabel="Thumb"
                    />
                  </div>

                  {/* Mono index */}
                  <span className="font-mono text-xs sm:text-sm text-white/40 shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Name with hover right-shift */}
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`font-sans font-medium tracking-[-0.03em] leading-none transition-transform duration-300 truncate ${
                        isSoldOut
                          ? "text-white/40"
                          : "text-white group-hover:translate-x-3"
                      }`}
                      style={{ fontSize: "clamp(1.75rem, 3.6vw, 3.5rem)" }}
                    >
                      {product.name}
                    </span>

                    {product.badge && (
                      <span className="inline-block mt-2 font-mono text-[11px] uppercase tracking-wider text-white/60 border-b border-[#93c5fd] w-fit">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Price or Sold Out */}
                <div className="font-mono text-sm sm:text-base text-right shrink-0">
                  {isSoldOut ? (
                    <span className="text-white/40 uppercase tracking-wider text-xs">
                      Sold out
                    </span>
                  ) : (
                    <span
                      className={`transition-colors ${
                        isActive ? "text-white font-semibold" : "text-white/60"
                      }`}
                    >
                      {formatMerchPrice(product.price)}
                    </span>
                  )}
                </div>
              </button>
            );
          }}
        />
      )}
    </Section>
  );
}

export default MerchProductIndex;
