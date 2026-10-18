import React from "react";
import {
  IconGauge,
  IconSparkles,
  IconUsers,
  IconShirt,
  IconNews,
  IconSend,
} from "@tabler/icons-react";

export interface SubNavItem {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
  icon: React.ReactNode;
}

export interface NavSection {
  title: string;
  items: SubNavItem[];
  featuredLink?: {
    label: string;
    href: string;
  };
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Atelier",
    items: [
      {
        title: "Platform Overview",
        href: "/",
        description: "Kinetic video scrub, telemetry specs, and live physics.",
        icon: <IconGauge size={16} />,
      },
      {
        title: "About the Studio",
        href: "/about",
        description: "Craftsmanship, brutalist design codes, and engineering roots.",
        icon: <IconSparkles size={16} />,
      },
      {
        title: "Team & Roster",
        href: "/team",
        description: "Studio principals, aerodynamicists, and race engineers.",
        icon: <IconUsers size={16} />,
      },
    ],
    featuredLink: {
      label: "Inspect Team Roster →",
      href: "/team",
    },
  },
  {
    title: "Lookbook",
    items: [
      {
        title: "Apparel & Merch",
        href: "/merch",
        description: "Limited technical garments and serialized paddock gear.",
        icon: <IconShirt size={16} />,
      },
      {
        title: "Journal & News",
        href: "/news",
        description: "Official dispatches, track releases, and engineering papers.",
        icon: <IconNews size={16} />,
      },
    ],
    featuredLink: {
      label: "Explore Lookbook Drop →",
      href: "/merch",
    },
  },
  {
    title: "Contact",
    items: [
      {
        title: "Initiate a Build",
        href: "/contact",
        description: "Turnkey 48-hour digital architecture for racing teams and builders.",
        icon: <IconSend size={16} />,
      },
    ],
    featuredLink: {
      label: "Contact Studio →",
      href: "/contact",
    },
  },
];
