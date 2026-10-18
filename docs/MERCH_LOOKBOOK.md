# Merch & Lookbook Architecture Dossier

This document outlines the data-driven architecture, asset slot specifications, and customization guidelines for the `/merch` lookbook and catalogue.

---

## 1. Quick Rebrand Guide

A buyer rebrands the entire `/merch` page in minutes without editing component code:

* **Header, Title & Contact Action:** Edit [`lib/merch/config.ts`](file:///home/ujjwal/Desktop/08%20Startups%20&%20Contracts/Web%20Teamplate%20Business/lib/merch/config.ts):
  * `eyebrow`: Paddock capsule series identifier.
  * `title`: Page heading clamp(3.5rem, 13vw, 13rem).
  * `lead`: Contextual narrative subtitle.
  * `currency` & `currencySymbol`: Any ISO currency code (e.g. `USD`, `EUR`, `GBP`).
  * `locale`: Locale formatter string (e.g. `en-US`, `de-DE`).
  * `contactLink`: Direct `mailto:`, WhatsApp URL, or external concierge link.
  * `closingHeading` & `closingActionText`: Closing call-to-action copy.

* **Products & Catalogue Objects:** Edit [`lib/merch/data.ts`](file:///home/ujjwal/Desktop/08%20Startups%20&%20Contracts/Web%20Teamplate%20Business/lib/merch/data.ts):
  * `name`, `price`, `category` (`apparel` | `gear` | `limited`).
  * `image` and `hoverImage` paths.
  * `colors`: Array of `{ name, hex }`.
  * `sizes`: Array of dimensions/sizes.
  * `details`: Array of construction specifications.
  * `specs`: Array of `{ label, value }` for the material matrix.
  * `available`: Boolean (`false` marks row as "Sold out" with disabled hover).
  * `href`: Direct purchase or commission link.

---

## 2. Asset Slot Specification & Aspect Ratios

Every image slot in `/merch` uses the generic [`ImageSlot`](file:///home/ujjwal/Desktop/08%20Startups%20&%20Contracts/Web%20Teamplate%20Business/components/shared/ui/ImageSlot.tsx) primitive. When an image path is provided, it loads with Next.js `Image`, explicit responsive `sizes`, and a smooth hover zoom. When no path is provided, it renders an intentional flat tonal block (`bg-white/[0.06]`) with a mono ratio label:

| Component | Slot Role | Aspect Ratio | Desktop Display | Mobile Display |
| :--- | :--- | :--- | :--- | :--- |
| `MerchProductIndex` | Sticky Preview Panel | `aspect-[4/5]` | 6-col sticky panel (`top-[144px]`) | Hidden |
| `MerchProductIndex` | Row Mobile Thumbnail | `aspect-[1/1]` | Hidden | 72px × 72px square left thumbnail |
| `MerchQuickView` | Drawer Hero Showcase | `aspect-[4/5]` | Full width of 480px drawer | Full width of mobile drawer |
| `MerchFeatured` | Primary Parallax Feature | `aspect-[4/5]` | 7-col hero with scroll parallax (-4% to 4%) | Full-width single column |

---

## 3. Order & Acquisition Integration Point

Each product entry supports an optional `href` attribute:
* **External Shop / Direct Checkout:** Set `href: "https://shop.yourbrand.com/products/slug"`.
* **Atelier Concierge Email:** Set `href: "mailto:concierge@yourbrand.com?subject=Inquiry..."`.
* **WhatsApp Booking:** Set `href: "https://wa.me/..."`.

When `href` is present, the "Acquire Object" button opens the destination in a new tab with `target="_blank" rel="noopener noreferrer"`. When `available: false` or `href` is omitted, the button renders in an archived/disabled state ("Sold Out // Archive Continuity").
