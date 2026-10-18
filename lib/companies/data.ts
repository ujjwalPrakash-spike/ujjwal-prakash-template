// Content data and schema for the For Companies page.
// All text, links, and order ported verbatim from source.

import type { TextSegment } from "@/components/shared/ui/RichText";

export interface ProcedureStep {
  number: number;
  text: string;
}

export interface PolicyPoint {
  number: number;
  segments: TextSegment[];
}

export interface PolicyFootnote {
  marker: string;
  text: string;
}

export interface PolicyData {
  title: string;
  lead: TextSegment[];
  points: PolicyPoint[];
  footnote: PolicyFootnote;
}

export interface FacilityItem {
  id: string;
  segments: TextSegment[];
}

export interface ResourceItem {
  id: string;
  label: string;
  href?: string;
  external?: boolean;
}

export interface DeclarationItem {
  number: number;
  text: string;
  link?: {
    label: string;
    href: string;
  };
}

export interface ViolationGuideline {
  number: number;
  violation: string;
  action: string;
}

export interface CompanyFaqItem {
  id: string;
  question: string;
  answerSegments: TextSegment[];
  links?: { label: string; href: string }[];
}

// 1. Hero Content
export const COMPANIES_HERO_DATA = {
  eyebrow: "Students' Placement Office · Recruiters",
  titleLine1: "For",
  titleLine2: "companies",
  lead: "A collection of resources for companies to recruit at IIT Kanpur.",
  portalLoginUrl: "https://placement.iitk.ac.in/login",
  brochureUrl: "https://drive.google.com/file/d/1o7WZPfAJTp8gqzAysba2azJlmMhdacX6/view?usp=sharing",
} as const;

// 2. Procedure Steps (12 steps in exact source order)
export const PROCEDURE_STEPS: ProcedureStep[] = [
  {
    number: 1,
    text: "The Students' placement office appoints a point of contact(PoC) for you.",
  },
  {
    number: 2,
    text: "You will need to contact your PoC or any placement coordinators (or mail to spo@iitk.ac.in) for your account credentials on the Recruitment Automation system(RAS).",
  },
  {
    number: 3,
    text: "You need to fill out a Job Announcement Form (JAF) / Internship Proforma (IP) in the portal to share the offered profile details.",
  },
  {
    number: 4,
    text: "After verification of details by PoC, job/internship openings are visible on the portal as per dates decided by the placement team.",
  },
  {
    number: 5,
    text: "Students need to submit their resumes before the deadline set for the company on the RAS.",
  },
  {
    number: 6,
    text: "Companies conduct their PPT and tests/screening process after finalizing the schedule with the placement team.",
  },
  {
    number: 7,
    text: "The company submits the final list of shortlisted students for the interview process.",
  },
  {
    number: 8,
    text: "The placement office allots dates of interviews and PoC for the interview process.",
  },
  {
    number: 9,
    text: "Companies need to confirm the dates with the placement office over email.",
  },
  {
    number: 10,
    text: "Companies provide the list of selected and waitlisted students at the end of their interview slot.",
  },
  {
    number: 11,
    text: "The Placement office notifies the companies regarding the acceptance of selected students.",
  },
  {
    number: 12,
    text: "The company sends the offer letter to the selected candidates consistent with JAF/IP.",
  },
];

// 3. Placement Policy Data
export const PLACEMENT_POLICY_DATA: PolicyData = {
  title: "Placement Policy",
  lead: [
    "The Students' Placement Office follows a strict ",
    { text: '"One Student, One Job Policy"', strong: true },
    ". Once a student is offered a job, he/she is out of the placement process",
  ],
  points: [
    {
      number: 2,
      segments: [
        "On completion of the recruitment procedure, the company needs to submit the final list of offers in a closed envelope to the placement office. The offers will be opened at the end of the slot* when all companies finish their process",
      ],
    },
    {
      number: 3,
      segments: [
        "No ",
        { text: '"On the Spot"', strong: true },
        " offers should be made nor can any clue be given to any of the candidates during the placement interview.",
      ],
    },
    {
      number: 4,
      segments: [
        "In case a candidate receives multiple offers, the candidate has to make a choice at the end of the slot. The companies will be intimated about the final choice of the candidate two hours after the end of the slot, or receipt of the offers, whichever is later.",
      ],
    },
    {
      number: 5,
      segments: [
        "Since there is a high probability of multiple offers, the companies have to furnish a waiting list to the placement office along with the final offers. In case a student who is extended multiple offers chooses the other company, the first candidate in the waiting list moves up in the final offer list. The waitlist will not be disclosed to the students and will be released on a per student basis",
      ],
    },
    {
      number: 6,
      segments: [
        "Companies are advised to be in touch with the Placement volunteers and staff at all times. They should not entertain any direct contact from the students appearing in the placement process. In case of such a situation, the company must bring this immediately to the notice of the Placement Office.",
      ],
    },
    {
      number: 7,
      segments: [
        "In case of a delay of more than 60 days from the date of convocation (last week of June), the company has to pay the student the compensation for the delayed period.",
      ],
    },
  ],
  footnote: {
    marker: "*",
    text: "The slot allotted for the selection procedure by the placement office to the company is of 8 hrs. Although the companies are allowed to conduct tests beforehand to shortlist the candidates",
  },
};

