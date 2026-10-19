// Team roster, car architecture specifications, and factory racing pilots data.

export interface TeamMember {
  name: string;
  email: string;
  phone: string;
  department?: string;
  role: string;
  photo?: string;
  linkedin?: string;
}

export interface CarSpecItem {
  label: string;
  value: string;
  unit?: string;
}

export interface CarData {
  title: string;
  line: string;
  image?: string;
  imageAlt?: string;
  specs: CarSpecItem[];
}

export interface DriverHighlight {
  label: string;
  detail: string;
}

export interface DriverStats {
  starts: number;
  wins: number;
  podiums: number;
}

export interface DriverData {
  slug: string;
  name: string;
  number: string;
  class: string;
  nationality: string;
  role: string;
  bio: string;
  image?: string;
  imageAlt?: string;
  highlights: DriverHighlight[];
  stats?: DriverStats;
  email: string;
}

export const CAR_DATA: CarData = {
  title: "APEX GT-01",
  line: "A high-downforce endurance architecture engineered for extreme thermal efficiency and high-speed telemetry research.",
  image: "/images/team/mercedes-amg-gt3.png",
  imageAlt: "APEX GT-01 High-Downforce Prototype Architecture",
  specs: [
    { label: "POWER", value: "550", unit: "bhp" },
    { label: "WEIGHT", value: "1285", unit: "kg" },
    { label: "TRANSMISSION", value: "6-Speed", unit: "Sequential" },
    { label: "DISPLACEMENT", value: "4.0", unit: "litres" },
    { label: "DOWNFORCE", value: "820", unit: "kg" },
  ],
};

// Aliases for backward compatibility
export const CAR_SPEC = CAR_DATA;
export type CarSpec = CarData;

export const DRIVERS_DATA: DriverData[] = [
  {
    slug: "marcus-vance",
    number: "77",
    name: "Marcus Vance",
    class: "Factory Pro",
    nationality: "United Kingdom",
    role: "Lead Factory Pilot & Calibration Driver",
    bio: "Over a decade anchoring vehicle feedback for high-speed balance, suspension damping, and multi-stint endurance limits.",
    image: "/template/_ (8).jpeg",
    imageAlt: "Marcus Vance, Lead Factory Pilot",
    highlights: [
      { label: "Coastline 24 Hours", detail: "Overall Winner (Pro Class)" },
      { label: "Harbor 12 Hours", detail: "Class Pole & Lap Record" },
      { label: "Apex Aero Development", detail: "Lead Track Evaluation Pilot" },
    ],
    stats: {
      starts: 48,
      wins: 14,
      podiums: 29,
    },
    email: "m.vance@apexworks.io",
  },
  {
    slug: "elena-rostova",
    number: "88",
    name: "Elena Rostova",
    class: "Factory Pro",
    nationality: "Germany",
    role: "Pro Factory Co-Driver & Development Pilot",
    bio: "Combining computational fluid dynamics expertise with razor-sharp telemetry feedback to bridge wind-tunnel models with on-track limits.",
    image: "/template/_.jpeg",
    imageAlt: "Elena Rostova, Pro Factory Co-Driver",
    highlights: [
      { label: "Highland 24 Hours", detail: "Overall Pole Position" },
      { label: "Continental Endurance", detail: "Championship Runner-Up" },
      { label: "High-G Simulation", detail: "Lead Telemetry Correlation" },
    ],
    stats: {
      starts: 36,
      wins: 11,
      podiums: 22,
    },
    email: "e.rostova@apexworks.io",
  },
];

// Aliases for backward compatibility
export const FACTORY_DRIVERS = DRIVERS_DATA;
export type FactoryDriver = DriverData;

export const PRINCIPALS: TeamMember[] = [
  {
    name: "Alexander Vance",
    role: "Technical Director & Founder",
    department: "Executive Directorate",
    email: "a.vance@apexworks.io",
    phone: "+44 20 7946 0912",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Elena Rostova",
    role: "Chief Aerodynamicist",
    department: "Aero Dynamics Lab",
    email: "e.rostova@apexworks.io",
    phone: "+44 20 7946 0913",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Marcus Lindqvist",
    role: "Creative Director & Architecture",
    department: "Design Atelier",
    email: "m.lindqvist@apexworks.io",
    phone: "+44 20 7946 0914",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Kenji Takahashi",
    role: "Director of Powertrain & Telemetry",
    department: "Telemetry & Systems",
    email: "k.takahashi@apexworks.io",
    phone: "+44 20 7946 0915",
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
  ...DRIVERS_DATA.map((d) => ({
    name: d.name,
    role: d.role,
    department: "Racing Directorate",
    email: d.email,
    phone: "",
    photo: d.image,
  })),
  ...PRINCIPALS,
  ...RACE_ENGINEERS,
  ...CREATIVE_ATELIER,
];

export function getTeamSearchText(member: TeamMember): string {
  return `${member.name} ${member.role} ${member.department || ""} ${member.email}`;
}
