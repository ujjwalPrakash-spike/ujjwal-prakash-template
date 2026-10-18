/**
 * 7 Faculty Awards ported verbatim from the old About page.
 * To modify or add awards: update FACULTY_AWARDS below.
 */

export interface FacultyAward {
  id: string;
  name: string;
}

export const FACULTY_AWARDS: FacultyAward[] = [
  { id: "01", name: "Padma Vibhushan" },
  { id: "02", name: "Padmashree" },
  { id: "03", name: "S. S. Bhatnagar (more than ten in number)" },
  { id: "04", name: "Fellowship of Indian Academy of Engineering" },
  { id: "05", name: "Fellowship of Indian Academy of Science" },
  { id: "06", name: "Fellowship of National Academy of Science" },
  { id: "07", name: "Humboldt and JSPS Fellowships" },
];
