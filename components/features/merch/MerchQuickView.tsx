// Right-side Quick View drawer with variant selectors, accordion details, and arrow navigation.
"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconX, IconArrowLeft, IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import type { Product } from "@/lib/merch/types";
import { formatMerchPrice } from "@/lib/merch/data";
import { ImageSlot } from "@/components/shared/ui/ImageSlot";
import { Accordion, type AccordionItem } from "@/components/shared/ui/Accordion";
import { TOKENS } from "@/lib/tokens";

interface MerchQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function MerchQuickView({
  product,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: MerchQuickViewProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [colorOverride, setColorOverride] = useState<{ id: string; val: string }>({ id: "", val: "" });
  const [sizeOverride, setSizeOverride] = useState<{ id: string; val: string }>({ id: "", val: "" });

  const selectedColor = product && colorOverride.id === product.id ? colorOverride.val : product?.colors?.[0]?.name || "";
  const selectedSize = product && sizeOverride.id === product.id ? sizeOverride.val : product?.sizes?.[0] || "";

  // Keyboard navigation: Escape to close, ArrowLeft / ArrowRight to cycle
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight" && onNext) {
        e.preventDefault();
        onNext();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !product) return null;

  const accordionItems: AccordionItem[] = [
    {
      id: "details",
      title: "Technical Construction",
      content: (
        <ul className="space-y-1.5 list-disc list-inside text-sm text-white/70">
          {product.details.map((d, idx) => (
            <li key={idx}>{d}</li>
          ))}
        </ul>
      ),
    },
    ...(product.specs && product.specs.length > 0
      ? [
          {
            id: "specs",
            title: "Material Matrix",
            content: (
              <div className="border border-white/10 divide-y divide-white/10 font-mono text-xs my-2">
                {product.specs.map((s, idx) => (
                  <div key={idx} className="flex justify-between py-2 px-3">
                    <span className="text-white/40 uppercase">{s.label}</span>
                    <span className="text-white">{s.value}</span>
                  </div>
                ))}
              </div>
            ),
          },
        ]
      : []),
    {
      id: "shipping",
      title: "Logistics & Allocation",
      content: (
        <p className="text-sm text-white/70 leading-relaxed">
          {product.shipping ||
            "Dispatched from the central European logistics hub. Complimentary insured tracking on orders over $250."}
        </p>
      ),
    },
    {
      id: "care",
      title: "Maintenance Protocol",
      content: (
        <p className="text-sm text-white/70 leading-relaxed">
          {product.care ||
            "Wipe clean with a damp microfiber cloth. Avoid solvent exposure on technical membranes."}
        </p>
      ),
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} Details`}
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-xl h-full bg-neutral-950 text-white border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto outline-none"
      >
        {/* Header Bar with Next/Prev and Close */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 sticky top-0 bg-neutral-950 z-20">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              disabled={!onPrev}
              aria-label="Previous product"
              className="p-2 text-white/60 hover:text-white disabled:opacity-20 transition-colors rounded-full"
            >
              <IconArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={!onNext}
              aria-label="Next product"
              className="p-2 text-white/60 hover:text-white disabled:opacity-20 transition-colors rounded-full"
            >
              <IconArrowRight size={18} />
            </button>
          </div>

          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            QUICK VIEW {product.slug}
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="p-2 text-white/60 hover:text-white transition-colors rounded-full focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* Main Visual */}
          <div className="w-full">
            <ImageSlot
              src={product.image}
              hoverSrc={product.hoverImage}
              alt={product.name}
              aspectRatio="4:5"
              roleLabel={product.name}
              priority
            />
          </div>

          {/* Title & Metadata */}
          <div className="space-y-3 pb-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#93c5fd]">
                {product.category}
              </span>
              {product.badge && (
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/60 border-b border-[#93c5fd]">
                  {product.badge}
                </span>
              )}
            </div>

            <h2
              className="font-sans font-medium tracking-tight text-white leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
            >
              {product.name}
            </h2>

            <div className="font-mono text-lg text-white">
              {formatMerchPrice(product.price)}
            </div>

            <p className="text-white/70 text-sm leading-relaxed font-sans pt-1">
              {product.description}
            </p>
          </div>

          {/* Colors Radiogroup */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider">
                <span className="text-white/50">Selected Color</span>
                <span className="text-white font-medium">{selectedColor}</span>
              </div>
              <div role="radiogroup" aria-label="Available colors" className="flex items-center gap-3">
                {product.colors.map((c) => {
                  const isChecked = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      role="radio"
                      aria-checked={isChecked}
                      aria-label={c.name}
                      onClick={() => setColorOverride({ id: product.id, val: c.name })}
                      className={`relative w-8 h-8 rounded-full border transition-all flex items-center justify-center ${
                        isChecked ? "border-[#93c5fd] scale-110" : "border-transparent hover:border-white/30"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-white/20"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sizes Radiogroup */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-white/50 block">
                Dimension / Size
              </span>
              <div role="radiogroup" aria-label="Available sizes" className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const isChecked = selectedSize === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={isChecked}
                      onClick={() => setSizeOverride({ id: product.id, val: s })}
                      className={`min-w-[44px] h-11 px-3 text-xs font-mono uppercase tracking-wider rounded border transition-all ${
                        isChecked
                          ? "bg-white text-neutral-950 font-bold border-white"
                          : "border-white/15 text-white/70 hover:border-white/40"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Accordion Details */}
          <div className="pt-2">
            <Accordion items={accordionItems} defaultOpenId="details" tone="dark" />
          </div>
        </div>

        {/* Footer Action: Primary Buy Link */}
        <div className="p-6 border-t border-white/10 sticky bottom-0 bg-neutral-950 z-20">
          {product.available && product.href ? (
            <a
              href={product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 bg-white text-neutral-950 hover:bg-neutral-200 active:scale-[0.99] transition-all font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 rounded"
              style={{ borderRadius: TOKENS.radiusPortrait }}
            >
              <span>Acquire Object — {formatMerchPrice(product.price)}</span>
              <IconArrowUpRight size={16} />
            </a>
          ) : (
            <div className="w-full h-12 bg-white/10 text-white/40 font-mono text-xs uppercase tracking-widest flex items-center justify-center rounded cursor-not-allowed">
              Sold Out
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MerchQuickView;
