// Footer link columns and contact/social data for the site footer.
// URLs taken verbatim from the old website's Footer.tsx.
// Routes that exist in the new app use internal paths; external links are flagged.

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
    title: "IITK Links",
    links: [
      { label: "IITK Homepage", href: "https://iitk.ac.in/", external: true },
      { label: "DoAA", href: "https://iitk.ac.in/doaa/", external: true },
      { label: "DoSA", href: "https://iitk.ac.in/dosa", external: true },
      { label: "Students' Gymkhana", href: "https://students.iitk.ac.in/", external: true },
    ],
  },
  {
    title: "For Companies",
    links: [
      { label: "Steps - Company registration", href: "/recruiters/why-iitk#steps" },
      { label: "Recruitment Procedure and Policy", href: "/recruiters/why-iitk#policy" },
      {
        label: "Brochures",
        href: "https://drive.google.com/file/d/1o7WZPfAJTp8gqzAysba2azJlmMhdacX6/view?usp=sharing",
        external: true,
      },
      { label: "Departmental Brochures", href: "/departmental-brochure" },
      { label: "FAQs", href: "/recruiters/why-iitk#faqs" },
    ],
  },
  {
    title: "For Students",
    links: [
      { label: "Steps - Students Registration", href: "/students#steps" },
      { label: "Policy", href: "/students#resources" },
      { label: "Preparation Portal", href: "https://spo.iitk.ac.in/preparation/", external: true },
      { label: "Insights", href: "/insights" },
      { label: "FAQs", href: "/students#faqs" },
    ],
  },
];

export const FOOTER_CONTACT = {
  lines: [
    "Students' Placement Office",
    "109, Outreach Building",
    "IIT Kanpur, Kanpur-208016",
  ],
  phone: { display: "+91 512 259 44 33/34", href: "tel:+915122594433" },
  email: { display: "spo@iitk.ac.in", href: "mailto:spo@iitk.ac.in" },
};

export const FOOTER_SOCIAL = [
  {
    label: "Email SPO",
    href: "mailto:spo@iitk.ac.in",
    icon: "mail" as const,
  },
  {
    label: "SPO on Facebook",
    href: "https://www.facebook.com/spo.iitkanpur",
    icon: "facebook" as const,
    external: true,
  },
  {
    label: "SPO on LinkedIn",
    href: "https://www.linkedin.com/in/iitkanpurplacement",
    icon: "linkedin" as const,
    external: true,
  },
];
