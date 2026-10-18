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

export const FOOTER_SOCIAL = [
  {
    label: "Email Atelier",
    href: "mailto:commissions@apexworks.io",
    icon: "mail" as const,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "instagram" as const,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "linkedin" as const,
    external: true,
  },
];
