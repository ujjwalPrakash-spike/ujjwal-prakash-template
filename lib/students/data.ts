// For Students datasets and configuration.
// Ported verbatim from the Students page source.

export interface StudentProcedureStep {
  step: string;
  title: string;
  text: string;
}

export interface StudentResource {
  name: string;
  link: string;
  group: "Policies" | "Forms" | "Previous years";
}

export interface StudentRoadmap {
  name: string;
  link: string;
  group: "Core branches" | "Tracks";
}

export interface StudentFaq {
  question: string;
  answer: string;
}

export const STUDENT_HERO_DATA = {
  eyebrow: "Students' Placement Office",
  titlePart1: "For",
  titlePart2: "students",
  lead: "A collection of resources for students at IIT Kanpur.",
  // TODO: Add notice text here when an active announcement needs to be displayed.
  notice: "",
} as const;

export const STUDENT_PROCEDURE_STEPS: StudentProcedureStep[] = [
  {
    "step": "01",
    "title": "Master Resume Submission",
    "text": "You must prepare a master resume and submit it by the specified deadline."
  },
  {
    "step": "02",
    "title": "Proofs & Project Verification Forms",
    "text": "Before the deadline, the Students' Placement Office must receive the proofs justifying each point in your resume as well as PVFs (Project Verification Forms) from the project or internship mentor."
  },
  {
    "step": "03",
    "title": "RAS Portal Registration",
    "text": "You must register on the Recruitment Automation System (RAS) within the specified timeframe as notified by SPO."
  },
  {
    "step": "04",
    "title": "Upload Resumes",
    "text": "After you've registered, you are supposed to upload all one/two page resumes on the portal."
  },
  {
    "step": "05",
    "title": "PoC Allotment",
    "text": "The Students' Placement Office appoints a point of contact (PoC) for your resume verification."
  },
  {
    "step": "06",
    "title": "Verification Time Window",
    "text": "You would be assigned a time window during which the allotted POC would verify your resume."
  },
  {
    "step": "07",
    "title": "Apply to Companies",
    "text": "Once your resume has been verified, you may begin applying to companies on the RAS in which you are eligible."
  },
  {
    "step": "08",
    "title": "Hiring Events Attendance",
    "text": "Following your application, you must attend all of the company's hiring events (PPTs / Tests / GDs)."
  },
  {
    "step": "09",
    "title": "Offer & Freezing",
    "text": "If you get an offer from a company, the SPO would notify you and your account would be frozen."
  }
];

export const STUDENT_RESOURCES: StudentResource[] = [
  {
    "name": "Deferred Placement Policy",
    "link": "/docs/2021-22/deferred_placement_policy.pdf",
    "group": "Policies"
  },
  {
    "name": "Placement Policy",
    "link": "/assets/2023-24/Placement_Policy_2024-25.pdf",
    "group": "Policies"
  },
  {
    "name": "Internship Policy",
    "link": "/assets/2023-24/Internship-Policy-2024-25.pdf",
    "group": "Policies"
  },
  {
    "name": "Leave Application",
    "link": "/docs/2021-22/LAF.doc",
    "group": "Forms"
  },
  {
    "name": "Project Verification Form",
    "link": "/docs/2021-22/PVF.doc",
    "group": "Forms"
  },
  {
    "name": "PPT Absence Form",
    "link": "https://docs.google.com/forms/d/e/1FAIpQLSdV3sWKB-GSbFNkHdGSSP7N4ydybbFYumTjBSIAaZw04Na-xQ/viewform",
    "group": "Forms"
  },
  {
    "name": "Corporate Internship Waiver Form",
    "link": "https://docs.google.com/document/d/1zQg3xr6Ca0jHFWPn6o2ZCyi7ypxtjdFoYdIT4pZwncc/edit",
    "group": "Forms"
  },
  {
    "name": "List of Companies",
    "link": "/docs/2021-22/List-of-companies.pdf",
    "group": "Forms"
  },
  {
    "name": "Previous Year Internship Proforma",
    "link": "/proformas/intern",
    "group": "Previous years"
  },
  {
    "name": "Previous Year Placement Proforma",
    "link": "/proformas/placement",
    "group": "Previous years"
  }
];

export const STUDENT_ROADMAPS: StudentRoadmap[] = [
  {
    "name": "Mechanical Core",
    "link": "/assets/ME Core Roadmap.pdf",
    "group": "Core branches"
  },
  {
    "name": "Electrical Core",
    "link": "/assets/final_roadmap__EE.pdf",
    "group": "Core branches"
  },
  {
    "name": "Analyst",
    "link": "/assets/Roadmap_Analytics.pdf",
    "group": "Tracks"
  },
  {
    "name": "Product Management",
    "link": "/assets/Roadmap_PM_New.pdf",
    "group": "Tracks"
  },
  {
    "name": "SDE",
    "link": "/assets/Roadmap_SDE.pdf",
    "group": "Tracks"
  },
  {
    "name": "Consulting",
    "link": "/assets/Roadmap_Consulting.pdf",
    "group": "Tracks"
  },
  {
    "name": "MSE Core",
    "link": "/assets/Roadmap_MSE.pdf",
    "group": "Core branches"
  },
  {
    "name": "CHE Core",
    "link": "/assets/ROADMAP FOR CHE CORE (3).pdf",
    "group": "Core branches"
  },
  {
    "name": "AE Core",
    "link": "/assets/Roadmap_AE.pdf",
    "group": "Core branches"
  }
];

