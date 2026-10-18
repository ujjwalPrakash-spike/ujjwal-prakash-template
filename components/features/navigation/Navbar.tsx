"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuDescription,
} from "@/components/ui/NavigationMenu";
import { LogoBadge } from "@/components/ui/LogoBadge";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  IconMenu2,
  IconX,
  IconArrowUpRight,
  IconLogin,
  IconChevronDown,
} from "@tabler/icons-react";
import { NAV_INSET } from "@/lib/tokens";
import { NAV_SECTIONS } from "@/lib/site/navigation";
import { useScrolled } from "@/hooks/useScrolled";

export interface NavbarProps {
  tone?: "light" | "dark";
  variant?: "default" | "bar";
  stickyScrolled?: boolean;
}

type NavVariant = "default" | "bar";
type NavTone = "light" | "dark";

interface VariantConfig {
  headerWrapper: (isScrolled: boolean, stickyScrolled: boolean) => string;
  gridOrFlex: string;
  logoSize: (isScrolled: boolean) => "default" | "hero" | "bar" | "bar-scrolled";
  showWordmark: boolean;
  pillOrInline: string;
  triggerClass: string;
  dropdownContentClass: string;
  dropdownTone: "light" | "dark";
  loginButtonClass: string;
  loginText: { desktop: string; mobile: string };
  mobileButtonClass: string;
  mobileDrawerClass: string;
  mobileItemClass: string;
  mobileSectionClass: string;
  mobileCTAClass: string;
}

