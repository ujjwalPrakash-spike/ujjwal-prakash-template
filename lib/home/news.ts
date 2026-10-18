export type NewsItem = {
  title: string;
  href: string;
  source: string;
  date?: string;
  image?: string;
  summary?: string;
};

export const NEWS_ITEMS: NewsItem[] = [
  {
    title:
      "IIT Kanpur Launches SCALE-Transcend to Turn Faculty Research into Market-Ready Ventures",
    source: "X",
    href: "https://twitter.com/IITKanpur",
    summary:
      "IIT Kanpur has launched SCALE-Transcend under its Strategic Capital & Advisory for Launch and Expansion platform to accelerate faculty-led research from laboratory to commercial applications.",
  },
  {
    title:
      "IIT Kanpur Launches SCALE-Transcend to Turn Faculty Research into Market-Ready Ventures",
    source: "Facebook",
    href: "https://www.facebook.com/iitkanpur",
  },
];