// 4. Internship Policy Data
export const INTERNSHIP_POLICY_DATA: PolicyData = {
  title: "Internship Policy",
  lead: [
    "The Students' Placement Office follows a strict ",
    { text: '"One Student, One Job Policy"', strong: true },
    ". Once a student is offered a job, he/she is out of the internship process",
  ],
  points: [
    {
      number: 2,
      segments: [
        "On completion of the recruitment procedure, the company needs to submit the final list of offers in a closed envelope to the placement office. The offers will be opened at the end of the slot* when all companies finish their process",
      ],
    },
    {
      number: 3,
      segments: [
        "No ",
        { text: '"On the Spot"', strong: true },
        " offers should be made nor can any clue be given to any of the candidates during the placement interview.",
      ],
    },
    {
      number: 4,
      segments: [
        "In case a candidate receives multiple offers, the candidate has to make a choice at the end of the slot. The companies will be intimated about the final choice of the candidate two hours after the end of the slot, or receipt of the offers, whichever is later.",
      ],
    },
    {
      number: 5,
      segments: [
        "Since there is a high probability of multiple offers, the companies have to furnish a waiting list to the placement office along with the final offers. In case a student who is extended multiple offers chooses the other company, the first candidate in the waiting list moves up in the final offer list. The waitlist will not be disclosed to the students and will be released on a per student basis",
      ],
    },
    {
      number: 6,
      segments: [
        "Companies are always advised to be in touch with the Internship volunteers and staff. They should not entertain any direct contact from the students appearing in the internship process. In case of such a situation, the company must bring this immediately to the notice of the Placement Office.",
      ],
    },
    {
      number: 7,
      segments: [
        "The internship should be held during the period starting from 1st week of May 2022 to the 3rd week of July 2022.",
      ],
    },
  ],
  footnote: {
    marker: "*",
    text: "The slot allotted for the selection procedure by the Placement Office to the company is of 4-8 hours, depending upon the day of the week and the number of interviews to be conducted. Although the companies are allowed to conduct tests beforehand to shortlist the candidates.",
  },
};

// 5. Facilities List (8 items)
export const FACILITIES_DATA: FacilityItem[] = [
  {
    id: "fac-1",
    segments: [
      "Pickup services on payment basis from Lucknow(Amausi) Airport , Kanpur Airport and Kanpur Central Railway Station. Chopper rides from Lucknow Airport to IIT Kanpur campus can be availed on prior request to the Placement Office.",
    ],
  },
  {
    id: "fac-2",
    segments: [
      "Fully equipped Seminar and conference rooms for Group discussions and Personal Interviews.",
    ],
  },
  {
    id: "fac-3",
    segments: [
      "Centrally air conditioned Auditorium and Lecture halls, fully equipped with latest multimedia and Wi-Fi for Pre-Placement Talks(PPTs), Workshops, tests etc.",
    ],
  },
  {
    id: "fac-4",
    segments: [
      "Facility of Tele Conferencing and Video Conferencing.",
    ],
  },
  {
    id: "fac-5",
    segments: [
      "On campus accommodation in Visitors' Guest House for the recruiting panel ",
      { text: "(subject to availability)", small: true },
      ".",
    ],
  },
  {
    id: "fac-6",
    segments: [
      "Access to all student profiles via a highly efficient and effective Placement Automation System (PAS).",
    ],
  },
  {
    id: "fac-7",
    segments: [
      "Round the clock assistance by the students' volunteers at each level of placement process.",
    ],
  },
  {
    id: "fac-8",
    segments: [
      "Highly motivated and experienced staff to coordinate the whole process.",
    ],
  },
];

