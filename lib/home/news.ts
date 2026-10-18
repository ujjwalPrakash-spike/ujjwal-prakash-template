export type NewsItem = {
  title: string;
  href: string;
  source: string;
  date?: string;
  image?: string;
  summary?: string;
};

export const NEWS_ITEMS: NewsItem[] = [
  {
    title:
      "Apex Works Unveils 2026 GT3 Paddock Operating System & Telemetry Architecture",
    source: "Apex Journal",
    date: "OCT 2026",
    href: "#specs",
    summary:
      "Engineered for GT and endurance racing privateers to stream real-time telemetry, track pit strategies, and unlock six-figure corporate partner activations.",
  },
  {
    title:
      "Editorial Capsule 01 Lookbook Launches with Global One-Click Stripe Settlement",
    source: "Press Release",
    date: "SEP 2026",
    href: "/merch",
    summary:
      "Limited-run paddock jackets, race-spec accessories, and serialized team merchandise deployed on ultra-high framerate editorial canvas.",
  },
  {
    title:
      "European Restomod Atelier Adopts Monolith High-Performance Web Engine",
    source: "Architecture & Design",
    date: "AUG 2026",
    href: "/about",
    summary:
      "Custom carbon fiber vehicle commission portal delivered with 60 FPS physics-based scrub and full-bleed spatial documentation.",
  },
];
