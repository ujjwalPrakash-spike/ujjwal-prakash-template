# Gallery & Exhibition Architecture (`/gallery` & `/gallery/[slug]`)

The Gallery module provides an archival exhibition index and individual event deep-dives. It follows the APEX digital OS aesthetic: typography-driven, photography-led, high-contrast dark surfaces with a signature light documentary film band.

---

## 1. How to Add a New Event

Events live in [`lib/gallery/data.ts`](file:///home/ujjwal/Desktop/08%20Startups%20&%20Contracts/Web%20Teamplate%20Business/lib/gallery/data.ts). To add a new exhibition event, append an object matching `GalleryEvent`:

```ts
{
  slug: "carbon-chassis-monolith-07",
  title: "Carbon Chassis Monolith 07",
  series: "Architecture & Spatial", // "Architecture & Spatial" | "Kinetic Systems" | "Material Research"
  date: "2026-05-20",               // ISO YYYY-MM-DD string
  location: "Zurich, Switzerland",
  cover: "/template/backgroundhero-poster.jpg",
  coverAlt: "Monolithic structural carbon chassis exhibition",
  summary: "A bespoke tension pavilion with automated aerodynamic surface baffles.",
  videos: ["film-01"],             // IDs from lib/gallery/films.ts
  photos: [ ... ]                  // Array of GalleryPhoto
}
```

The system automatically:
- Computes year options and series chips in the filter bar.
- Generates static pages via `generateStaticParams()` at `/gallery/[slug]`.
- Links previous/next events chronologically on the event page.
- Emits Schema.org `ImageGallery` JSON-LD for search engine indexing.

---

## 2. How to Add Photos (With Required Width and Height)

Photos are defined within an event's `photos` array. **Both `width` and `height` are strictly required** to compute justified row layouts and eliminate Cumulative Layout Shift (CLS):

```ts
{
  src: "/images/exhibitions/node-detail.jpg", // Optional; when omitted, renders tonal block
  width: 1600,                                 // Required (in pixels)
  height: 900,                                 // Required (in pixels)
  alt: "Macro photograph of sintered grade 5 titanium joint",
  caption: "Grade 5 titanium joint under 45 kN preload" // Optional
}
```

### Supported Aspect Ratios:
- **3:2 (Landscape)**: e.g. `1200 x 800`
- **2:3 (Portrait)**: e.g. `800 x 1200`
- **1:1 (Square)**: e.g. `1000 x 1000`
- **16:9 (Widescreen)**: e.g. `1600 x 900`

> [!NOTE]
> If `src` is omitted, [`ImageSlot`](file:///home/ujjwal/Desktop/08%20Startups%20&%20Contracts/Web%20Teamplate%20Business/components/shared/ui/ImageSlot.tsx) renders a flat tonal block (`bg-white/[0.08]`) preserving the exact aspect ratio.

---

## 3. How to Add Films (Documentaries)

Films live in [`lib/gallery/films.ts`](file:///home/ujjwal/Desktop/08%20Startups%20&%20Contracts/Web%20Teamplate%20Business/lib/gallery/films.ts):

```ts
{
  id: "film-07",
  title: "Atelier Carbon Weave Dynamics & Autoclave Cycles",
  duration: "05:14",
  provider: "youtube", // "youtube" | "vimeo"
  videoId: "dQw4w9WgXcQ",
  poster: "/template/backgroundhero-poster.jpg" // Optional poster
}
```

### Privacy & Performance Guarantee:
Films are rendered using the [`LiteVideo`](file:///home/ujjwal/Desktop/08%20Startups%20&%20Contracts/Web%20Teamplate%20Business/components/features/gallery/LiteVideo.tsx) primitive. **No third-party scripts, iframes, or tracking cookies are loaded on page mount.** The YouTube `youtube-nocookie.com` or Vimeo player iframe is instantiated only upon clicking the 64px play circle.
