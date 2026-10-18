// 10 Sample products, pricing helper, and details strip data for /merch.
import type { Product, MerchDetailColumn } from "./types";
import { MERCH_CONFIG } from "./config";

export const PRODUCTS: Product[] = [
  {
    id: "m-01",
    slug: "aero-monolith-shell",
    name: "Monolith Storm Shell Mk.IV",
    price: 480,
    category: "apparel",
    badge: "DROP NO. 07",
    available: true,
    featured: true,
    href: "mailto:concierge@apexworks.io?subject=Inquiry%3A%20Monolith%20Storm%20Shell%20Mk.IV",
    colors: [
      { name: "Stealth Black", hex: "#111113" },
      { name: "Slate Grey", hex: "#4A4D52" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "3-layer laminated Japanese ripstop nylon with taped storm seams. Aerodynamic silhouette tested for zero flutter at velocity.",
    details: [
      "280g/m² hydrophobic membrane",
      "Concealed magnetic storm placket",
      "Fidlock V-buckle hood tensioner",
      "Laser-perforated underarm ventilation ports",
    ],
    specs: [
      { label: "Material", value: "3L Cordura Ripstop" },
      { label: "Water Column", value: "20,000 mm" },
      { label: "Weight", value: "485 grams" },
      { label: "Origin", value: "Osaka, Japan" },
    ],
    shipping: "Complimentary worldwide courier dispatch within 24 hours.",
    care: "Machine wash cold on gentle cycle. Do not tumble dry.",
  },
  {
    id: "m-02",
    slug: "chassis-transit-duffle",
    name: "Chassis 45L Paddock Duffle",
    price: 620,
    category: "gear",
    badge: "CORE SPEC",
    available: true,
    href: "mailto:concierge@apexworks.io?subject=Inquiry%3A%20Chassis%2045L%20Paddock%20Duffle",
    colors: [
      { name: "Matte Carbon", hex: "#1C1C1E" },
      { name: "Dry Olive", hex: "#3B4239" },
    ],
    sizes: ["45L"],
    description:
      "Thermoformed composite baseplate mated to high-tenacity ballistic sailcloth. Built to survive rigorous paddock and pit transit.",
    details: [
      "Rigid bottom pan for standing stability on wet tarmac",
      "YKK Aquaguard matte polyurethane water-resistant zips",
      "Deployable padded backpack harness with sternum clip",
      "Direct FIA-compliant luggage compartment fitment",
    ],
    specs: [
      { label: "Capacity", value: "45 Litres" },
      { label: "Chassis", value: "Thermoformed Hypalon" },
      { label: "Hardware", value: "Anodized 7075-T6 Alloy" },
    ],
  },
  {
    id: "m-03",
    slug: "endurance-pilot-blouson",
    name: "Endurance Pilot Blouson",
    price: 790,
    category: "limited",
    badge: "EDITION 50",
    available: true,
    href: "mailto:concierge@apexworks.io?subject=Inquiry%3A%20Endurance%20Pilot%20Blouson",
    colors: [
      { name: "Obsidian", hex: "#0E0E10" },
      { name: "Oxblood", hex: "#4A181C" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Vegetable-tanned Italian calfskin outer lined with temperature-regulating merino wool. Hand-numbered edition of 50.",
    details: [
      "1.2mm vegetable-tanned Tuscan calf leather",
      "Removable shearling storm collar",
      "Interior credential and telemetry passport pocket",
      "Precision-milled solid brass snap fasteners",
    ],
    specs: [
      { label: "Batch", value: "50 Units Worldwide" },
      { label: "Tannery", value: "Santa Croce sull'Arno" },
      { label: "Lining", value: "100% Extrafine Merino" },
    ],
  },
  {
    id: "m-04",
    slug: "articulated-pit-trouser",
    name: "Apex Articulated Trouser",
    price: 340,
    category: "apparel",
    available: true,
    href: "mailto:concierge@apexworks.io?subject=Inquiry%3A%20Apex%20Articulated%20Trouser",
    colors: [
      { name: "Dark Carbon", hex: "#1A1B1E" },
      { name: "Desert Sand", hex: "#B8B1A4" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    description:
      "Ergonomic multi-panel pant cut for cockpit mobility. Four-way stretch woven with Kevlar thread reinforcement at knee zones.",
    details: [
      "Pre-curved knees for cockpit and paddock agility",
      "Integrated webbing tension belt with aluminum buckle",
      "Low-profile zippered thigh instrument pocket",
      "DWR moisture repellent coating",
    ],
  },
  {
    id: "m-05",
    slug: "billet-ti-watch-chamber",
    name: "Billet Titanium Watch Chamber",
    price: 450,
    category: "gear",
    badge: "LIMITED",
    available: true,
    href: "mailto:concierge@apexworks.io?subject=Inquiry%3A%20Billet%20Titanium%20Watch%20Chamber",
    colors: [{ name: "Raw Satin Titanium", hex: "#8A8D91" }],
    sizes: ["Universal 3-Slot"],
    description:
      "5-axis CNC-milled from a single block of Grade 5 titanium. Hermetic pressure seal with silicone dampeners for 3 timepieces.",
    details: [
      "Machined from solid Ti-6Al-4V billet",
      "Hermetic pressure seal with fluorosilicone O-ring",
      "Laser-etched individual serial numbering",
      "Microfiber travel roll included",
    ],
  },
  {
    id: "m-06",
    slug: "velocity-thermal-hoodie",
    name: "Velocity Heavyweight Merino Hood",
    price: 320,
    category: "apparel",
    available: true,
    href: "mailto:concierge@apexworks.io?subject=Inquiry%3A%20Velocity%20Heavyweight%20Merino%20Hood",
    colors: [
      { name: "Asphalt Grey", hex: "#2B2D31" },
      { name: "Chalk", hex: "#EBE7DF" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "420g/m² boiled merino fleece. Thermal regulation for freezing paddock early mornings and trans-alpine transit.",
    details: [
      "Seamless raglan shoulder construction",
      "Double-layered articulated hood",
      "Internal thumbhole storm cuffs",
      "Ribbed side gussets for flexibility",
    ],
  },
  {
    id: "m-07",
    slug: "aero-track-tote",
    name: "Aero Modular Track Tote 30L",
    price: 290,
    category: "gear",
    available: true,
    href: "mailto:concierge@apexworks.io?subject=Inquiry%3A%20Aero%20Modular%20Track%20Tote%2030L",
    colors: [
      { name: "Pitch Black", hex: "#121214" },
      { name: "Signal Red", hex: "#B81414" },
    ],
    sizes: ["30L"],
    description:
      "Semi-rigid structured tote bag with magnetic Fidlock closure and internal padded workstation sleeve.",
    details: [
      "X-Pac VX21 waterproof sailcloth shell",
      "Reinforced Cordura tubular carry handles",
      "Internal padded sleeve fits 16-inch laptops",
      "Modular hook-and-loop tool partition",
    ],
  },
  {
    id: "m-08",
    slug: "paddock-driver-glove",
    name: "Paddock Driving Glove No. 03",
    price: 210,
    category: "gear",
    available: false, // Sold out item to test disabled / sold-out state
    colors: [
      { name: "Black / Grey Stitch", hex: "#161616" },
      { name: "Cognac Tan", hex: "#7A4325" },
    ],
    sizes: ["7.5", "8.0", "8.5", "9.0", "9.5"],
    description:
      "Perforated Ethiopian hairsheep leather with external seam stitching for direct steering wheel feedback without pressure points.",
    details: [
      "Hand-burnished drum-dyed hairsheep leather",
      "Outseam stitching to prevent friction blisters",
      "Elasticated wrist with branded matte snap",
      "Touchscreen-conductive index and thumb pads",
    ],
  },
  {
    id: "m-09",
    slug: "formula-oversized-jersey",
    name: "Aero Formula Graphic Jersey",
    price: 130,
    category: "apparel",
    available: true,
    href: "mailto:concierge@apexworks.io?subject=Inquiry%3A%20Aero%20Formula%20Graphic%20Jersey",
    colors: [
      { name: "Washed Carbon", hex: "#222326" },
      { name: "Optic Off-White", hex: "#EDEDEA" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "310g/m² heavyweight organic cotton combed jersey with subtle architectural line placement. Pre-shrunk vintage wash.",
    details: [
      "High ribbed crewneck collar",
      "Dropped shoulders with relaxed boxy fit",
      "Pre-shrunk vintage wash treatment",
      "Water-based high-density typographic print",
    ],
  },
  {
    id: "m-10",
    slug: "carbon-fiber-monocoque-stool",
    name: "Monocoque Carbon Camp Stool",
    price: 850,
    category: "limited",
    badge: "ARCHIVE SPEC",
    available: false, // Sold out item
    colors: [{ name: "Twill Gloss Carbon", hex: "#141517" }],
    sizes: ["Folded 40cm"],
    description:
      "Ultra-lightweight collapsible stool with autoclave-cured 3K twill carbon fiber legs and Dyneema sling. 100 numbered sets.",
    details: [
      "Autoclave cured 3K twill composite tubes",
      "UHMWPE Dyneema load-bearing sling seat",
      "Packs into included 40cm ballistic travel tube",
      "Static load rating up to 160 kg",
    ],
  },
];

export function formatMerchPrice(amount: number): string {
  try {
    return new Intl.NumberFormat(MERCH_CONFIG.locale, {
      style: "currency",
      currency: MERCH_CONFIG.currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${MERCH_CONFIG.currencySymbol}${amount}`;
  }
}

export function getMerchStats(products: Product[]) {
  const total = products.length;
  const categories = Array.from(new Set(products.map((p) => p.category))).length;
  const available = products.filter((p) => p.available).length;
  return {
    total,
    categories,
    available,
  };
}

export const DETAILS_STRIP_COLUMNS: MerchDetailColumn[] = [
  {
    index: "01 // ALLOY & FIBER",
    title: "Aerospace Metallurgy",
    body: "We specify certified raw Grade 5 titanium, Cordura high-tenacity ripstop textiles, and pre-preg autoclave composites sourced from audited technical mills across Japan and Italy.",
  },
  {
    index: "02 // METRIC TOLERANCE",
    title: "Micro-Studio Assembly",
    body: "All pieces are cut, ultrasonic-welded, and hand-finished in limited batch runs with 5-axis CNC machining held to within +/- 0.02mm structural tolerance.",
  },
  {
    index: "03 // PROTOCOL",
    title: "Lifecycle Archive",
    body: "Designed for decadal utility in extreme velocity environments. Damaged hardware or worn seams are backed by our permanent restoration protocol.",
  },
];
