// Fullscreen menu configuration: brand metadata, navigation links with
// image preview metadata, secondary links, and social profiles.

export interface MenuLink {
  index: string;
  label: string;
  href: string;
  soon?: boolean;
  image?: string;
  caption: string;
}

export interface MenuSecondaryLink {
  label: string;
  href: string;
}

import { SOCIAL_LINKS } from "@/config/socials";

export interface MenuSocial {
  platform: string;
  label: string;
  href: string;
}

export interface MenuConfig {
  brandName: string;
  wordmark: string;
  tagline: string;
  defaultPreview: {
    image?: string;
    caption: string;
    index: string;
  };
  links: MenuLink[];
  secondaryLinks: MenuSecondaryLink[];
  socials: MenuSocial[];
}

export const MENU_CONFIG: MenuConfig = {
  brandName: "Apex Atelier",
  wordmark: "APEX.WORKS",
  tagline: "Architectural gear & bespoke fabrication · 2026",
  defaultPreview: {
    image: "/template/_ (8).jpeg",
    caption: "Latest drop: Modular tactical shell in Cordura® 3L",
    index: "01",
  },
  links: [
    {
      index: "01",
      label: "About",
      href: "/about",
      image: "/template/DSC03294.jpg.jpeg",
      caption: "Studio methodology and architectural fabrication",
    },
    {
      index: "02",
      label: "Team",
      href: "/team",
      image: "/images/team/mercedes-amg-gt3.png",
      caption: "Core engineering & material research collective",
    },
    {
      index: "03",
      label: "Merch",
      href: "/merch",
      image: "/template/_ (8).jpeg",
      caption: "Limited production hardware and technical garments",
    },
    {
      index: "04",
      label: "News",
      href: "/news",
      image: "/images/hero-poster.jpg",
      caption: "Field dispatches and seasonal material trials",
    },
    {
      index: "05",
      label: "Gallery",
      href: "/gallery",
      image: "/template/_.jpeg",
      caption: "Exhibition archives and physical installations",
    },
    {
      index: "06",
      label: "Contact",
      href: "/contact",
      image: "/template/_ (9).jpeg",
      caption: "Bespoke commissions and project inquiries",
    },
  ],
  secondaryLinks: [
    { label: "Shipping & Sizing", href: "/merch" },
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Protocol", href: "#" },
  ],
  socials: SOCIAL_LINKS.filter((s) => Boolean(s.href)).map((s) => ({
    platform: s.platform,
    label: s.label,
    href: s.href,
  })),
};
