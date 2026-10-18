// Fullscreen menu configuration: brand metadata, primary navigation links,
// secondary links, social profiles, and editorial preview cards.

export interface MenuLink {
  index: string;
  label: string;
  href: string;
  soon?: boolean;
}

export interface MenuSecondaryLink {
  label: string;
  href: string;
}

export interface MenuSocial {
  platform: "x" | "instagram" | "github" | "linkedin";
  label: string;
  href: string;
}

export interface MenuCard {
  kind: "drop" | "news";
  eyebrow: string;
  title: string;
  description?: string;
  date?: string;
  href: string;
  image?: string;
  aspectRatio?: "4:5" | "1:1" | "16:9";
  roleLabel?: string;
}

export interface MenuConfig {
  brandName: string;
  wordmark: string;
  tagline: string;
  links: MenuLink[];
  secondaryLinks: MenuSecondaryLink[];
  socials: MenuSocial[];
  cards: MenuCard[];
}

export const MENU_CONFIG: MenuConfig = {
  brandName: "Apex Atelier",
  wordmark: "APEX.WORKS",
  tagline: "ARCHITECTURAL GEAR & BESPOKE FABRICATION // 2026",
  links: [
    { index: "01", label: "About", href: "/about" },
    { index: "02", label: "Team", href: "/team" },
    { index: "03", label: "Merch", href: "/merch" },
    { index: "04", label: "News", href: "/news" },
    { index: "05", label: "Gallery", href: "/gallery", soon: true },
    { index: "06", label: "Contact", href: "/contact" },
  ],
  secondaryLinks: [
    { label: "Shipping & Sizing", href: "/merch" },
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Protocol", href: "#" },
  ],
  socials: [
    { platform: "x", label: "X / Twitter", href: "https://x.com" },
    { platform: "instagram", label: "Instagram", href: "https://instagram.com" },
    { platform: "github", label: "GitHub", href: "https://github.com" },
  ],
  cards: [
    {
      kind: "drop",
      eyebrow: "LATEST DROP",
      title: "Tactical Shell 01",
      description: "Waterproof Cordura® 3-layer laminated weave with magnetic modular fasteners.",
      href: "/merch",
      aspectRatio: "16:9",
      roleLabel: "Drop // 01",
    },
    {
      kind: "news",
      eyebrow: "DISPATCH",
      title: "Autumn Capsule Fabrication Log",
      date: "OCTOBER 2026",
      href: "/news",
      aspectRatio: "16:9",
      roleLabel: "Notes // 04",
    },
  ],
};
