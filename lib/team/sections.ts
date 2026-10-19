// Section definitions for the team directory index navigation.

export interface TeamSection {
  id: string;
  title: string;
  subtitle?: string;
}

export const TEAM_SECTIONS: TeamSection[] = [
  {
    id: "drivers",
    title: "Drivers",
    subtitle: "Factory racing pilots commanding high-speed limits.",
  },
  {
    id: "principals",
    title: "Principals & Directors",
    subtitle: "Strategic leadership, vehicle architecture, and studio creative vision.",
  },
  {
    id: "engineering",
    title: "Engineering & Aerodynamics",
    subtitle: "Computational fluid dynamics, telemetry architectures, and composite craft.",
  },
  {
    id: "creative",
    title: "Creative & Brand Atelier",
    subtitle: "Editorial lookbooks, limited apparel drops, and spatial design.",
  },
];
