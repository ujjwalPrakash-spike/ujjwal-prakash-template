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

export interface MenuSocial {
  platform: "x" | "instagram" | "github" | "linkedin";
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
    image: undefined,
    caption: "Latest drop: Modular tactical shell in Cordura® 3L",
    index: "01",
  },
  links: [
    {
      index: "01",
      label: "About",
      href: "/about",
      image: undefined,
      caption: "Studio methodology and architectural fabrication",
    },
    {
      index: "02",
      label: "Team",
      href: "/team",
      image: undefined,
      caption: "Core engineering & material research collective",
    },
    {
      index: "03",
      label: "Merch",
      href: "/merch",
      image: undefined,
      caption: "Limited production hardware and technical garments",
    },
    {
      index: "04",
      label: "News",
      href: "/news",
      image: undefined,
      caption: "Field dispatches and seasonal material trials",
    },
    {
      index: "05",
      label: "Gallery",
      href: "/gallery",
      caption: "Exhibition archives and physical installations",
    },
    {
      index: "06",
      label: "Contact",
      href: "/contact",
      image: undefined,
      caption: "Bespoke commissions and project inquiries",
    },
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
};
