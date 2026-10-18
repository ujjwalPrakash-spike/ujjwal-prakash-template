// Section definitions and navigation anchors for the For Companies page.

export interface CompanyNavSection {
  id: string;
  label: string;
}

export const COMPANY_SECTIONS: readonly CompanyNavSection[] = [
  { id: "steps", label: "Procedure" },
  { id: "policy", label: "Placement Policy" },
  { id: "ipolicy", label: "Internship Policy" },
  { id: "facilities", label: "Facilities" },
  { id: "resources", label: "Resources" },
  { id: "declaration", label: "Declaration by Recruiters" },
  { id: "violation", label: "Violation Guidelines by AIPC" },
  { id: "faqs", label: "FAQs" },
] as const;
