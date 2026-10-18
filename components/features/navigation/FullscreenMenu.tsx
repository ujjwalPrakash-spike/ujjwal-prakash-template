"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { MENU_CONFIG, MenuLink } from "@/lib/site/menu";
import { NAV_INSET } from "@/lib/tokens";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "github":
      return <IconBrandGithub size={20} stroke={1.5} />;
    case "x":
      return <IconBrandX size={20} stroke={1.5} />;
    case "instagram":
      return <IconBrandInstagram size={20} stroke={1.5} />;
    case "linkedin":
      return <IconBrandLinkedin size={20} stroke={1.5} />;
    default:
      return null;
  }
}

const EASE_CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function FullscreenMenu({
  isOpen,
  onClose,
  triggerRef,
}: FullscreenMenuProps) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const reduceMotion = Boolean(prefersReduced);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Active preview state: follows hovered or focused link, falls back to default
  const [activeItem, setActiveItem] = React.useState<MenuLink | null>(null);

  const activePreview = {
    image: activeItem?.image ?? MENU_CONFIG.defaultPreview.image,
    caption: activeItem?.caption ?? MENU_CONFIG.defaultPreview.caption,
    index: activeItem?.index ?? MENU_CONFIG.defaultPreview.index,
  };

  // Focus trap & Escape key
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll while open; restore focus to trigger button
  React.useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    const triggerEl = triggerRef?.current;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      if (triggerEl) {
        triggerEl.focus();
      }
    };
  }, [isOpen, triggerRef]);

  // Motion variants
  const panelVariants: Variants = {
    closed: {
      clipPath: reduceMotion ? "none" : "inset(0% 0% 100% 0%)",
      opacity: reduceMotion ? 0 : 1,
      transition: {
        duration: reduceMotion ? 0.2 : 0.5,
        ease: EASE_CUBIC,
      },
    },
    open: {
      clipPath: reduceMotion ? "none" : "inset(0% 0% 0% 0%)",
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0.2 : 0.7,
        ease: EASE_CUBIC,
      },
    },
  };

  const linkMaskVariants: Variants = {
    closed: {
      y: reduceMotion ? 0 : "100%",
      opacity: reduceMotion ? 0 : 1,
    },
    open: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0.2 : 0.8,
        delay: reduceMotion ? 0 : 0.12 + custom * 0.07,
        ease: EASE_CUBIC,
      },
    }),
  };

  const fadeUpVariants: Variants = {
    closed: {
      opacity: 0,
      y: reduceMotion ? 0 : 16,
    },
    open: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.2 : 0.6,
        delay: reduceMotion ? 0 : 0.35 + custom * 0.08,
        ease: EASE_CUBIC,
      },
    }),
  };

  const activeSocials = MENU_CONFIG.socials.filter((s) => Boolean(s.href));

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Overlay"
      variants={panelVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className="fixed inset-0 z-[100] w-full h-[100svh] bg-neutral-950 text-white grid grid-rows-[64px_1fr_auto] overflow-hidden lg:overflow-hidden max-lg:overflow-y-auto max-h-[100svh] [overscroll-behavior:contain] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden selection:bg-[#93c5fd] selection:text-neutral-950"
    >
      {/* Row 1: 64px Spacer aligned with Bar Navbar */}
      <div className="w-full h-16 shrink-0 pointer-events-none" aria-hidden="true" />

      {/* Row 2: Main Area (Height-aware, 12-columns, vertically centered) */}
      <main
        style={{
          paddingLeft: NAV_INSET,
          paddingRight: NAV_INSET,
        }}
        className="w-full max-w-[1920px] mx-auto min-h-0 h-full flex flex-col justify-center py-4 lg:py-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full max-h-full min-h-0">
          {/* Cols 1-5: Preview Panel (>=1024px and height >= 600px only) */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="hidden lg:flex flex-col justify-center h-full max-h-full min-h-0 col-span-5 max-w-[420px]"
          >
            <div className="relative w-full aspect-[4/5] max-h-[calc(100svh-220px)] rounded-[12px] overflow-hidden bg-white/[0.05]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePreview.index}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_CUBIC }}
                  className="absolute inset-0 w-full h-full"
                >
                  {activePreview.image ? (
                    <Image
                      src={activePreview.image}
                      alt={activePreview.caption}
                      fill
                      sizes="(max-width: 1200px) 380px, 420px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/[0.05]" />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Preview Caption + Mono Index */}
            <div className="flex items-center justify-between pt-3 text-[15px] text-white/70">
              <span className="truncate pr-4">{activePreview.caption}</span>
              <span className="font-mono text-xs text-white/40 shrink-0">
                [{activePreview.index}]
              </span>
            </div>
          </motion.div>

          {/* Cols 7-12: The Stacked Links */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col justify-center h-full">
            <nav
              aria-label="Primary Navigation"
              className="flex flex-col gap-0 select-none [&:has(a:hover,a:focus-visible)_a]:opacity-35 [&:has(a:hover,a:focus-visible)_a:hover]:!opacity-100 [&:has(a:hover,a:focus-visible)_a:focus-visible]:!opacity-100 [@media(hover:none)]:!opacity-100"
            >
              {MENU_CONFIG.links.map((link, idx) => {
                const isActive = pathname === link.href;

                return (
                  <div key={link.href} className="relative py-0 leading-none">
                    {link.soon ? (
                      /* "Soon" Link: non-interactive, white/30, plain 13px label at top-right */
                      <div
                        aria-disabled="true"
                        className="inline-grid grid-cols-[auto_1fr_auto] items-start gap-3 py-1 text-white/30 select-none cursor-default"
                      >
                        <span className="font-mono text-[13px] text-white/20 pt-2 lg:pt-3 leading-none">
                          {link.index}
                        </span>
                        <span className="text-[clamp(2.5rem,min(8vw,11.5vh),8rem)] font-medium tracking-[-0.04em] leading-[1] text-white/30">
                          {link.label}
                        </span>
                        <span className="text-[13px] text-white/45 pl-2 pt-2 lg:pt-3 leading-none self-start">
                          Soon
                        </span>
                      </div>
                    ) : (
                      /* Active Navigation Link */
                      <Link
                        href={link.href}
                        onClick={onClose}
                        onMouseEnter={() => setActiveItem(link)}
                        onMouseLeave={() => setActiveItem(null)}
                        onFocus={() => setActiveItem(link)}
                        onBlur={() => setActiveItem(null)}
                        className={`inline-grid grid-cols-[auto_1fr] items-start gap-3 py-1 outline-none text-white transition-[opacity,transform] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-4 rounded-sm ${
                          reduceMotion
                            ? ""
                            : "hover:translate-x-4 focus-visible:translate-x-4 [@media(hover:none)]:!translate-x-0"
                        }`}
                      >
                        <span className="font-mono text-[13px] text-white/40 pt-2 lg:pt-3 leading-none">
                          {link.index}
                        </span>

                        {/* Link Word with Mask Reveal */}
                        <div className="relative overflow-hidden leading-[1]">
                          <motion.span
                            custom={idx}
                            variants={linkMaskVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="block text-[clamp(2.5rem,min(8vw,11.5vh),8rem)] font-medium tracking-[-0.04em] leading-[1] text-white"
                          >
                            {link.label}
                          </motion.span>

                          {/* Current Route Underline: 1px #93c5fd, 6px below baseline, grows from left */}
                          {isActive && (
                            <motion.span
                              aria-hidden="true"
                              initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{
                                duration: reduceMotion ? 0 : 0.5,
                                delay: reduceMotion ? 0 : 0.35,
                                ease: EASE_CUBIC,
                              }}
                              style={{ originX: 0 }}
                              className="absolute left-0 bottom-0 w-full h-[1px] bg-[#93c5fd]"
                            />
                          )}
                        </div>
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </main>

      {/* Row 3: Footer (Pinned to bottom, auto height, 1px white/10 top line) */}
      <footer
        style={{
          paddingLeft: NAV_INSET,
          paddingRight: NAV_INSET,
        }}
        className="w-full shrink-0 border-t border-white/10 bg-neutral-950/80 backdrop-blur-md"
      >
        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 py-4 lg:py-4"
        >
          {/* Left: Tabler Social Icons (20px, white/60, 44px hit area) */}
          <div className="flex items-center gap-2">
            {activeSocials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-11 h-11 flex items-center justify-center rounded-full text-white/60 hover:text-white transition-colors duration-200 outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2"
              >
                <SocialIcon platform={social.platform} />
              </a>
            ))}
          </div>

          {/* Center: Secondary Text Links (15px white/60, hover white) */}
          {MENU_CONFIG.secondaryLinks.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {MENU_CONFIG.secondaryLinks.map((sec, i) => (
                <Link
                  key={i}
                  href={sec.href}
                  onClick={onClose}
                  className="text-[15px] text-white/60 hover:text-white transition-colors duration-200 outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2"
                >
                  {sec.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right: Brand Tagline (13px sentence-case text, white/45) */}
          <div className="text-[13px] text-white/45 text-center md:text-right font-normal">
            {MENU_CONFIG.tagline}
          </div>
        </motion.div>
      </footer>
    </motion.div>
  );
}

export default FullscreenMenu;
