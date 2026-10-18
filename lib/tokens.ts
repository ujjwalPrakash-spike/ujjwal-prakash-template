// Global design tokens, surface color mappings, and easing curves.

export type Surface = "dark" | "light";

export const NAV_HEIGHT = 64;
export const NAV_HEIGHT_SCROLLED = 56;
export const NAV_HEIGHT_MOBILE = 56;
export const NAV_HEIGHT_MOBILE_SCROLLED = 52;
export const NAV_INSET = "clamp(20px, 5vw, 80px)";
export const HEADER_STACK_HEIGHT = 120;
export const ACCENT_BLUE = "#93c5fd";

export const TOKENS = {
  containerMax: "1440px",
  paddingInline: "clamp(24px, 6vw, 96px)",
  paddingVertical: "clamp(80px, 12vh, 160px)",
  radiusPortrait: "clamp(16px, 2vw, 28px)",
  radiusImage: "clamp(20px, 2.4vw, 32px)",
  scrollMarginTop: "120px",
  headerHeight: NAV_HEIGHT,
  headerHeightScrolled: NAV_HEIGHT_SCROLLED,
  indexHeight: 56,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  durationLine: 1.1,
  durationText: 0.9,
  durationImage: 1.2,
} as const;

export const SURFACES: Record<Surface, {
  bg: string;
  text: string;
  textMuted: string;
  hairline: string;
  accent: string;
  focus: string;
}> = {
  dark: {
    bg: "bg-neutral-950",
    text: "text-white",
    textMuted: "text-white/60",
    hairline: "bg-white/10",
    accent: "#93c5fd",
    focus: "focus-visible:outline-[#93c5fd]",
  },
  light: {
    bg: "bg-neutral-50",
    text: "text-neutral-950",
    textMuted: "text-neutral-950/60",
    hairline: "bg-neutral-950/10",
    accent: "neutral-950",
    focus: "focus-visible:outline-neutral-950",
  },
};
