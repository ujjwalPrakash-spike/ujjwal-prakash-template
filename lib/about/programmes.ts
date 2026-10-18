/**
 * All 9 academic programmes ported verbatim from the old About page.
 * To reorder or add programmes: edit the ACADEMIC_PROGRAMMES list.
 */

export interface AcademicProgramme {
  id: string;
  name: string;
  admission?: string;
  duration?: string;
  eligibility?: string;
  internships?: string;
  description: string;
  example?: string;
}

export const ACADEMIC_PROGRAMMES: AcademicProgramme[] = [
  {
    id: "btech-bs",
    name: "B.Tech / B.S.",
    admission: "Joint Entrance Exam (JEE) Advanced",
    duration: "4 years",
    internships: "Upto 5 internships of 1-3 months (voluntary)",
    description:
      "Includes a core programme common to all students; provides a foundation in introductory Mathematics, Physics, Chemistry, Engineering Sciences, Technical Arts and Humanities and Social Sciences, and professionally trains the students in their individual disciplines.",
  },
  {
    id: "minor",
    name: "Minor",
    description:
      "Our B.Tech/B.S. students can take 3 or 4 courses to gain specialization in a specific field of a department, other than their parent departments to get a minor.",
    example: "BS in Mathematics and Scientific Computing with a minor in Economics.",
  },
  {
    id: "dual-degree",
    name: "Bachelor-Master Dual Degree",
    duration: "5 years",
    description:
      "Our B.Tech/B.S. students can choose to convert to a dual degree (with Masters in the parent or any other department) till the end of 7th semester. Two degrees (BTech/BS+MTech/MS) are awarded at the end of 5-year coursework. No student is initially admitted in a dual degree program because we believe it is too early for them to decide their specializations. We want them to get a flavour of the department before they make such a crucial choice.",
    example: "BS in Mathematics and Scientific Computing with MS in Economics.",
  },
  {
    id: "double-major",
    name: "Double Major",
    duration: "5 years",
    description:
      "Our B.Tech/B.S. students can major in 2 departments, meaning a B Tech/BS degree in parent department along with a second major in department of their choice, in duration of 5 years. This requires the student to complete all department core courses of their second major.",
    example: "BS in Mathematics and Scientific Computing with second major in Economics.",
  },
  {
    id: "msc",
    name: "M.Sc.",
    admission: "Joint Admission Test for M.Sc. (JAM)",
    duration: "2 years",
    eligibility: "Student with B.Sc.(Hons.)",
    description:
      "Offered in Physics, Chemistry, Mathematics and Statistics. M.Sc. students of The Department of Physics are allowed to continue for a Ph.D.",
  },
  {
    id: "mtech-msr",
    name: "M.Tech. / M.S.(R)",
    admission: "Graduate Aptitude Test in Engineering (GATE)",
    duration: "2 years",
    description:
      "Acquaints the students with the various aspects of engineering through several courses, both introductory and in the specialized area followed by research, leading to a thesis on a topic in their area of specialization.",
  },
  {
    id: "phd",
    name: "Ph.D.",
    description:
      "The Ph.D. program is aimed and designed to facilitate students in acquiring proficiency in the chosen area through coursework with a creative ability to solve new problems and a capacity to learn continually and interact with multidisciplinary groups, followed by doctoral research. PhD program is offered in all disciplines of Sciences, Engineering, Humanities & Social Sciences, and Management.",
  },
  {
    id: "mba",
    name: "M.B.A.",
    admission: "Joint Management Entrance Test (JMET)",
    duration: "2 years",
    description:
      "Carefully structured and integrated with classroom teaching, case discussions, hands-on industry experience with internship and project work. Continuous industrial interaction, seminars and live projects are a part of the curriculum.",
  },
  {
    id: "mdes",
    name: "Master of Design (M.Des.)",
    admission: "Common Entrance Exam for Design (CEED)",
    duration: "2 years",
    description:
      "The programme is interdisciplinary in nature with a strong emphasis on a balanced curriculum of theory and practice. The programme has three sub-groups: Product Design, User Interface Design and Visual Communication Design. Students are required to conduct a project and prepare a thesis as a part of their curriculum. Various workshops are also held to broaden the outlook of students and also in helping them in deciding their career.",
  },
];
