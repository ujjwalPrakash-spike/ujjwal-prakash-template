// Structured data and messages for IIT Kanpur leadership (Director, Chairperson, Vice Chairperson).

export interface LeadershipMessage {
  id: string;
  index: string;
  roleTag: string;
  title: string;
  quote: string;
  name: string;
  designation: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  cardBg: string;
  accentColor: string;
  borderAccent: string;
}

export interface LeadershipSectionData {
  sectionIndex: string;
  sectionTag: string;
  heading: string;
  subheading: string;
  messages: LeadershipMessage[];
}

export const LEADERSHIP_SECTION_DATA: LeadershipSectionData = {
  sectionIndex: "02",
  sectionTag: "LEADERSHIP MESSAGES",
  heading: "Voices of Leadership",
  subheading:
    "Guiding the vision of excellence, multidisciplinary innovation, and nation-building at the Indian Institute of Technology Kanpur.",
  messages: [
    {
      id: "director",
      index: "01",
      roleTag: "DIRECTOR'S MESSAGE",
      title: "Nurturing Cherry-Picked Talent & Visionary Leadership",
      quote:
        "Since its advent, IIT Kanpur has had the vision to provide quality technical education and act as a rostrum for scientific research, as well as a mission to develop human potential to the greatest degree. In accordance with this vision, IIT Kanpur has maintained an exemplary record of academic contribution for achieving excellence in teaching, research, and governance. The students of IITK are a cherry-picked group, chosen through a process that makes IITK one of the toughest institutes to get an admission.",
      name: "Prof. Manindra Agrawal",
      designation: "Director, IIT Kanpur",
      imageSrc: "/testimonials/dir.jpg",
      imageAlt: "Director of IIT Kanpur",
      href: "/director-message",
      cardBg: "bg-[#0b1329]",
      accentColor: "#38bdf8",
      borderAccent: "border-white/10",
    },
    {
      id: "chairperson",
      index: "02",
      roleTag: "CHAIRPERSON'S MESSAGE",
      title: "Bridging Academic Mastery with Global Industry Needs",
      quote:
        "Indian Institute of Technology Kanpur, established in 1959, aims to create, disseminate, and translate knowledge in science, engineering and allied disciplines that serve society. We at IITK prioritize the 360-degree development of students to meet global standards. Our education goes over and beyond classroom lectures. In this regard, the Students' Placement Office (SPO) takes utmost care to groom students according to the evolving needs of the global industry.",
      name: "Chairperson, SPO",
      designation: "Students' Placement Office, IIT Kanpur",
      imageSrc: "/testimonials/chairperson2026.jpeg",
      imageAlt: "Chairperson of Students' Placement Office",
      href: "/chairman-message",
      cardBg: "bg-[#0b1329]",
      accentColor: "#38bdf8",
      borderAccent: "border-white/10",
    },
    {
      id: "vice-chairperson",
      index: "03",
      roleTag: "VICE CHAIRPERSON'S MESSAGE",
      title: "Connecting Visionary Talent with World-Class Opportunity",
      quote:
        "At IIT Kanpur, we emphasize holistic education that goes far beyond conventional academics. Our students are trained to think critically, innovate responsibly, and adapt confidently in an ever-evolving global landscape. Equal importance is given to technical proficiency, professional skills, and personal growth, ensuring that our graduates are well-prepared to excel in diverse environments. Join hands with IIT Kanpur and be a part of shaping the future.",
      name: "Vice Chairperson, SPO",
      designation: "Students' Placement Office, IIT Kanpur",
      imageSrc: "/testimonials/vc2026.jpeg",
      imageAlt: "Vice Chairperson of Students' Placement Office",
      href: "/vice-chairman-message",
      cardBg: "bg-[#0b1329]",
      accentColor: "#38bdf8",
      borderAccent: "border-white/10",
    },
  ],
};
