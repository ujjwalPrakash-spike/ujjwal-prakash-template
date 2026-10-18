// Recruiter logo data for the Past Recruiters marquee wall.
// Logos are rendered on a light background (bg-neutral-50) using grayscale(1) and mix-blend-mode: multiply.
// Omitted: Caterpillar (CAT) due to opaque black background rectangle; to be replaced with transparent SVG.

export type RecruiterLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};

export const RECRUITER_LOGOS: RecruiterLogo[] = [
  { name: "Accenture", src: "/partners/Accenture.svg", width: 504, height: 147 },
  { name: "Analog Devices", src: "/partners/Analog_Devices_Logo.svg", width: 1250, height: 278 },
  { name: "Atkins", src: "/partners/atkins.svg", width: 200, height: 60 },
  { name: "Bentley Motors", src: "/partners/bentley-motors.svg", width: 320, height: 320 },
  { name: "Britannia", src: "/partners/Britannia_Industries_logo_with_motto.svg", width: 600, height: 200 },
  { name: "Broadcom", src: "/partners/Broadcom_Ltd_Logo.svg", width: 600, height: 120 },
  { name: "Deloitte", src: "/partners/Deloitte.svg", width: 400, height: 80 },
  { name: "Deutsche Bank", src: "/partners/Deutsche_Bank-Logo.svg", width: 600, height: 200 },
  { name: "DRDO", src: "/partners/drdoofficial-seeklogo.com.svg", width: 200, height: 200 },
  { name: "General Electric", src: "/partners/General_Electric_logo.svg", width: 800, height: 320 },
  { name: "Honda", src: "/partners/Honda_Logo.svg", width: 600, height: 300 },
  { name: "HSBC", src: "/partners/hsbc.svg", width: 250, height: 85 },
  { name: "IBM", src: "/partners/IBM_logo.svg", width: 1000, height: 401 },
  { name: "Amazon", src: "/partners/icons8-amazon.svg", width: 240, height: 240 },
  { name: "ISRO", src: "/partners/Indian_Space_Research_Organisation_Logo.svg", width: 200, height: 200 },
  { name: "InMobi", src: "/partners/InMobi_logo.svg", width: 400, height: 100 },
  { name: "ITC", src: "/partners/ITC_Limited_Logo.svg", width: 400, height: 200 },
  { name: "McKinsey & Company", src: "/partners/McKinsey_and_Company_Logo_1.svg", width: 800, height: 160 },
  { name: "Microsoft", src: "/partners/Microsoft_logo.svg", width: 600, height: 130 },
  { name: "Mitsubishi", src: "/partners/Mitsubishi_logo.svg", width: 500, height: 500 },
  { name: "Mitsui Chemicals", src: "/partners/Mitsui_Chemicals.svg", width: 400, height: 100 },
  { name: "Morgan Stanley", src: "/partners/Morgan_Stanley_Logo_1.svg", width: 800, height: 200 },
  { name: "NetApp", src: "/partners/NetApp_logo.svg", width: 600, height: 200 },
  { name: "Nvidia", src: "/partners/Nvidia_logo.svg", width: 600, height: 120 },
  { name: "Renishaw", src: "/partners/Renishaw_logo.svg", width: 400, height: 100 },
  { name: "Samsung", src: "/partners/Samsung_Logo.svg", width: 600, height: 100 },
  { name: "TVS Motor", src: "/partners/TVS_Motor_Company-Logo.wine.svg", width: 800, height: 200 },
  { name: "Unilever", src: "/partners/Unilever.svg", width: 300, height: 400 },
  { name: "Yahoo", src: "/partners/Yahoo!_(2019).svg", width: 500, height: 200 },
  { name: "Dr. Reddy's", src: "/partners/dr.svg", width: 400, height: 100 },
  { name: "DC", src: "/partners/dc.svg", width: 261, height: 98 },
];

export const RECRUITERS_STAT = "250+ companies recruited in Phase 1, 2025–26";
