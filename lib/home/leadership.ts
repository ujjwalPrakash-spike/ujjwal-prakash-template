// Structured data for flagship engineering divisions and showcase cards.

export interface LeadershipMessage {
  id: string;
  index: string;
  roleTag: string;
  title: string;
  quote: string;
  name: string;
  designation: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  cardBg: string;
  accentColor: string;
  borderAccent: string;
}

export interface LeadershipSectionData {
  sectionIndex: string;
  sectionTag: string;
  heading: string;
  subheading: string;
  messages: LeadershipMessage[];
}

export const LEADERSHIP_SECTION_DATA: LeadershipSectionData = {
  sectionIndex: "02",
  sectionTag: "ENGINEERING DISCIPLINES",
  heading: "Bespoke Digital Divisions",
  subheading:
    "Architecture, physics-based motion, and high-conversion editorial commerce engineered for maximum brand prestige.",
  messages: [
    {
      id: "paddock-os",
      index: "01",
      roleTag: "DIVISION 01 // RACING",
      title: "Trackside & Paddock Digital Operating System",
      quote:
        "Full-fidelity race weekend telemetry, real-time pit strategy dashboards, and live partner integration. Engineered to command seven-figure brand sponsorships and captivate VIP paddock hospitality.",
      name: "PADDOCK OS",
      designation: "Dynamic Telemetry & Partner Platform",
      imageSrc: "/template/DSC03294.jpg.jpeg",
      imageAlt: "High-performance racing vehicle",
      href: "#specs",
      cardBg: "bg-[#0b1329]",
      accentColor: "#38bdf8",
      borderAccent: "border-white/10",
    },
    {
      id: "lookbook-engine",
      index: "02",
      roleTag: "DIVISION 02 // COMMERCE",
      title: "High-Fashion Editorial Merch & Capsule Drops",
      quote:
        "Limited-edition apparel drops presented through brutalist typography, responsive media scrubbing, and frictionless one-click Stripe payment links. Designed to turn casual enthusiasts into loyal brand patrons.",
      name: "LOOKBOOK ENGINE",
      designation: "Luxury Apparel & Merch Storefront",
      imageSrc: "/template/👑.jpeg",
      imageAlt: "Editorial fashion collection",
      href: "/merch",
      cardBg: "bg-[#18111e]",
      accentColor: "#e879f9",
      borderAccent: "border-white/10",
    },
    {
      id: "monolith-atelier",
      index: "03",
      roleTag: "DIVISION 03 // BESPOKE",
      title: "Monolithic Spatial Architecture & Hardware Showcase",
      quote:
        "Tailored for bespoke automotive builders, supercar privateers, and architectural ateliers who demand digital presentation that matches the tactile craft and uncompromised precision of their physical engineering.",
      name: "MONOLITH ATELIER",
      designation: "Physical-Digital Presentation Suite",
      imageSrc: "/template/_ (9).jpeg",
      imageAlt: "Precision craftsmanship and engineering",
      href: "/about",
      cardBg: "bg-[#0d1616]",
      accentColor: "#34d399",
      borderAccent: "border-white/10",
    },
  ],
};
