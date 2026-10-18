export interface TeamMember {
  name: string;
  email: string;
  phone: string;
  department?: string;
  role: string;
  photo?: string;
  linkedin?: string;
}

export interface CarSpec {
  model: string;
  chassis: string;
  engine: string;
  power: string;
  weight: string;
  transmission: string;
  image: string;
  category: string;
}

export interface FactoryDriver {
  number: string;
  name: string;
  role: string;
  nationality: string;
  license: string;
  careerHighlights: string[];
  bio: string;
  email?: string;
}

export const CAR_SPEC: CarSpec = {
  model: "Mercedes-AMG GT3",
  chassis: "Spec 044 // Spaceframe Aluminium & Carbon",
  engine: "6.2L Naturally Aspirated V8",
  power: "550 BHP @ 6,480 RPM",
  weight: "1,285 KG (BOP)",
  transmission: "6-Speed Sequential Pneumatic Transaxle",
  image: "/images/team/mercedes-amg-gt3.png",
  category: "FIA GT3 Homologation // 24H Endurance",
};

export const FACTORY_DRIVERS: FactoryDriver[] = [
  {
    number: "77",
    name: "Marcus Vance",
    role: "Lead Factory Pilot & Calibration Driver",
    nationality: "United Kingdom",
    license: "FIA Platinum",
    careerHighlights: [
      "Overall Winner · 24 Hours of Spa",
      "GTD Pro Champion · 12H Sebring",
      "Lead Aero Test Pilot · Mercedes-AMG GT3 Programme",
    ],
    bio: "Over a decade at the vanguard of GT endurance racing. Marcus anchors vehicle feedback for suspension damping, high-speed balance, and race setup.",
    email: "m.vance@apexworks.io",
  },
  {
    number: "88",
    name: "Elena Rostova",
    role: "Pro Factory Co-Driver & Aero Development Pilot",
    nationality: "Germany",
    license: "FIA Gold",
    careerHighlights: [
      "Pole Position · Nürburgring 24 Hours (SP9)",
      "Vice-Champion · GT World Challenge Europe",
      "Lead Simulation & High-G Telemetry Driver",
    ],
    bio: "Combining deep computational fluid dynamics expertise with razor-sharp racing pedigree, Elena connects wind-tunnel simulations directly with on-track limit handling.",
    email: "e.rostova@apexworks.io",
  },
];

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
