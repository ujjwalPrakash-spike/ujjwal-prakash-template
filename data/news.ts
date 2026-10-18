// Editorial news dispatches, material research papers, and studio updates.

import type { NewsPost } from "@/lib/news/types";

export const NEWS_POSTS: NewsPost[] = [
  {
    slug: "chassis-telemetry-protocol-v4",
    title: "Chassis Telemetry Protocol v4: Millisecond Thermal Mapping at Race Speed",
    date: "2026-10-14",
    category: "Engineering",
    excerpt:
      "A deep technical breakdown of our new multi-bus sensor topology, delivering live tire temperature gradients directly to pit-wall strategists.",
    cover: "/images/hero-poster.jpg",
    coverAlt: "High-speed GT3 telemetry visualization on chassis frame",
    author: "Elena Rostova",
    featured: true,
    tags: ["Telemetry", "Electronics", "Sensors"],
    body: [
      {
        type: "p",
        content:
          "Modern endurance motorsport demands continuous feedback across dynamic tire contact patches. Protocol v4 introduces an ultra-dense array of infrared thermal sensors streaming over an isolated high-throughput CAN bus.",
      },
      {
        type: "h2",
        content: "Distributed Bus Architecture",
      },
      {
        type: "p",
        content:
          "Rather than bottlenecking through a central logger, each wheel hub now houses an edge coprocessor performing 1 kHz filtering and localized gradient calculations before transmission.",
      },
      {
        type: "ol",
        content: [
          "Sensor nodes sample 16-point lateral surface profiles every 2 milliseconds.",
          "Localized kalman estimators discard transient rubber pickup anomalies.",
          "Unified data bursts compress down to 14 bytes per axle per frame.",
        ],
      },
      {
        type: "quote",
        text: "By offloading edge filtering to the upright assembly, we reduced telemetry latency by 82% over high-banked kerbing.",
        cite: "Alexander Vance · Director of Systems",
      },
      {
        type: "figure",
        src: "/images/team/mercedes-amg-gt3.png",
        width: 2169,
        height: 725,
        alt: "Mercedes-AMG GT3 Chassis Telemetry Array",
        caption: "Figure 1.1 — Integrated infrared telemetry sensor locations across the spaceframe.",
      },
      {
        type: "h2",
        content: "Track Validation at Spa",
      },
      {
        type: "p",
        content:
          "During initial 24-hour endurance testing, the system detected a localized outer shoulder temperature spike three laps before pneumatic pressure telemetry flagged warning thresholds.",
      },
      {
        type: "ul",
        content: [
          "Zero dropped frames across 48 continuous track hours.",
          "Immunity against high-frequency electromagnetic interference from pit radio relays.",
          "Full backward compatibility with existing MoTeC analysis suites.",
        ],
      },
    ],
  },
  {
    slug: "swan-neck-aero-dynamic-studies",
    title: "Vortex Coherence in High-Downforce Swan-Neck Wing Mounts",
    date: "2026-09-28",
    category: "Aerodynamics",
    excerpt:
      "Computational fluid dynamics investigations revealing why inverted pylon mounts preserve laminar flow along the low-pressure wing underside.",
    cover: "/template/_.jpeg",
    coverAlt: "Swan-neck rear wing aerodynamic streamlines",
    author: "Elena Rostova",
    tags: ["Aerodynamics", "CFD", "Downforce"],
    body: [
      {
        type: "p",
        content:
          "The underside of an aerodynamic profile produces up to 70% of total negative lift. Traditional underside mounting stanchions disrupt this critical suction zone, shedding turbulent vorticity exactly where high-velocity air is required.",
      },
      {
        type: "h2",
        content: "Reversing the Structural Path",
      },
      {
        type: "p",
        content:
          "Swan-neck pylons suspend the wing element from above, leaving the working suction face completely pristine. Through scale-model wind tunnel validation, we measured an 11% improvement in lift-to-drag efficiency.",
      },
      {
        type: "quote",
        text: "Preserving underside boundary layer attachment yields predictable balance through high-speed yaw transitions.",
        cite: "Aerodynamics Research Group",
      },
      {
        type: "h2",
        content: "Composite Stanchion Layup",
      },
      {
        type: "p",
        content:
          "To counter increased bending moment from the overhead arch, we developed an asymmetric carbon-fiber braid using high-modulus Torayca fibers oriented along the principal strain vectors.",
      },
      {
        type: "ul",
        content: [
          "Deflection under 600 kg aerodynamic load kept below 1.2 mm.",
          "Net mass reduction of 420 grams per pylon assembly.",
          "Integrated internal channels for active DRS hydraulic actuators.",
        ],
      },
    ],
  },
  {
    slug: "cordura-composite-membrane-trials",
    title: "Field Dispatches: Cordura 3L Membrane Resilience Trials",
    date: "2026-09-04",
    category: "Atelier",
    excerpt:
      "Subjecting our new weatherproof technical textiles to sub-zero alpine conditions and mechanical abrasion tests in the Bavarian highlands.",
    cover: "/template/_ (8).jpeg",
    coverAlt: "Technical garment textile inspection under harsh conditions",
    author: "Marcus Lindqvist",
    tags: ["Materials", "Apparel", "Fabrication"],
    body: [
      {
        type: "p",
        content:
          "Our atelier creates equipment bridging motorsport mechanics and severe alpine exposure. The 2026 technical garment collection deploys a bespoke triple-layer laminate balancing 28,000 mm hydrostatic head with unhindered breathability.",
      },
      {
        type: "h2",
        content: "Mechanical Abrasion Protocol",
      },
      {
        type: "p",
        content:
          "Simulating constant cockpit ingress over carbon composite sills requires superior ripstop reinforcement. We integrated ballistic aramid micro-ribs into high-wear elbow and hip articulation points.",
      },
      {
        type: "ol",
        content: [
          "50,000 Martindale abrasion cycles without membrane puncture.",
          "Seam tape adhesion maintained through 40 industrial wash cycles.",
          "Zero stiffening or crack propagation down to -25°C.",
        ],
      },
      {
        type: "h2",
        content: "Thermal Ergonomics",
      },
      {
        type: "p",
        content:
          "Thermal cameras verified uniform heat dissipation along the dorsal vent channel during intense mechanical pit-stop drills.",
      },
    ],
  },
  {
    slug: "pneumatic-paddle-shift-dynamics",
    title: "Pneumatic Paddle Shift Actuation Under Extreme Lateral G-Forces",
    date: "2026-08-19",
    category: "Engineering",
    excerpt:
      "Redesigning magnetic detents and solenoid seals to guarantee 28-millisecond gear changes under sustained 3.8G cornering.",
    cover: "/template/_ (9).jpeg",
    coverAlt: "Titanium paddle shift assembly exploded view",
    author: "Lucas Meyer",
    tags: ["Drivetrain", "Transmission", "Machining"],
    body: [
      {
        type: "p",
        content:
          "When taking Eau Rouge or the Carousel flat out, physical shift paddles experience heavy transverse inertia that can cause false triggering or erratic valve actuation on traditional pneumatic blocks.",
      },
      {
        type: "h2",
        content: "Magnetic Bi-Stable Detent",
      },
      {
        type: "p",
        content:
          "We replaced mechanical spring plungers with calibrated neodymium magnetic latches. The tactile click remains crisp and distinct regardless of cockpit g-force vector.",
      },
      {
        type: "quote",
        text: "The driver receives identical haptic resistance whether braking at 2G or accelerating out of a banked chicane.",
        cite: "Lucas Meyer · Vehicle Dynamics",
      },
    ],
  },
  {
    slug: "wind-tunnel-shakedown-report",
    title: "Scale-Model Wind Tunnel Shakedown: Front Diffuser Strakes",
    date: "2026-07-15",
    category: "Aerodynamics",
    excerpt:
      "Analyzing ground-effect sensitivity to ride-height oscillations using continuous laser sheet particle image velocimetry.",
    cover: "/template/👑.jpeg",
    coverAlt: "Wind tunnel smoke trails over front carbon splitter",
    author: "Elena Rostova",
    tags: ["Aerodynamics", "Wind Tunnel", "Ground Effect"],
    body: [
      {
        type: "p",
        content:
          "Front splitter stall under hard pitch braking is one of the most hazardous aerodynamic phenomena in modern GT racing. Our latest strake geometry induces controlled outwash vortices that seal the floor edges.",
      },
      {
        type: "h2",
        content: "Particle Image Velocimetry Findings",
      },
      {
        type: "p",
        content:
          "High-speed optical cameras mapped the core velocity of the vortex shed from the outer endplate. Even at 15 mm pitch dive, core velocity remained above 1.8 times freestream velocity.",
      },
      {
        type: "ul",
        content: [
          "Prevents boundary layer separation along the front throat.",
          "Maintains aerodynamic center of pressure within a 1.5% margin.",
          "Reduces pitch sensitivity over curbs by 22%.",
        ],
      },
    ],
  },
  {
    slug: "bespoke-titanium-exhaust-fabrication",
    title: "Additive Titanium Exhaust Metallurgy for Naturally Aspirated V8s",
    date: "2026-06-02",
    category: "Atelier",
    excerpt:
      "Combining laser powder-bed fusion with hand-welded Inconel manifolds to maximize sonic resonance while shedding 14 kilograms.",
    cover: "/template/Spiderman wallpaper 4k for pc and mac.jpeg",
    coverAlt: "3D printed titanium collector with rainbow heat patina",
    author: "Marcus Lindqvist",
    tags: ["Metallurgy", "Fabrication", "Exhaust"],
    body: [
      {
        type: "p",
        content:
          "Equal-length header primaries are difficult to route inside compact spaceframe packaging using traditional mandrel tube bending. Additive manufacturing allows organic collector geometry impossible with standard tooling.",
      },
      {
        type: "h2",
        content: "Acoustic Tuning & Backpressure Balance",
      },
      {
        type: "p",
        content:
          "Internal acoustic simulations determined optimal collector merging angles to scavenge exhaust pulses precisely at the 6,500 RPM torque peak.",
      },
      {
        type: "quote",
        text: "The result is a purer naturally aspirated note with measurable volumetric efficiency gains across the entire rev band.",
        cite: "Marcus Lindqvist · Atelier Director",
      },
    ],
  },
  {
    slug: "brake-duct-thermodynamics",
    title: "Carbon-Ceramic Rotor Quench Rates: Minimizing Thermal Shock",
    date: "2026-04-18",
    category: "Engineering",
    excerpt:
      "Optimizing variable-rate duct apertures to prevent rapid temperature drop during prolonged full-throttle straights.",
    cover: "/images/why-recruit/whyrecDevelopment.png",
    coverAlt: "Glowing carbon ceramic brake rotor on dyno rig",
    author: "Alexander Vance",
    tags: ["Brakes", "Thermal", "Carbon Ceramic"],
    body: [
      {
        type: "p",
        content:
          "Carbon-ceramic friction rings operate optimally between 450°C and 750°C. Cooling them excessively on a two-kilometer straight creates thermal shock and unpredictable initial bite into the next braking zone.",
      },
      {
        type: "h2",
        content: "Shape-Memory Alloy Flow Control",
      },
      {
        type: "p",
        content:
          "We engineered passive shape-memory alloy louvers inside the upright ducting that expand when rotor core temperatures exceed 600°C and restrict flow when below 400°C.",
      },
    ],
  },
  {
    slug: "nurburgring-sp9-suspension-calibration",
    title: "Suspension Kinetic Damping Over the Nordschleife Kerbs",
    date: "2026-02-11",
    category: "Engineering",
    excerpt:
      "Four-way adjustable hydraulic dampers re-valved specifically for the rapid high-frequency crests of the Green Hell.",
    cover: "/images/hero-poster.jpg",
    coverAlt: "Race car suspension undergoing dynamic shaker rig tests",
    author: "Henrik Lindholm",
    tags: ["Suspension", "Damping", "Nurburgring"],
    body: [
      {
        type: "p",
        content:
          "No circuit punishes a suspension assembly like the Nürburgring Nordschleife. The transition from Flugplatz to Schwedenkreuz requires compliant high-speed blow-off to prevent the chassis from losing ground-effect suction.",
      },
      {
        type: "h2",
        content: "Blow-Off Valve Shim Stacks",
      },
      {
        type: "p",
        content:
          "By introducing dual-stage Belleville spring blow-offs, damper compression force plateaus immediately upon sharp kerb strikes, protecting the upright bearings and keeping tire contact patch loads constant.",
      },
    ],
  },
  {
    slug: "carbon-monocoque-layup-evolution",
    title: "Torsional Rigidity Upgrades in Generation 3 Monocoque Cells",
    date: "2025-11-20",
    category: "Engineering",
    excerpt:
      "Achieving a 38,000 Nm/degree chassis stiffness benchmark through automated fiber placement and unidirectional carbon tape.",
    cover: "/template/_ (9).jpeg",
    coverAlt: "Carbon fiber safety cell undergoing static torsion testing",
    author: "Lucas Meyer",
    tags: ["Carbon", "Monocoque", "Safety"],
    body: [
      {
        type: "p",
        content:
          "Chassis flex introduces uncontrollable dynamic camber changes that confuse damper tuning. Generation 3 focuses on integrating the roll cage nodes directly into the structural carbon skin.",
      },
      {
        type: "h2",
        content: "Autoclave Cure Schedule Optimization",
      },
      {
        type: "p",
        content:
          "A multi-stage vacuum debulking protocol eliminated void content to under 0.4%, yielding higher shear modulus without adding structural resin mass.",
      },
    ],
  },
  {
    slug: "active-ride-height-computational-model",
    title: "Predictive Aero Balance via Laser Ground Scanning",
    date: "2025-08-30",
    category: "Aerodynamics",
    excerpt:
      "Using forward-facing LIDAR to anticipate track undulations and prepare active aerodynamic control surfaces 50 milliseconds in advance.",
    cover: "/template/👑.jpeg",
    coverAlt: "Laser scan point cloud of asphalt surface profile",
    author: "Elena Rostova",
    tags: ["LIDAR", "Aerodynamics", "Prediction"],
    body: [
      {
        type: "p",
        content:
          "Reactive suspension responds after the tire has already hit the bump. Predictive telemetry maps the asphalt profile 15 meters ahead of the front splitter.",
      },
      {
        type: "h2",
        content: "Millisecond Surface Reconstruction",
      },
      {
        type: "p",
        content:
          "Edge processors reconstruct the 3D road matrix in real time, calculating aerodynamic pitch corrections before the wheels register vertical displacement.",
      },
    ],
  },
  {
    slug: "atelier-chronicles-leather-composite-seats",
    title: "Aniline Leather & Raw Carbon Bucket Shells for Endurance Pilot Ergonomics",
    date: "2025-05-14",
    category: "Atelier",
    excerpt:
      "Hand-trimmed vegetable-tanned hides combined with FIA 8862-2009 homologated competition seating shells.",
    cover: "/template/_.jpeg",
    coverAlt: "Handcrafted leather race seat with embossed atelier emblem",
    author: "Marcus Lindqvist",
    tags: ["Interior", "Craft", "Leather"],
    body: [
      {
        type: "p",
        content:
          "Endurance racing pilots spend up to four consecutive hours in high-g conditions. Ergonomic comfort is not a luxury; it directly delays cognitive fatigue during night stints.",
      },
      {
        type: "h2",
        content: "Perforated Air-Channel Padding",
      },
      {
        type: "p",
        content:
          "High-density visco-elastic foam core lined with breathable aniline leather promotes convective air cooling while dampening low-frequency powertrain vibrations.",
      },
    ],
  },
  {
    slug: "lightweight-forged-magnesium-wheels",
    title: "Centrifugal Mass Reduction: Forged Magnesium Center-Lock Wheels",
    date: "2025-02-09",
    category: "Engineering",
    excerpt:
      "Shaving 2.8 kilograms of unsprung rotating mass per corner to dramatically enhance directional change response.",
    cover: "/template/_ (8).jpeg",
    coverAlt: "Forged magnesium center lock wheel finished in raw matte bronze",
    author: "Alexander Vance",
    tags: ["Wheels", "Magnesium", "Unsprung Mass"],
    body: [
      {
        type: "p",
        content:
          "Unsprung rotational mass carries four times the inertia penalty of static chassis mass. Our latest 18-inch forged magnesium center-lock rim cuts moment of inertia by 24%.",
      },
      {
        type: "h2",
        content: "Knurled Bead Seats",
      },
      {
        type: "p",
        content:
          "Under high-torque launch and 2G deceleration, tires can slip along the wheel bead. Precision knurling on the inner rim surface mechanically locks the tire bead in place.",
      },
    ],
  },
];