// 6. Resources List (8 items, with old hrefs)
export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: "res-jaf",
    label: "Job Announcement Form",
    href: "/assets/companies_links/IITK_JAF_Job_Announcement_Form_2024-25.docx",
    external: true,
  },
  {
    id: "res-ip",
    label: "Internship Proforma",
    href: "/assets/companies_links/Internship_Proforma 2024-25.docx",
    external: true,
  },
  {
    id: "res-placement-policy",
    label: "Placement Policy",
    href: "/assets/2023-24/Placement_Policy_2024-25.pdf",
    external: true,
  },
  {
    id: "res-internship-policy",
    label: "Internship Policy",
    href: "/assets/2023-24/Internship-Policy-2024-25.pdf",
    external: true,
  },
  {
    id: "res-brochure",
    label: "Campus Recruitment Brochure",
    href: "https://drive.google.com/file/d/1o7WZPfAJTp8gqzAysba2azJlmMhdacX6/view?usp=sharing",
    external: true,
  },
  {
    id: "res-recruitment-guide",
    label: "Campus Recruitment Guide",
    href: "/assets/companies_links/IITK_Recruitment_Guide_2022-23.pdf",
    external: true,
  },
  {
    id: "res-steps-registration",
    label: "Steps - Company Registration",
    href: "/assets/companies_links/Steps-Company-Registration.pdf",
    external: true,
  },
  {
    id: "res-dept-brochures",
    label: "Departmental Brochures",
    href: "/departmental-brochure",
    external: false,
  },
];

// 7. Declaration by Recruiters (Annexure 1 - 5 items)
export const DECLARATION_DOC_HREF = "/assets/companies_links/Annexure-1-Revised.docx";

export const DECLARATION_ITEMS: DeclarationItem[] = [
  {
    number: 1,
    text: "AIPC guidelines for the placement/ internship is provided in the link: https://aipciits.com/guidelines/ We have gone through the AIPC guidelines thoroughly and agree to abide by the guidelines during the entire process of placement/internship activities. In case of violation of guidelines by us, we understand that an appropriate action may be taken on us as per AIPC guidelines (click here to know the guidelines of AIPC regarding action to be taken for different violations).",
    link: {
      label: "AIPC Guidelines",
      href: "https://aipciits.com/guidelines/",
    },
  },
  {
    number: 2,
    text: "IIT ________ Recruiter's  Policy for the placement/ internship is provided in the link: ................................................... We have gone through the IIT ________ Recruiter's Policy thoroughly and agree to abide by the guidelines during the entire process of placement/ internship activities. In case of violation of guidelines by us, we understand that an appropriate action may be taken on us as per policy.",
  },
  {
    number: 3,
    text: "We declare that we would be providing the shortlisting criteria along with the CV-shortlisted and/or Test-shortlisted candidates. We also assure that the details of final shortlisted candidates will be provided within the 24 to 48 hours after the written test.",
  },
  {
    number: 4,
    text: "The information related to various job/intern profiles posted by us is verified and correct to the best of our knowledge, and the company will abide by the terms and conditions as outlined in these job/intern profiles posted while making the offers. No new clauses/ changes would be added/made in the final offer rolled out to the candidates selected on the profile(s). All details have already been outlined in the Job/ Internship Notification Forms. In the event of any discrepancy in the final offers, the company may be subject to appropriate actions in accordance with the placement/internship policy of the IIT ________  and AIPC guidelines.",
  },
  {
    number: 5,
    text: "We consent to sharing of company name, logo and email with national ranking agencies and government directives, and to listing company names in social media platforms and press/media.",
  },
];

// 8. Violation Guidelines by AIPC (Annexure 4 - 7 items)
export const VIOLATION_DOC_HREF = "/assets/companies_links/Annexure-4-Revised.docx";

export const VIOLATION_GUIDELINES: ViolationGuideline[] = [
  {
    number: 1,
    violation: "Companies revoking intern/job offers across all IITs",
    action: "Exclude/Pause such companies for two years in all IITs",
  },
  {
    number: 2,
    violation: "Companies partially revoking intern/job offers in some IITs",
    action: "Exclude/Pause such companies for one year in all IITs",
  },
  {
    number: 3,
    violation: "Companies reducing stipend/compensation or changing intern/job profiles",
    action: "Assign such companies not before D+2 slot in the upcoming year, where D represents the slot in which the respective company appeared in the previous year",
  },
  {
    number: 4,
    violation: "Companies delaying joining beyond September",
    action: "Allow such companies to participate inprocesses from January onwards of the next placement season, subject to all students having joined by December of the same year",
  },
  {
    number: 5,
    violation: "Companies delaying joining beyond December of the next year",
    action: "Do not allow such companies to participate in processes until the joining of students selected across all IITs is confirmed by AIPC.",
  },
  {
    number: 6,
    violation: "Companies not providing the shortlisting criteria of CV-shortlisted and test-shortlisted candidates",
    action: "Send a reminder(s) to receive the criteria. If details not provided despite repeated reminders, such companies will not be assigned before D+1 slot for the interview in the same year, where D represents the slot in which the respective company appeared in the previous year. In case the company is coming for the first time, then it will be given one day delayed slot than it could have been provided otherwise.",
  },
  {
    number: 7,
    violation: "Disparity in CTC offer across IITs",
    action: "Send an email seeking clarification on the disparity. If the clarification is not justified and the disparity is not resolved, such companies will be assigned delayed slot for the interview.",
  },
];

