/**
 * 15 Centres and facilities ported verbatim from the old About page.
 * To reorder or add centres: edit the RESEARCH_CENTRES list.
 */

export interface ResearchCentre {
  id: string;
  name: string;
}

export const RESEARCH_CENTRES: ResearchCentre[] = [
  { id: "01", name: "FlexE" },
  { id: "02", name: "NWTF" },
  { id: "03", name: "SBERTC" },
  { id: "04", name: "Flight Lab" },
  { id: "05", name: "Tinkering Labs" },
  { id: "06", name: "Centre for Mechatronics" },
  { id: "07", name: "Centre for Cyber security" },
  { id: "08", name: "Thematic Unit of Excellence" },
  { id: "09", name: "Engine Research Laboratory" },
  { id: "10", name: "Centre for Laser Technology" },
  { id: "11", name: "Real Time Digital Simulation Centre" },
  { id: "12", name: "Advanced Centre for Materials Science" },
  { id: "13", name: "Advance Centre for Electronic Systems" },
  { id: "14", name: "SAMTEL Centre for Display Technology" },
  { id: "15", name: "BSNL-IITK Telecom Centre of Excellence" },
];
