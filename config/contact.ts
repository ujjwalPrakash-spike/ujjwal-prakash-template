// Contact page configuration: editorial headers, topics, studio coordinates, and FAQ entries.

export interface TopicOption {
  value: string;
  label: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactConfig {
  mockSubmit: boolean;
  eyebrow: string;
  title: string;
  intro: string;
  quickFacts: {
    responseTime: string;
    email: string;
    phone: string;
    phoneHref: string;
    hours: string;
  };
  topics: TopicOption[];
  address: {
    name: string;
    lines: string[];
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
    hours: string;
    mapUrl: string;
    mapLabel: string;
    image: string;
  };
  visitSection: {
    title: string;
    hours: string;
    image: string;
  };
  consentLabel: string;
  termsLink: { label: string; href: string };
  privacyLink: { label: string; href: string };
  channelsIntro: string;
  faqs: FaqItem[];
}

export const CONTACT_CONFIG: ContactConfig = {
  mockSubmit: true,
  eyebrow: "INQUIRIES",
  title: "Contact",
  intro:
    "Direct atelier commissions, engineering partner inquiries, and technical consultations. We review every brief within 24 hours.",
  quickFacts: {
    responseTime: "Under 24 hours",
    email: "commissions@apexworks.io",
    phone: "+41 44 215 88 00",
    phoneHref: "tel:+41442158800",
    hours: "09:00 – 18:00 CET",
  },
  topics: [
    { value: "bespoke", label: "Bespoke Digital Commission" },
    { value: "engineering", label: "Aerodynamic Telemetry & Engineering" },
    { value: "materials", label: "Material Research & Composites" },
    { value: "press", label: "Press & Media Inquiries" },
    { value: "general", label: "General Atelier Consultation" },
  ],
  address: {
    name: "APEX WORKS ATELIER",
    lines: [
      "Badenerstrasse 565",
      "8048 Zürich",
      "Switzerland",
    ],
    phone: "+41 44 215 88 00",
    phoneHref: "tel:+41442158800",
    email: "commissions@apexworks.io",
    emailHref: "mailto:commissions@apexworks.io",
    hours: "Mon – Fri · 09:00 – 18:00 CET",
    mapUrl: "https://maps.google.com/?q=Badenerstrasse+565+8048+Zurich+Switzerland",
    mapLabel: "Get directions",
    image: "/template/_ (9).jpeg",
  },
  visitSection: {
    title: "Atelier & Wind Tunnel Facility",
    hours: "Appointments only · Mon – Fri 09:00 – 18:00 CET",
    image: "/template/DSC03294.jpg.jpeg",
  },
  consentLabel: "I agree to the processing of project specifications and atelier contact policies.",
  termsLink: { label: "Terms of Service", href: "#" },
  privacyLink: { label: "Privacy Protocol", href: "#" },
  channelsIntro: "Direct dispatches, community channels, and atelier broadcasting feeds.",
  faqs: [
    {
      id: "reply-time",
      question: "What is your typical initial response time?",
      answer:
        "Every inquiry received through our atelier dispatch is reviewed by a principal partner within 24 hours during standard studio hours (Monday through Friday, 09:00 to 18:00 CET). For urgent telemetry emergencies or time-sensitive racing homologation briefs, our WhatsApp concierge provides priority triage.",
    },
    {
      id: "visiting",
      question: "Can I schedule an in-person visit to the Zürich atelier?",
      answer:
        "Yes. We accommodate private studio visits, material sample evaluations, and wind tunnel consultations strictly by prior appointment. Please indicate your proposed dates and visit objectives in the brief so our engineering staff can prepare relevant documentation.",
    },
    {
      id: "press-partnerships",
      question: "How do you handle press, media, and technical partnerships?",
      answer:
        "Editorial press requests and high-resolution media kits can be coordinated directly with our communications director at press@apexworks.io. Technical partnerships involving composite prototyping or sensor telemetry are evaluated quarterly.",
    },
    {
      id: "orders-shipping",
      question: "Where are bespoke garments and hardware pieces fabricated?",
      answer:
        "All limited-run hardware, aerodynamic components, and bespoke garments are fabricated between our precision workshop in Zürich and specialist technical partners across northern Italy and Japan. International courier delivery is fully insured with end-to-end telemetry tracking.",
    },
    {
      id: "unsubscribing",
      question: "How do I update my project details or unsubscribe from feeds?",
      answer:
        "You may request immediate removal, redaction, or updates to your project data at any point by emailing privacy@apexworks.io. We enforce strict data minimization and zero third-party telemetry tracking across our communications stack.",
    },
  ],
};
