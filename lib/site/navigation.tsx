import React from "react";
import {
  IconBuilding,
  IconSchool,
  IconFlask,
  IconUsers,
  IconAward,
  IconCalendar,
  IconBook,
  IconShieldCheck,
  IconBriefcase,
  IconChartBar,
  IconCompass,
  IconFileText,
  IconPhoneCall,
} from "@tabler/icons-react";

export interface SubNavItem {
  title: string;
  href: string;
  description?: string;
  external?: boolean;
  icon: React.ReactNode;
}

export interface NavSection {
  title: string;
  items: SubNavItem[];
  featuredLink?: {
    label: string;
    href: string;
  };
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "About IITK",
    items: [
      {
        title: "About IITK",
        href: "/about",
        description: "Heritage, mission, and legacy of excellence.",
        icon: <IconBuilding size={16} />,
      },
      {
        title: "Academics",
        href: "/about#academics",
        description: "Flexible curriculum and distinguished faculty.",
        icon: <IconSchool size={16} />,
      },
      {
        title: "Research & Development",
        href: "/about#research",
        description: "Cutting-edge breakthroughs and national labs.",
        icon: <IconFlask size={16} />,
      },
      {
        title: "Alumni Network",
        href: "/about#alumni",
        description: "Global leaders across technology and academia.",
        icon: <IconUsers size={16} />,
      },
      {
        title: "Faculty Mentors",
        href: "/about#faculty",
        description: "Pioneering educators and researchers.",
        icon: <IconAward size={16} />,
      },
      {
        title: "Campus Life & Fests",
        href: "/about#activities",
        description: "Leadership, cultural fests, and student clubs.",
        icon: <IconCalendar size={16} />,
      },
    ],
    featuredLink: {
      label: "Explore Academic Programs →",
      href: "/about#academics",
    },
  },
  {
    title: "For Students",
    items: [
      {
        title: "For Students Overview",
        href: "/students",
        description: "Launchpad, procedure, documents, and preparation roadmaps.",
        icon: <IconCompass size={16} />,
      },
      {
        title: "Placement Procedure",
        href: "/students#steps",
        description: "Official step-by-step registration and offer flow.",
        icon: <IconBook size={16} />,
      },
      {
        title: "Student Resources",
        href: "/students#resources",
        description: "Official guidelines, policies, waivers, and PVF forms.",
        icon: <IconShieldCheck size={16} />,
      },
      {
        title: "Preparation Roadmaps",
        href: "/students#prepRoadmaps",
        description: "Departmental roadmaps for core, SDE, analyst, and PM.",
        icon: <IconChartBar size={16} />,
      },
      {
        title: "SPO Insights",
        href: "/insights",
        description: "Interview experiences and preparation strategies from IITK seniors.",
        icon: <IconBriefcase size={16} />,
      },
      {
        title: "Career Development Service",
        href: "https://www.iitk.ac.in/cds/",
        description: "Soft skills, guidance, and counseling sessions.",
        external: true,
        icon: <IconCompass size={16} />,
      },
    ],
    featuredLink: {
      label: "Explore All Student Resources →",
      href: "/students",
    },
  },
  {
    title: "For Recruiters",
    items: [
      {
        title: "Why Recruit IITK",
        href: "/recruiters/why-iitk",
        description: "World-class talent, rigor, and innovation.",
        icon: <IconAward size={16} />,
      },
      {
        title: "Job Announcement Form (JAF)",
        href: "/recruiters/why-iitk#resources",
        description: "Submit recruitment openings and requirements.",
        icon: <IconFileText size={16} />,
      },
      {
        title: "Recruiter Brochure",
        href: "/brochure",
        description: "Comprehensive information and institute highlights.",
        icon: <IconBuilding size={16} />,
      },
      {
        title: "Recruiting Facilities",
        href: "/recruiters/why-iitk#facilities",
        description: "Interview rooms, online proctoring, and logistics.",
        icon: <IconBriefcase size={16} />,
      },
    ],
    featuredLink: {
      label: "Download Placement Brochure →",
      href: "/brochure",
    },
  },
  {
    title: "Contact Us",
    items: [
      {
        title: "Placement Coordinators",
        href: "/placement-coordinators",
        description: "Connect with the overall student coordinators team.",
        icon: <IconUsers size={16} />,
      },
      {
        title: "SPO Office Staff",
        href: "/contact/office",
        description: "Administrative staff and official office contacts.",
        icon: <IconPhoneCall size={16} />,
      },
      {
        title: "Reach IIT Kanpur",
        href: "/contact/reach-us",
        description: "Campus location, transport, and travel advisory.",
        icon: <IconCompass size={16} />,
      },
    ],
    featuredLink: {
      label: "Connect with Placement Team →",
      href: "/contact",
    },
  },
];
