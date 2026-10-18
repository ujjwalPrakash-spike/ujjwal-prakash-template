"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, useMotionValue, useSpring, type Variants } from "framer-motion";
import {
  IconBrandGithub,
  IconBrandX,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { MENU_CONFIG, MenuCard } from "@/lib/site/menu";
import { ImageSlot } from "@/components/shared/ui/ImageSlot";
import { TOKENS, NAV_INSET } from "@/lib/tokens";

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

function MenuContentCard({
  card,
  onNavigate,
  reduceMotion,
}: {
  card: MenuCard;
  onNavigate: () => void;
  reduceMotion: boolean;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 140, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    mouseX.set(relX * 6); // Max 6px subtle translation
    mouseY.set(relY * 6);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: reduceMotion ? 0 : springX,
        y: reduceMotion ? 0 : springY,
        borderRadius: TOKENS.radiusPortrait,
      }}
      className="group relative flex flex-col justify-between p-5 bg-white/[0.05] hover:bg-white/[0.08] transition-colors duration-300 w-full min-w-[260px] max-w-full shrink-0"
    >
      <Link
        href={card.href}
        onClick={onNavigate}
        className="flex flex-col gap-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#93c5fd] rounded-lg"
        aria-label={`${card.eyebrow}: ${card.title}`}
      >
        <div className="w-full overflow-hidden rounded-md pointer-events-none">
          <ImageSlot
            src={card.image}
            alt={card.title}
            aspectRatio={card.aspectRatio || "16:9"}
            roleLabel={card.roleLabel || card.eyebrow}
            tone="dark"
            className="w-full"
          />
        </div>

        <div className="flex items-start justify-between gap-3 pt-1">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">
              {card.eyebrow}
            </span>
            <span className="text-[14px] font-medium tracking-tight text-white group-hover:text-white transition-colors truncate">
              {card.title}
            </span>
            {card.description && (
              <p className="text-[12px] leading-relaxed text-white/60 line-clamp-2">
                {card.description}
              </p>
            )}
            {card.date && (
              <span className="text-[11px] font-mono text-white/50 tracking-wider">
                {card.date}
              </span>
            )}
          </div>

          <div className="shrink-0 p-1.5 rounded-full bg-white/5 text-white/60 group-hover:text-white group-hover:bg-white/10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
            <IconArrowUpRight size={16} stroke={1.5} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FullscreenMenu({
  isOpen,
  onClose,
  triggerRef,
}: FullscreenMenuProps) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const reduceMotion = Boolean(prefersReduced);
  const containerRef = React.useRef<HTMLDivElement>(null);

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

  // Lock body scroll while open
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

  const EASE_CUBIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // Animation variants
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
        delay: reduceMotion ? 0 : 0.15 + custom * 0.07,
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
        delay: reduceMotion ? 0 : 0.35 + custom * 0.06,
        ease: EASE_CUBIC,
      },
    }),
  };

  const activeCards = MENU_CONFIG.cards.filter((c) => Boolean(c.title));
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
      className="fixed inset-0 z-[100] w-full h-[100svh] bg-neutral-950 text-white overflow-y-auto overflow-x-hidden selection:bg-[#93c5fd] selection:text-neutral-950"
    >
      <div
        style={{
          paddingLeft: NAV_INSET,
          paddingRight: NAV_INSET,
        }}
        className="w-full max-w-[1920px] mx-auto min-h-full flex flex-col justify-between pt-24 pb-8 lg:pt-28 lg:pb-12"
      >
        {/* Main 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 w-full my-auto">
          {/* Left Column (Cols 1-4 on Desktop): Brand Tagline + Content Cards */}
          <div className="order-2 lg:order-1 lg:col-span-4 flex flex-col justify-between gap-8">
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/40 leading-relaxed max-w-[340px]"
            >
              {MENU_CONFIG.tagline}
            </motion.div>

            {activeCards.length > 0 && (
              <motion.div
                custom={1}
                variants={fadeUpVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col gap-4"
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 hidden lg:block">
                  CURATED DISPATCHES
                </div>
                {/* Horizontal Snap on Mobile, Stacked on Desktop */}
                <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 lg:pb-0">
                  {activeCards.map((card, i) => (
                    <MenuContentCard
                      key={i}
                      card={card}
                      onNavigate={onClose}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column (Cols 6-12 on Desktop): Huge Editorial Links */}
          <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6 flex flex-col justify-center">
            <nav
              aria-label="Primary"
              className="group/links flex flex-col gap-2 lg:gap-3"
            >
              {MENU_CONFIG.links.map((link, idx) => {
                const isActive = pathname === link.href;

                return (
                  <div key={link.href} className="overflow-hidden">
                    <motion.div
                      custom={idx}
                      variants={linkMaskVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      {link.soon ? (
                        <div className="group/item inline-flex items-baseline gap-3 text-white/30 select-none py-1">
                          <span className="text-[13px] font-mono text-white/30 tracking-widest">
                            {link.index}
                          </span>
                          <span className="text-[clamp(2.75rem,8vw,7.5rem)] font-medium tracking-[-0.04em] leading-[0.95] text-white/25">
                            {link.label}
                          </span>
                          <span className="text-[10px] font-mono tracking-widest text-[#93c5fd]/70 px-2 py-0.5 rounded border border-[#93c5fd]/30 uppercase ml-2">
                            SOON
                          </span>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={`group/item inline-flex items-baseline gap-3 py-1 outline-none transition-all duration-300 group-hover/links:opacity-35 hover:!opacity-100 focus-visible:!opacity-100 ${
                            reduceMotion
                              ? ""
                              : "hover:translate-x-4 focus-visible:translate-x-4"
                          }`}
                        >
                          <span className="text-[13px] font-mono text-white/40 tracking-widest group-hover/item:text-white/70 transition-colors">
                            {link.index}
                          </span>
                          <span className="relative text-[clamp(2.75rem,8vw,7.5rem)] font-medium tracking-[-0.04em] leading-[0.95] text-white">
                            {link.label}
                            {isActive && (
                              <span
                                aria-hidden="true"
                                className="absolute left-0 -bottom-1 w-full h-[1px] bg-[#93c5fd]"
                              />
                            )}
                          </span>
                        </Link>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            {/* Secondary Text Links */}
            {MENU_CONFIG.secondaryLinks.length > 0 && (
              <motion.div
                custom={MENU_CONFIG.links.length}
                variants={fadeUpVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-wrap items-center gap-x-8 gap-y-2 pt-8 mt-6 border-t border-white/10"
              >
                {MENU_CONFIG.secondaryLinks.map((sec, i) => (
                  <Link
                    key={i}
                    href={sec.href}
                    onClick={onClose}
                    className="text-[15px] text-white/60 hover:text-white transition-colors duration-200 outline-none focus-visible:text-[#93c5fd]"
                  >
                    {sec.label}
                  </Link>
                ))}
              </motion.div>
            )}

            {/* Social Links Row */}
            {activeSocials.length > 0 && (
              <motion.div
                custom={MENU_CONFIG.links.length + 1}
                variants={fadeUpVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex items-center gap-3 pt-6"
              >
                {activeSocials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.1] transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-[#93c5fd]"
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default FullscreenMenu;