export const STUDENT_FAQS: StudentFaq[] = [
  {
    "question": "What are the restrictions on resume format?",
    "answer": "There are no restrictions on the resume format barring a few mentioned below. The top heading of your resume should be your Name, Department, year of study, and contact information. A table of educational qualifications should follow it including 10th, 12th marks, and CPI(UG and PG both if applicable) in reverse chronological order."
  },
  {
    "question": "What should be the name of the resume file (one page)?",
    "answer": "The resume file should be named as RollNumber_Name__Program_Department_ResumeNumber. For example, a student with the following details: Roll number: 190351, Name: Gyanendra Kumar, Program - BTech(BT), Department : Mechanical(ME) should name the resume files as 190351_Gyanendra_BT_ME_1, 190351_Gyanendra_BT_ME_2, 190351_Gyanendra_BT_ME_3."
  },
  {
    "question": "How to mention JEE Mains/JEE Adv/any other examination ranks or other scholastic achievements in my resume?",
    "answer": "JEE Mains/JEE Adv. ranks have to be mentioned in the numbers, not percentile. For eg, AIR 1234 in JEE Mains 2019. If someone wants to mention their rank in their department, a mail from the HoD of the department is required. Definitely mention the year of Activity or Achievement."
  },
  {
    "question": "I don't have any proof for some points on my resume, but I can provide them after campus reopens. What should I do?",
    "answer": "[Please note that the below exceptions are only allowed for Scholastic and Extracurricular Achievements.]\\nFor verification of 10th marks, 12th marks, and JEE ranks, a google form will be circulated through mail.All the students will need to fill out that for\\nFor the verification of any other scholastic achievements(if you do not have a scanned copy of the documents with you), you need to fill the following undertaking and include it in the zip file of proofs, to be sent to spoproofs2022@gmail.com. Undertaking Form[bit.ly/spoundertaking] These details will be cross- verified in the future and any discrepancy will be dealt with according to SPO policy.The points on your resume for which you will provide the undertaking should be # marked with a footnote 'not verified by SPO'. Such points should be given a # mark and a footnote only on the Master Resume, which is not visible to the company officials, and not on the one - page resumes, to be uploaded on the portal."
  },
  {
    "question": "When is a Project Verification Form (PVF) required?",
    "answer": "A PVF is needed to be signed by your mentor for any intern/project done under an IITK professor or any external organization (no PVF is needed for projects under institute clubs or course projects). Kindly ask your mentor/ Guide to send the filled PVF from his / her official email address to spoproofs2022@gmail.com.Only PVFs received on the given ID will be considered.Also, ask your mentor to mark you in cc.The PVF can be downloaded from here(spo.iitk.ac.in/docs/2021-22/PVF.doc). The subject and content of the project written on your resume should match that written on the PVF."
  },
  {
    "question": "How will my PoR/projects under the institute clubs be verified?",
    "answer": "PoR and projects under Clubs/ Teams of IITK (summer projects as well) will be ratified through the lists sent by PSG, Senate Chairperson, MnC Gensec, or SnT Gensec."
  },
  {
    "question": "I have some Self projects, how will they be verified?",
    "answer": "For verification of such projects, one has to submit codes/git repo links/ (or any other proof ) as deemed necessary.You will have to clearly mention that the project is a self-project."
  },
  {
    "question": "How to verify online courses/online projects?",
    "answer": "For verification of online courses/online projects, you will need to submit the pdf certificate issued by the concerned organization. While mentioning the same on your resume, you will have to specify that the course/project was an online course/project."
  },
  {
    "question": "Is proof required for Extracurricular points?",
    "answer": "The proof is not required for points under this heading unless they specify a certain position ex. Got 2nd place in School debate competitions."
  },
  {
    "question": "My internship/project is ongoing and will not be finished before resume submission. What should I do?",
    "answer": "Fill up the PVF with whatever work has been completed and ask your mentor to sign and send it to spoproofs2022@gmail.com.You will have to mention in the resume that the internship/project is ongoing."
  },
  {
    "question": "Can I update my resume after the deadline?",
    "answer": "No, after the resume has been verified it will not be changed. The resume can only be updated in Phase-2 of the internship/placement season."
  },
  {
    "question": "Will the Summer CPI be included?",
    "answer": "Whatever CPI is there on Pingala during resume verification will be taken as final."
  }
];

export const RESUME_NOTE: { prefix: string; text: string; linkText: string; linkHref: string } = {
  prefix: "NOTE:",
  text: " Whenever you send a mail containing proofs/PVFs or anything related to resume submission, kindly ensure that the subject contains your roll number. For detailed guidelines and recommendations on resume making, all the students are advised to visit this ",
  linkText: "link",
  linkHref: "https://docs.google.com/document/d/113Gqoz3X4ZMAybflQi2LkI2DbY7ULgyZ8mwS-QcE68s/edit?usp=sharing",
};

export const STUDENT_CLOSING_DATA = {
  heading: "Looking for experiences from other students?",
  linkText: "SPO Insights",
  linkHref: "/insights",
} as const;
