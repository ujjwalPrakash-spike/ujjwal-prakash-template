/**
 * Student councils and festivals ported verbatim from the old About page.
 * To reorder or modify: edit STUDENT_COUNCILS and CAMPUS_FESTIVALS below.
 */

export interface StudentCouncil {
  id: string;
  title: string;
  logo: string;
  alt: string;
  description: string;
}

export interface CampusFestival {
  id: string;
  title: string;
  logo: string;
  alt: string;
  description: string;
}

export const STUDENT_COUNCILS: StudentCouncil[] = [
  {
    id: "snt",
    title: "Science & Technology",
    logo: "/images/about/logos/snt.jpeg",
    alt: "Science and Technology Council logo",
    description:
      "Our Science and Technology Council connects student activity to the broader technological forum. We Invest in our students right from the first year, guiding them through workshops and events, and developing their technical skills. In this process, we also plan and implement projects that address modern challenges in science and technology.",
  },
  {
    id: "games",
    title: "Games & Sports",
    logo: "/images/about/logos/games.jpeg",
    alt: "Games and Sports Council logo",
    description:
      "Our Games and Sports Council has always been in front for the all-round development of our people, by constant persuasion of professional coaches. We strive for nurturing the spirit of sportsmanship amongst our students, for building their self-confidence and to emerge as winners. We have facilities of international standards to create an amazing atmosphere for sports and consequently our students have created a streak of winning the last three Inter IIT Sports Meets. The council regularly organises competitive and non-competitive events for promoting sports.",
  },
  {
    id: "mnc",
    title: "Media and Culture",
    logo: "/images/about/logos/mnc.jpeg",
    alt: "Media and Cultural Council logo",
    description:
      "Our Media and Cultural Council keeps busy throughout the year. On an annual calendar punctuated by scores of workshops and classes, the Council marks its platforms to pursue various cultural endeavours. The students train themselves to perform before audiences and to understand and appreciate different cultural elements and trends. The Council also promotes competitions with other prime colleges in inter collegiate cultural festivals.",
  },
  {
    id: "ecell",
    title: "Entrepreneurial Activities",
    logo: "/images/about/logos/ecell.jpeg",
    alt: "Entrepreneurship Cell logo",
    description:
      "IIT Kanpur works hard towards imbibing an entrepreneurial drive among its students. The institute along with the students run E-Cell and conduct activities. These activities include technical & non-technical workshops, hackathons, lectures and hangouts with eminent entrepreneurs. On campus incubation centres, regular alumni mentorship and a reliable pipeline for funding make the institute a thriving entrepreneurial center.",
  },
  {
    id: "vox",
    title: "Vox Populi",
    logo: "/images/about/logos/vox.jpeg",
    alt: "Vox Populi editorial advisory board pen logo",
    description:
      "It was envisioned as an advisory board which would give advice and help to different publications and editorials in the institute. Through this forum, editors can channelize their thoughts, bring up more ideas and publicize their work. It tends to serve as a common platform where people share ideas to improve and streamline their publications.",
  },
];

export const CAMPUS_FESTIVALS: CampusFestival[] = [
  {
    id: "techkriti",
    title: "Techkriti",
    logo: "/images/about/logos/techkriti.jpeg",
    alt: "Techkriti annual technical and entrepreneurial festival logo",
    description:
      "IITK has a unique intellectual mix. IIT Kanpur's annual Technical & Entrepreneurial Techkriti was first organized in 1955. Today, it is one of the Largest of its kind in Asia, attracting competitors from all corners of India and from various places around the world. Apart from the cut-throat competition of exotic softwares, erudite electronic gizmos and robust robots, we have had guest lectures and talks that include names such as Marshall Strabala, Jeff Lieberman, Dr. Richard Stallman, Dr. APJ Abdul Kalam, Alvin E. Roth, and Wing Commander Rakesh Sharma among others.",
  },
  {
    id: "antaragni",
    title: "Antaragni",
    logo: "/images/about/logos/antaragni.jpeg",
    alt: "Antaragni cultural festival logo",
    description:
      '"Unleash the Fire Within". Antaragni was born in 1966 as the Cult fest (a generic name for the first and only event of its kind then). The festival is in its 54th edition and has became a permanent fixture in the cultural calendars of all the premier colleges of India. Antaragni\'s multihued competitions are contested by the leading teams of these colleges. Our shows cover the traditional arts with the modern reimaginations, the Indian roots with the foreign influences, and the glamorous lifestyle with the socially relevant themes. The issues we raise resonate in the panel discussions in this four-day long festival.',
  },
  {
    id: "udghosh",
    title: "Udghosh",
    logo: "/images/about/logos/udghosh.jpeg",
    alt: "Udghosh annual sports meet logo",
    description:
      "This is the annual sports meet of IIT Kanpur. It is an exhibition of sporting fervour, and success in the meet has been ratified by the success of many of its winners higher up in the sporting hierarchy. It offers a common platform for the students of numerous educational institutions from all over the country to exhibit and hone their skills in the sport arena. It attracts huge participation under its banner from across the country. The institute has, in all, four sprawling well-maintained grounds. This includes two cricket grounds, one for football, and one for Hockey, volley courts, two basketball courts, complete with night-lights and seating facility.",
  },
];