const VARIANT_CONFIG: Record<NavVariant, Record<NavTone, VariantConfig>> = {
  bar: {
    dark: {
      headerWrapper: (isScrolled) =>
        `fixed top-0 left-0 right-0 w-full z-50 transition-all duration-250 ease-out ${
          isScrolled
            ? "h-14 bg-neutral-950 border-b border-white/10"
            : "h-16 bg-transparent border-b border-transparent"
        }`,
      gridOrFlex:
        "hidden lg:grid grid-cols-[1fr_auto_1fr] items-center w-full max-w-[1920px] mx-auto h-full",
      logoSize: (isScrolled) => (isScrolled ? "bar-scrolled" : "bar"),
      showWordmark: true,
      pillOrInline: "flex items-center gap-1 bg-transparent border-0 p-0 shadow-none",
      triggerClass:
        "group relative inline-flex items-center gap-1.5 px-3 py-2 text-[14px] font-medium text-white/75 hover:text-white transition-colors duration-200 outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2 rounded-md cursor-pointer data-[popup-open]:text-white bg-transparent hover:bg-transparent",
      dropdownContentClass:
        "rounded-2xl border border-white/10 bg-neutral-950/90 p-3 backdrop-blur-2xl text-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)]",
      dropdownTone: "dark",
      loginButtonClass:
        "inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-medium text-neutral-950 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2 shrink-0 select-none",
      loginText: { desktop: "Portal Login", mobile: "Login" },
      mobileButtonClass:
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-transparent text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2 shrink-0",
      mobileDrawerClass:
        "fixed inset-x-3 top-16 z-50 max-h-[80svh] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950/95 p-5 backdrop-blur-2xl shadow-2xl lg:hidden flex flex-col gap-4 text-white",
      mobileItemClass:
        "min-h-[44px] flex items-center justify-between py-2 px-1 text-[13px] text-white/70 hover:text-white transition-colors rounded-lg",
      mobileSectionClass: "border-b border-white/10 pb-3",
      mobileCTAClass:
        "min-h-[44px] flex w-full items-center justify-center gap-2 rounded-full bg-white hover:bg-neutral-200 py-3 text-center text-xs font-semibold uppercase tracking-wider text-neutral-950 transition-colors",
    },
    light: {
      headerWrapper: (isScrolled) =>
        `fixed top-0 left-0 right-0 w-full z-50 transition-all duration-250 ease-out ${
          isScrolled
            ? "h-14 bg-neutral-950 border-b border-white/10"
            : "h-16 bg-transparent border-b border-transparent"
        }`,
      gridOrFlex:
        "hidden lg:grid grid-cols-[1fr_auto_1fr] items-center w-full max-w-[1920px] mx-auto h-full",
      logoSize: (isScrolled) => (isScrolled ? "bar-scrolled" : "bar"),
      showWordmark: true,
      pillOrInline: "flex items-center gap-1 bg-transparent border-0 p-0 shadow-none",
      triggerClass:
        "group relative inline-flex items-center gap-1.5 px-3 py-2 text-[14px] font-medium text-white/75 hover:text-white transition-colors duration-200 outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2 rounded-md cursor-pointer data-[popup-open]:text-white bg-transparent hover:bg-transparent",
      dropdownContentClass:
        "rounded-2xl border border-white/10 bg-neutral-950/90 p-3 backdrop-blur-2xl text-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)]",
      dropdownTone: "dark",
      loginButtonClass:
        "inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-medium text-neutral-950 transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2 shrink-0 select-none",
      loginText: { desktop: "Portal Login", mobile: "Login" },
      mobileButtonClass:
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-transparent text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2 shrink-0",
      mobileDrawerClass:
        "fixed inset-x-3 top-16 z-50 max-h-[80svh] overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950/95 p-5 backdrop-blur-2xl shadow-2xl lg:hidden flex flex-col gap-4 text-white",
      mobileItemClass:
        "min-h-[44px] flex items-center justify-between py-2 px-1 text-[13px] text-white/70 hover:text-white transition-colors rounded-lg",
      mobileSectionClass: "border-b border-white/10 pb-3",
      mobileCTAClass:
        "min-h-[44px] flex w-full items-center justify-center gap-2 rounded-full bg-white hover:bg-neutral-200 py-3 text-center text-xs font-semibold uppercase tracking-wider text-neutral-950 transition-colors",
    },
  },
  default: {
    dark: {
      headerWrapper: (_isScrolled, stickyScrolled) =>
        `z-50 ${
          stickyScrolled
            ? "sticky top-2 z-50 mx-2 w-auto shrink-0 rounded-md border border-white/10 bg-neutral-950/85 px-4 py-2 backdrop-blur-xl sm:mx-3 sm:px-8 md:px-12"
            : "relative w-full"
        }`,
      gridOrFlex: "flex w-full items-center justify-between",
      logoSize: () => "hero",
      showWordmark: false,
      pillOrInline:
        "flex items-center gap-1 rounded-xl px-2 py-1 backdrop-blur-xl transition-all bg-black/30 border border-white/15 text-white",
      triggerClass:
        "text-[13px] font-semibold tracking-tight px-2.5 xl:px-3.5 py-1.5 rounded-lg transition-all text-white/90 hover:text-white hover:bg-white/10 data-[popup-open]:bg-white/15 data-[popup-open]:text-white",
      dropdownContentClass:
        "rounded-xl border border-neutral-100/90 bg-white/98 p-4 backdrop-blur-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.06)] text-neutral-900",
      dropdownTone: "light",
      loginButtonClass:
        "hidden sm:inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 bg-white text-black hover:bg-neutral-200",
      loginText: { desktop: "Portal Login", mobile: "Login" },
      mobileButtonClass:
        "lg:hidden flex h-9 w-9 items-center justify-center rounded-md border backdrop-blur-md shadow-sm transition-colors border-white/15 bg-black/40 text-white hover:bg-white/10",
      mobileDrawerClass:
        "fixed inset-x-4 top-20 z-50 max-h-[80vh] overflow-y-auto rounded-xl border border-neutral-200/90 bg-white/98 p-6 backdrop-blur-2xl shadow-2xl lg:hidden flex flex-col gap-4 text-neutral-900",
      mobileItemClass: "flex items-center justify-between py-1.5 text-xs text-neutral-600 hover:text-black",
      mobileSectionClass: "border-b border-neutral-100 pb-3",
      mobileCTAClass:
        "mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 hover:bg-neutral-800 py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md transition-colors",
    },
    light: {
      headerWrapper: (_isScrolled, stickyScrolled) =>
        `z-50 ${
          stickyScrolled
            ? "sticky top-2 z-50 mx-2 w-auto shrink-0 rounded-md border border-neutral-950/10 bg-neutral-50/85 px-4 py-2 backdrop-blur-xl sm:mx-3 sm:px-8 md:px-12"
            : "relative w-full py-2 sm:py-3"
        }`,
      gridOrFlex: "flex w-full items-center justify-between px-4 sm:px-8 md:px-12",
      logoSize: () => "default",
      showWordmark: false,
      pillOrInline:
        "flex items-center gap-1 rounded-xl px-2 py-1 backdrop-blur-xl transition-all border border-white/60 bg-white/85 shadow-[0_4px_20px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03]",
      triggerClass:
        "text-[13px] font-semibold tracking-tight px-2.5 xl:px-3.5 py-1.5 rounded-lg transition-all text-neutral-800 hover:text-black hover:bg-neutral-100/90 data-[popup-open]:bg-neutral-100 data-[popup-open]:text-black",
      dropdownContentClass:
        "rounded-xl border border-neutral-100/90 bg-white/98 p-4 backdrop-blur-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.06)] text-neutral-900",
      dropdownTone: "light",
      loginButtonClass:
        "hidden sm:inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 bg-neutral-950 text-white hover:bg-neutral-800",
      loginText: { desktop: "Portal Login", mobile: "Login" },
      mobileButtonClass:
        "lg:hidden flex h-9 w-9 items-center justify-center rounded-md border backdrop-blur-md shadow-sm transition-colors border-neutral-200/90 bg-white/95 text-neutral-800 hover:bg-neutral-100",
      mobileDrawerClass:
        "fixed inset-x-4 top-20 z-50 max-h-[80vh] overflow-y-auto rounded-xl border border-neutral-200/90 bg-white/98 p-6 backdrop-blur-2xl shadow-2xl lg:hidden flex flex-col gap-4 text-neutral-900",
      mobileItemClass: "flex items-center justify-between py-1.5 text-xs text-neutral-600 hover:text-black",
      mobileSectionClass: "border-b border-neutral-100 pb-3",
      mobileCTAClass:
        "mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 hover:bg-neutral-800 py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md transition-colors",
    },
  },
};

