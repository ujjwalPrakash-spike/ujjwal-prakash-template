// Structured data for flagship showcase cards (image-led editorial layout).

export interface LeadershipCardItem {
  id: string;
  index: string;
  title: string;
  line: string;
  category: string;
  image?: string;
  imageAlt?: string;
  href: string;
}

export interface LeadershipSectionData {
  sectionIndex: string;
  sectionTag: string;
  heading: string;
  subheading: string;
  cards: LeadershipCardItem[];
}

export const LEADERSHIP_SECTION_DATA: LeadershipSectionData = {
  sectionIndex: "02",
  sectionTag: "FLAGSHIP DISCIPLINES",
  heading: "Architectural Showcase",
  subheading:
    "Tactile engineering, bespoke kinetic fabrication, and performance apparel designed for extreme environments.",
  cards: [
    {
      id: "kinetic-truss",
      index: "01",
      title: "Modular Kinetic Truss",
      line: "High-tensile carbon nodes with adaptive articulation.",
      category: "DISCIPLINE 01 // KINETICS",
      image: "/template/backgroundhero-poster.jpg",
      imageAlt: "High-tensile carbon nodes and adaptive articulation",
      href: "/about",
    },
    {
      id: "aero-hull",
      index: "02",
      title: "Monolithic Aero Hull",
      line: "Continuous aerodynamic shell rated for dynamic loads.",
      category: "DISCIPLINE 02 // STRUCTURE",
      image: "/template/_ (8).jpeg",
      imageAlt: "Continuous aerodynamic shell and spatial engineering",
      href: "/about",
    },
    {
      id: "composite-weave",
      index: "03",
      title: "Composite Shell Weave",
      line: "Cordura® 3-layer laminate with magnetic modular seals.",
      category: "DISCIPLINE 03 // MATERIALS",
      image: "/template/👑.jpeg",
      imageAlt: "Technical Cordura 3-layer apparel membrane",
      href: "/merch",
    },
    {
      id: "telemetry-array",
      index: "04",
      title: "Micro-Telemetry Array",
      line: "Sub-millimeter strain sensors with embedded edge logic.",
      category: "DISCIPLINE 04 // SYSTEMS",
      image: "/template/_ (9).jpeg",
      imageAlt: "Sub-millimeter strain sensor instrumentation",
      href: "/contact",
    },
  ],
};
