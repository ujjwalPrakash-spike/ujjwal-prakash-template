// Footer column links and brand contact info for the site footer.

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Atelier",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Team & Roster", href: "/team" },
    ],
  },
  {
    title: "Releases",
    links: [
      { label: "Lookbook & Merch", href: "/merch" },
      { label: "Journal & News", href: "/news" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Commission a Build", href: "/contact" },
      { label: "Direct Inquiries", href: "mailto:commissions@apexworks.io" },
    ],
  },
];

export const FOOTER_CONTACT = {
  lines: [
    "APEX WORKS // PERFORMANCE ATELIER",
    "High-Performance Digital Architecture",
    "Zurich · London · Tokyo",
  ],
  phone: { display: "+44 20 7946 0912", href: "tel:+442079460912" },
  email: { display: "commissions@apexworks.io", href: "mailto:commissions@apexworks.io" },
};

import { SOCIAL_LINKS } from "@/config/socials";

export interface FooterSocialItem {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
}

export const FOOTER_SOCIAL: FooterSocialItem[] = [
  {
    label: "Email Atelier",
    href: "mailto:commissions@apexworks.io",
    icon: "mail",
  },
  ...SOCIAL_LINKS.filter((s) => Boolean(s.href)).slice(0, 4).map((s) => ({
    label: s.label,
    href: s.href,
    icon: s.platform,
    external: true,
  })),
];