export function Navbar({
  tone = "light",
  variant = "default",
  stickyScrolled = false,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openMobileSection, setOpenMobileSection] = React.useState<string | null>(null);
  const isBar = variant === "bar";
  const isScrolled = useScrolled(24, isBar);
  const shouldReduceMotion = useReducedMotion();
  const config = VARIANT_CONFIG[variant][tone];

  // Close mobile drawer on Escape key
  React.useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll horizontally when drawer is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflowX = "hidden";
    }
    return () => {
      document.body.style.overflowX = "";
    };
  }, [isMobileMenuOpen]);

  if (isBar) {
    return (
      <header
        className={config.headerWrapper(isScrolled, stickyScrolled)}
        style={{
          transitionDuration: shouldReduceMotion ? "0ms" : "250ms",
        }}
      >
        {/* Desktop Layout (>=1024px): CSS Grid 1fr auto 1fr for exact centering */}
        <div
          className={config.gridOrFlex}
          style={{ paddingInline: NAV_INSET }}
        >
          {/* Col 1: Left - Logo & Brand Wordmark */}
          <div className="justify-self-start flex items-center gap-2.5">
            <LogoBadge size={config.logoSize(isScrolled)} />
            {config.showWordmark ? (
              <span className="font-sans font-medium text-[14px] tracking-[0.02em] text-white hidden min-[480px]:inline-block select-none">
                SPO IITK
              </span>
            ) : null}
          </div>

          {/* Col 2: Center - Nav Links (Exact viewport center) */}
          <nav aria-label="Primary" className="justify-self-center flex items-center">
            <NavigationMenu tone={config.dropdownTone} delayDuration={80}>
              <NavigationMenuList className={config.pillOrInline}>
                {NAV_SECTIONS.map((section) => (
                  <NavigationMenuItem key={section.title}>
                    <NavigationMenuTrigger
                      showChevron={false}
                      className={config.triggerClass}
                    >
                      <span>{section.title}</span>
                      <IconChevronDown
                        size={12}
                        stroke={2.5}
                        className="shrink-0 text-white/50 transition-transform duration-200 group-hover:text-white/80 group-data-[popup-open]:rotate-180 group-data-[popup-open]:text-[#93c5fd]"
                      />
                      {/* Underline growing from the left */}
                      <span
                        className={`absolute bottom-1 left-3 right-3 h-[1px] bg-[#93c5fd] origin-left scale-x-0 group-hover:scale-x-100 group-data-[popup-open]:scale-x-100 ${
                          shouldReduceMotion
                            ? ""
                            : "transition-transform duration-200 ease-out"
                        }`}
                      />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                      width={section.items.length > 4 ? "w-[38rem]" : "w-[22rem]"}
                      className={config.dropdownContentClass}
                    >
                      <div
                        className={`grid gap-2 ${
                          section.items.length > 4 ? "grid-cols-2" : "grid-cols-1"
                        }`}
                      >
                        {section.items.map((item) => (
                          <NavigationMenuLink
                            key={item.title}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="group flex items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2"
                          >
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition-colors group-hover:bg-white/15">
                              {item.icon}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-1 text-[14px] font-medium text-white">
                                <span>{item.title}</span>
                                {item.external ? (
                                  <IconArrowUpRight
                                    size={12}
                                    className="text-white/40 group-hover:text-white"
                                  />
                                ) : null}
                              </div>
                              {item.description ? (
                                <p className="text-[12px] text-white/55 leading-snug line-clamp-2">
                                  {item.description}
                                </p>
                              ) : null}
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>

                      {section.featuredLink ? (
                        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between px-2">
                          <span className="font-mono text-white/40 text-[11px] uppercase tracking-wider">
                            SPO IITK
                          </span>
                          <Link
                            href={section.featuredLink.href}
                            className="text-[12px] font-medium text-[#93c5fd] hover:text-white transition-colors flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
                          >
                            {section.featuredLink.label}
                          </Link>
                        </div>
                      ) : null}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Col 3: Right - Portal Login */}
          <div className="justify-self-end flex items-center gap-3">
            <Link
              href="https://placement.iitk.ac.in/login"
              target="_blank"
              rel="noopener noreferrer"
              className={config.loginButtonClass}
            >
              <IconLogin size={14} className="shrink-0" />
              <span>{config.loginText.desktop}</span>
            </Link>
          </div>
        </div>

        {/* Mobile Bar (<1024px) */}
        <div className="flex lg:hidden items-center justify-between w-full h-full px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <LogoBadge size={config.logoSize(isScrolled)} />
            {config.showWordmark ? (
              <span className="font-sans font-medium text-[14px] tracking-[0.02em] text-white hidden min-[480px]:inline-block select-none">
                SPO IITK
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="https://placement.iitk.ac.in/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center gap-1 rounded-full bg-white px-3 text-[12px] font-medium text-neutral-950 hover:bg-neutral-100 transition-colors shrink-0"
            >
              <IconLogin size={14} />
              <span>{config.loginText.mobile}</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              className={config.mobileButtonClass}
            >
              {isMobileMenuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
              className={config.mobileDrawerClass}
            >
              {NAV_SECTIONS.map((section) => {
                const isExpanded = openMobileSection === section.title;
                return (
                  <div key={section.title} className={config.mobileSectionClass}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileSection(isExpanded ? null : section.title)
                      }
                      className="min-h-[44px] flex w-full items-center justify-between py-2 text-[15px] font-medium text-white focus-visible:outline-2 focus-visible:outline-[#93c5fd]"
                    >
                      <span>{section.title}</span>
                      <span className="text-xs text-white/50 font-mono">
                        {isExpanded ? "−" : "+"}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded ? (
                        <motion.div
                          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                          className="flex flex-col gap-1 pt-1 pl-2"
                        >
                          {section.items.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noopener noreferrer" : undefined}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={config.mobileItemClass}
                            >
                              <span className="flex items-center gap-2.5">
                                <span className="text-white/60">{item.icon}</span>
                                <span>{item.title}</span>
                              </span>
                              {item.external ? (
                                <IconArrowUpRight size={13} className="text-white/40" />
                              ) : null}
                            </Link>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                href="https://placement.iitk.ac.in/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className={config.mobileCTAClass}
              >
                <IconLogin size={15} stroke={2.2} />
                <span>Portal Login</span>
              </Link>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    );
  }

  // Default Variant (homepage and legacy usages untouched)
  const isDark = tone === "dark";
  const stickySurface = isDark
    ? "border-white/10 bg-neutral-950/85"
    : "border-neutral-950/10 bg-neutral-50/85";

  return (
    <header
      className={`z-50 ${
        stickyScrolled
          ? `sticky top-2 z-50 mx-2 w-auto shrink-0 rounded-md border ${stickySurface} px-4 py-2 backdrop-blur-xl sm:mx-3 sm:px-8 md:px-12`
          : `relative w-full ${isDark ? "" : "py-2 sm:py-3"}`
      }`}
    >
      <div
        className={`flex w-full items-center justify-between ${
          stickyScrolled || isDark ? "" : "px-4 sm:px-8 md:px-12"
        }`}
      >
        {/* Div 1: Left - Logo & Brand */}
        <div className="flex items-center gap-3">
          <LogoBadge size={isDark ? "hero" : "default"} />
        </div>

        {/* Div 2: Center - Nav Links with Dropdowns (hidden below lg) */}
        <div className="hidden lg:flex items-center justify-center">
          <NavigationMenu delayDuration={80}>
            <NavigationMenuList
              className={`flex items-center gap-1 rounded-xl px-2 py-1 backdrop-blur-xl transition-all ${
                isDark
                  ? "bg-black/30 border border-white/15 text-white"
                  : "border border-white/60 bg-white/85 shadow-[0_4px_20px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.03]"
              }`}
            >
              {NAV_SECTIONS.map((section) => (
                <NavigationMenuItem key={section.title}>
                  <NavigationMenuTrigger
                    className={`text-[13px] font-semibold tracking-tight px-2.5 xl:px-3.5 py-1.5 rounded-lg transition-all ${
                      isDark
                        ? "text-white/90 hover:text-white hover:bg-white/10 data-[popup-open]:bg-white/15 data-[popup-open]:text-white"
                        : "text-neutral-800 hover:text-black hover:bg-neutral-100/90 data-[popup-open]:bg-neutral-100 data-[popup-open]:text-black"
                    }`}
                  >
                    {section.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent
                    width={section.items.length > 4 ? "w-[38rem]" : "w-[22rem]"}
                    className="rounded-xl border border-neutral-100/90 bg-white/98 p-4 backdrop-blur-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.06)] text-neutral-900"
                  >
                    <div
                      className={`grid gap-2 ${
                        section.items.length > 4 ? "grid-cols-2" : "grid-cols-1"
                      }`}
                    >
                      {section.items.map((item) => (
                        <NavigationMenuLink
                          key={item.title}
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className="group flex items-start gap-3 rounded-lg p-2.5 text-left transition-all hover:bg-neutral-100/80"
                        >
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100/80 text-neutral-600 transition-colors group-hover:bg-neutral-200/80 group-hover:text-neutral-950">
                            {item.icon}
                          </div>

                          <div className="flex flex-col gap-0.5">
                            <div className="flex items-center gap-1 text-[13px] font-semibold text-neutral-900 group-hover:text-black">
                              <span>{item.title}</span>
                              {item.external ? (
                                <IconArrowUpRight
                                  size={12}
                                  className="text-neutral-400 group-hover:text-black"
                                />
                              ) : null}
                            </div>
                            {item.description ? (
                              <NavigationMenuDescription className="text-[11px] text-neutral-500 font-normal leading-snug">
                                {item.description}
                              </NavigationMenuDescription>
                            ) : null}
                          </div>
                        </NavigationMenuLink>
                      ))}
                    </div>

                    {section.featuredLink ? (
                      <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between px-2">
                        <Link
                          href={section.featuredLink.href}
                          className="text-xs font-semibold text-neutral-900 hover:text-black transition-colors inline-flex items-center gap-1"
                        >
                          <span>{section.featuredLink.label}</span>
                        </Link>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          SPO IITK
                        </span>
                      </div>
                    ) : null}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Div 3: Right - Solid CTA Button & Mobile Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="https://placement.iitk.ac.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all shadow-sm active:scale-95 ${
              isDark
                ? "bg-white text-black hover:bg-neutral-200"
                : "bg-neutral-950 text-white hover:bg-neutral-800"
            }`}
          >
            <IconLogin size={14} stroke={2.2} />
            <span>Portal Login</span>
          </Link>

          <Link
            href="https://placement.iitk.ac.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className={`sm:hidden inline-flex items-center gap-1 rounded-md px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-sm ${
              isDark ? "bg-white text-black" : "bg-neutral-950 text-white"
            }`}
          >
            <IconLogin size={12} stroke={2.5} />
            <span>Login</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`lg:hidden flex h-9 w-9 items-center justify-center rounded-md border backdrop-blur-md shadow-sm transition-colors ${
              isDark
                ? "border-white/15 bg-black/40 text-white hover:bg-white/10"
                : "border-neutral-200/90 bg-white/95 text-neutral-800 hover:bg-neutral-100"
            }`}
          >
            {isMobileMenuOpen ? <IconX size={18} /> : <IconMenu2 size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-4 top-20 z-50 max-h-[80vh] overflow-y-auto rounded-xl border border-neutral-200/90 bg-white/98 p-6 backdrop-blur-2xl shadow-2xl lg:hidden flex flex-col gap-4 text-neutral-900"
          >
            {NAV_SECTIONS.map((section) => {
              const isExpanded = openMobileSection === section.title;
              return (
                <div
                  key={section.title}
                  className="border-b border-neutral-100 pb-3"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMobileSection(isExpanded ? null : section.title)
                    }
                    className="flex w-full items-center justify-between py-1.5 text-sm font-bold text-neutral-800"
                  >
                    <span>{section.title}</span>
                    <span className="text-xs text-neutral-400 font-mono">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col gap-1.5 pt-2 pl-2"
                      >
                        {section.items.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={
                              item.external ? "noopener noreferrer" : undefined
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between py-1.5 text-xs text-neutral-600 hover:text-black"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-neutral-400">
                                {item.icon}
                              </span>
                              <span>{item.title}</span>
                            </span>
                            {item.external ? (
                              <IconArrowUpRight size={13} />
                            ) : null}
                          </Link>
                        ))}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}

            <Link
              href="https://placement.iitk.ac.in/login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-950 hover:bg-neutral-800 py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md transition-colors"
            >
              <IconLogin size={15} stroke={2.2} />
              <span>Official Portal Login</span>
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
