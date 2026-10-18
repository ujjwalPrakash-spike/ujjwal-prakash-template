/**
 * Verbatim text and section definitions for the About page.
 * All paragraphs and titles are sourced directly from the old SPO website.
 */

export const ABOUT_SECTIONS = [
  { id: "about", index: "01", label: "About IITK" },
  { id: "academics", index: "02", label: "Academics" },
  { id: "research", index: "03", label: "Research" },
  { id: "alumni", index: "04", label: "Alumni" },
  { id: "faculty", index: "05", label: "Faculty" },
  { id: "activities", index: "06", label: "Students' Life" },
] as const;

export const ABOUT_HERO_CONTENT = {
  eyebrow: "Students' Placement Office · About",
  title: "IIT Kanpur",
  subcopy:
    "The Institute has earned a superb academic reputation globally in its continuous endeavour to achieve excellence in undergraduate and postgraduate education and research.",
};

export const ABOUT_INTRO_CONTENT = {
  id: "about",
  index: "01",
  title: "About IIT Kanpur",
  quote:
    "Indian Institute of Technology Kanpur is one of the premier institutions established by the Government of India in 1959.",
  paragraphs: [
    "Indian Institute of Technology Kanpur is one of the premier institutions established by the Government of India in 1959. The aim of the Institute is to provide meaningful education, conduct original research of the highest standard and provide leadership in technological innovation.",
    "Consistently ranked amongst the top 5 engineering institutes in India over past several decades, IIT Kanpur offers courses in sciences, engineering, humanities and management. The students get the best of opportunities in the form of highly advanced courses, eminent faculty members, well-equipped laboratories, library, hostels and state of the art facilities to excel in research and development.",
    "The selection procedures for students at undergraduate, postgraduate and PhD levels are highly stringent so that IIT gets the best brains of India. Highly scientific and innovative technology is used for teaching and conducting research activities.",
    "Every year IIT Kanpur is enriched by the laurels brought by its faculty members and the students in the form of research publications, sponsored projects, fellowships and industrial consultancies. Many of our alumni are leaders in academia and industry around the globe. The sprawling IIT Kanpur campus is located in the industrial city of Kanpur, only a few hours away from New Delhi, the Capital of India.",
  ],
  image: {
    src: "/images/about/AboutIITK.jpg",
    alt: "IIT Kanpur iconic stone campus entrance wall",
  },
};

export const ACADEMICS_CONTENT = {
  id: "academics",
  index: "02",
  title: "Academics at IIT Kanpur",
  lead: "Academics at IIT Kanpur empowers the students with scientific temperament and knowledge in diverse disciplines of science, engineering, management, and humanities and social sciences. The pedagogy at IIT Kanpur teaches the students to take an approach led by critical thinking to solve technologically challenging problems. The globally acclaimed education prepares the students for rewarding and exciting careers. The excellent education has enabled the alumni to succeed in diverse fields.",
  image: {
    src: "/images/about/students.jpg",
    alt: "IIT Kanpur lecture theatre with faculty and students",
  },
};

export const RESEARCH_CONTENT = {
  id: "research",
  index: "03",
  title: "Research and Development",
  paragraphs: [
    "IIT Kanpur has always been among the pioneers in new research fields. The institute has coped with the changing times and requirements of R&D by enhancing its interaction with industries, working on projects that aim to advance the existing technologies and expanding the scope of the research work beyond patents and publications.",
    "Our labs are equipped with industry grade equipments. Our lecture halls incorporate excellent audio-visual aids. We accommodate a great team of professors and professionals pushing frontiers in science and technology. They carry the banners of our excellent research quality standards.",
  ],
  image: {
    src: "/images/about/Research.jpg",
    alt: "Researchers working inside the advanced cleanroom laboratory facility",
  },
};

export const ALUMNI_CONTENT = {
  id: "alumni",
  index: "04",
  title: "Alumni",
  bannerImage: {
    src: "/images/about/alumni.png",
    alt: "IIT Kanpur Alumni Gathering in Chicago under the IIT Karvaan initiative",
  },
  paragraphs: [
    "IIT Kanpur's rising global stature is credited to its distinguished alumni whose achievements in many different fields continue to make us proud. Our well-established alumni network is a matter of pride for us. It includes India's stalwarts in all imaginable fields: academia, technology, banking, entrepreneurship, public services, music and social service.",
    "IIT Kanpur recognizes the achievements and contributions of its alumni by conferring the Distinguished Alumnus Award (DAA) to honour individuals who have made a mark in their fields (Academic Excellence, Professional Excellence, Entrepreneurship and Management, Humanitarian Service). Our alumni too have generously given back to the institute. Their endowments have funded scholarships, departmental buildings, parks and other infrastructural improvements. With more than 45000 alumni spanning across the globe, they have been instrumental in strengthening the image of IIT Kanpur.",
    "We have had many notable alumni who have received national and international recognitions in their respective professional fields. Some of the most notable alumni that IIT Kanpur boasts of are:",
  ],
};

export const FACULTY_CONTENT = {
  id: "faculty",
  index: "05",
  title: "Faculty",
  paragraphBeforeLink: "IIT Kanpur has more than 413 ",
  linkText: "faculty members",
  linkHref: "https://iitk.ac.in/new/iitk-faculty",
  paragraphAfterLink:
    " with degrees from renowned universities worldwide. The Faculty at IIT Kanpur are involved in cutting-edge research both in the industry and within IIT Kanpur and hold positions as varied as editors of various international journals, visiting Faculty in many universities, advisors to government and industry. The contribution of the Faculty has been recognized frequently and has been honored with awards such as:",
  image: {
    src: "/images/about/faculty.png",
    alt: "IIT Kanpur faculty members during an academic senate and discussion meeting",
  },
};

export const CAMPUS_LIFE_CONTENT = {
  id: "activities",
  index: "06",
  title: "Students' Life and Activities",
  intro:
    "Our campus community is a close-knit group that helps students learn, collaborate and flourish. Numerous student clubs and hobby groups allow students to develop skills in science and technology, showcase their talents in cultural, sports, films and media, and entrepreneurial events, and work towards numerous social initiatives. This plethora of activities guarantees that our students develop into all-round and responsible individuals. Additionally, IIT Kanpur is renowned for its inter-college students' festivals namely, Antaragni, Techkriti and Udghosh, which allow students across Indian colleges to display their talents, while constantly pushing our limits in efficient managerial skills and strategies.",
  innovationTitle: "Student Innovation at IIT Kanpur",
  innovationParagraph:
    "IIT Kanpur has a rich history of unparalleled excellence in the field of research and entrepreneurship. The entrepreneurial skill of this institute is among the highest in the country, our very own SIDBI Innovation and Incubation Centre has won national awards for its commendable performance. Startups incubated here have also won various awards, and a very high percentage of them have matured. In addition to this, students from this institute have built their own nanosatellite Jugnu, built their own planetarium, and represented India in multiple international conferences like those of ACM and ASME. IIT Kanpur has been made a key resource centre to provide guidance for water sustainability; it has its own airstrip, flight laboratory, and wind-tunnel facility; the National Information Centre for Earthquake Engineering is located here; and opportunities like these give students a chance to excel in their chosen areas of research, how much ever diverse it may be.",
};
