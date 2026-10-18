export interface TeamMember {
  name: string;
  email: string;
  phone: string;
  department?: string;
  role: string;
  photo?: string;
  linkedin?: string;
}

export const PRINCIPALS: TeamMember[] = [
  {
    name: "Alexander Vance",
    role: "Technical Director & Founder",
    department: "Executive Directorate",
    email: "a.vance@apexworks.io",
    phone: "+44 20 7946 0912",
    photo: "/template/_ (8).jpeg",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Elena Rostova",
    role: "Chief Aerodynamicist",
    department: "Aero Dynamics Lab",
    email: "e.rostova@apexworks.io",
    phone: "+44 20 7946 0913",
    photo: "/template/_.jpeg",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Marcus Lindqvist",
    role: "Creative Director & Architecture",
    department: "Design Atelier",
    email: "m.lindqvist@apexworks.io",
    phone: "+44 20 7946 0914",
    photo: "/template/👑.jpeg",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Kenji Takahashi",
    role: "Director of Powertrain & Telemetry",
    department: "Telemetry & Systems",
    email: "k.takahashi@apexworks.io",
    phone: "+44 20 7946 0915",
    photo: "/template/_ (9).jpeg",
    linkedin: "https://linkedin.com",
  },
];

export const RACE_ENGINEERS: TeamMember[] = [
  {
    name: "Lucas Meyer",
    role: "Lead Carbon Monocoque Engineer",
    department: "Composite Structures",
    email: "l.meyer@apexworks.io",
    phone: "+44 20 7946 0920",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Siddharth Rao",
    role: "Senior Telemetry Systems Architect",
    department: "Data Engineering",
    email: "s.rao@apexworks.io",
    phone: "+44 20 7946 0921",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Camille Dubois",
    role: "Computational Fluid Dynamics Specialist",
    department: "Aero Dynamics Lab",
    email: "c.dubois@apexworks.io",
    phone: "+44 20 7946 0922",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Henrik Lindholm",
    role: "Suspension & Kinetic Dynamics Lead",
    department: "Vehicle Dynamics",
    email: "h.lindholm@apexworks.io",
    phone: "+44 20 7946 0923",
    linkedin: "https://linkedin.com",
  },
];

export const CREATIVE_ATELIER: TeamMember[] = [
  {
    name: "Chloe Dupont",
    role: "Head of Editorial Merch & Apparel",
    department: "Apparel Studio",
    email: "c.dupont@apexworks.io",
    phone: "+44 20 7946 0930",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Matteo Bianchi",
    role: "Spatial & Industrial Designer",
    department: "Spatial Design",
    email: "m.bianchi@apexworks.io",
    phone: "+44 20 7946 0931",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Julian Thorne",
    role: "Digital Systems & Interactive Motion Lead",
    department: "Digital Architecture",
    email: "j.thorne@apexworks.io",
    phone: "+44 20 7946 0932",
    linkedin: "https://linkedin.com",
  },
];

export const ALL_TEAM_MEMBERS: TeamMember[] = [
  ...PRINCIPALS,
  ...RACE_ENGINEERS,
  ...CREATIVE_ATELIER,
];

export function getTeamSearchText(member: TeamMember): string {
  return `${member.name} ${member.role} ${member.department || ""} ${member.email}`;
}
