export interface WhyRecruitPanel {
  id: string;
  category: string;
  number: string;
  suffix?: string;
  label: string;
  context: string;
}

export const PLACEMENTS_HEADLINE = "1,202";
export const PLACEMENTS_LABEL = "offers in Phase 1, 2025–26";

export const WHY_RECRUIT_PANELS: WhyRecruitPanel[] = [
  {
    id: "admissions",
    category: "ADMISSIONS",
    number: "56,880",
    label: "qualified from 179,694 candidates in 2026",
    context:
      "About 17,000 IIT seats. Postgraduates enter through GATE.",
  },
  {
    id: "research",
    category: "RESEARCH",
    number: "₹1,540",
    suffix: "Cr",
    label: "in research funding over three years",
    context:
      "2,000+ publications a year. C3iHub is now a national research park for cybersecurity.",
  },
  {
    id: "alumni",
    category: "ALUMNI",
    number: "44,000",
    suffix: "+",
    label: "alumni",
    context:
      "Includes Infosys co-founder N. R. Narayana Murthy (M.Tech, 1969) and Pawan Goenka (B.Tech, mechanical).",
  },
  {
    id: "placements",
    category: "PLACEMENTS",
    number: PLACEMENTS_HEADLINE,
    label: PLACEMENTS_LABEL,
    context:
      "From 250+ companies. Phase 1 closed 26 December 2025.",
  },
];
