export interface WhyRecruitPanel {
  id: string;
  category: string;
  number: string;
  suffix?: string;
  label: string;
  context: string;
}

export const WHY_RECRUIT_PANELS: WhyRecruitPanel[] = [
  {
    id: "aerodynamics",
    category: "AERODYNAMICS",
    number: "820",
    suffix: "KG",
    label: "Peak downforce at 240 km/h",
    context:
      "Engineered through 400+ computational fluid dynamics cycles with active carbon DRS winglets.",
  },
  {
    id: "propulsion",
    category: "PROPULSION",
    number: "1,050",
    suffix: "BHP",
    label: "Hybrid twin-turbocharged powertrain",
    context:
      "Instantaneous torque delivery with dual axial-flux motors and a 9,200 RPM internal combustion ceiling.",
  },
  {
    id: "chassis",
    category: "CHASSIS",
    number: "1,140",
    suffix: "KG",
    label: "Dry curb weight",
    context:
      "Autoclave-cured carbon monocoque with 3D-printed titanium suspension uprights and ceramic matrix brakes.",
  },
  {
    id: "acceleration",
    category: "TELEMETRY",
    number: "1.9",
    suffix: "SEC",
    label: "0–100 km/h sprint velocity",
    context:
      "Verified on laser timing arrays under official FIA homologation protocols.",
  },
];