// 9. FAQs List (12 items in exact source order)
export const COMPANY_FAQS: CompanyFaqItem[] = [
  {
    id: "faq-1",
    question: "What are the different ways a company can hire students from the campus?",
    answerSegments: [
      "The different ways of recruiting students are: Campus Recruitment Program in which final year students participate. Summer Internship Program for pre final year students which can be converted into a pre placement offer.",
    ],
  },
  {
    id: "faq-2",
    question: "How can a company register itself for the Campus Recruitment Program?",
    answerSegments: [
      "To participate in the Campus Recruitment Program, a company must first contact the placement office or register on the website. The company is then sent the login details which would let them login in our Placement Automation System (PAS) enabling them to post job opportunities & see the profiles of students interested in their job opening. You can also find the detailed Placement Procedure ",
      { text: "here", strong: true },
      ".",
    ],
    links: [{ label: "here", href: "/recruiters/why-iitk#steps" }],
  },
  {
    id: "faq-3",
    question: "Is there any fee associated with the process?",
    answerSegments: [
      "No. There is no fees associated with the registration or the placement process.",
    ],
  },
  {
    id: "faq-4",
    question: "When does the recruitment program start?",
    answerSegments: [
      "The recruitment season is held in December every year and the PPT's can be held anytime between 10th of August to mid-November. For a detailed itinerary, Please refer to the Employer Calendar.",
    ],
  },
  {
    id: "faq-5",
    question: "What is the procedure to schedule a pre-placement talk (PPT)?",
    answerSegments: [
      "A company will only be allowed to hold its PPT after filling up the job announcement form. A typical pre placement session is scheduled for 60 minutes. In view of the academic calendar of the students, the session are scheduled between 6PM to 9PM on weekdays, and between 10AM and 5PM hours on Saturdays and Sundays. Student volunteers will get in touch with the company to fix a mutual convenient time for the session.",
    ],
  },
  {
    id: "faq-6",
    question: "What kind of information do the students expect in PPTs?",
    answerSegments: [
      "The pre-placement talk is a platform for interaction between the company and the students. The presentation is followed by a Q&A session where students interact with company officials to get a better understanding of the company and potential roles. The important insights that the students expect from the PPT are:\n• Profile and reputation of the corporation\n• Career roles and responsibilities offered in different types of profiles\n• Locations where the student is likely to be posted\n• Compensation packages",
    ],
  },
  {
    id: "faq-7",
    question: "On what basis is the slot allotted to a company for the final placement?",
    answerSegments: [
      "Slotting is done subject to the following parameters: Student Preferences, Work profile, Compensation package, Career Prospects, Student Intake, and Past relationship with IIT Kanpur.",
    ],
  },
  {
    id: "faq-8",
    question: "What are the infrastructural facilities available on the campus for the placement process?",
    answerSegments: [
      "The campus is equipped with state of the art communication, computing, and presentation facilities to facilitate a smooth placement process: Teleconferencing and video conferencing facility, Linux and windows lab for online tests, Centrally air conditioned auditorium, lecture halls, seminar and conference rooms for presentations, group discussions and interviews.",
    ],
  },
  {
    id: "faq-9",
    question: "Are there multiple companies recruiting in the same slot? How is the case of multiple offers resolved?",
    answerSegments: [
      "Yes, there are multiple companies recruiting in the same slot. The results of all the companies are announced at the end of the slot and if a student gets multiple offers then he is allowed to choose between one of them and inform the office of his decision before the beginning of the next slot.",
    ],
  },
  {
    id: "faq-10",
    question: "Can a company interview the students already placed in other company?",
    answerSegments: [
      "IIT Kanpur follows a One student; One job policy so once the job is registered against the student, he/she is not entitled to sit for any other company.",
    ],
  },
  {
    id: "faq-11",
    question: "Is there any facility for the accommodation available on the campus?",
    answerSegments: [
      "On campus accommodation on payment basis in visitors' guest house is available subject to availability. For alternate arrangements, the list of hotels is available through the placement office.",
    ],
  },
  {
    id: "faq-12",
    question: "How can one commute between the campus & airport/railway station?",
    answerSegments: [
      "The campus taxi service providers can be contacted for the same at the following numbers:\n• Trimurti Travels - Mr Surender Yadav - 0512-259 5094\n• Yadav Travels - Mr Rajpal Yadav - 0512-259 5095 - (Mobile : 93362 17156)\n\nThe list of institute approved taxi operators can be found at the document link below, and approved rates are available for reference.",
    ],
    links: [
      { label: "Approved Taxi Operators (PDF)", href: "/assets/taxi_details.pdf" },
      { label: "Approved Taxi Rates (PDF)", href: "/assets/taxi_rates.pdf" },
    ],
  },
];
