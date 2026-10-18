// Route entry for /gallery index page with SEO metadata and GalleryPage orchestrator.
import type { Metadata } from "next";
import { GalleryPage } from "@/components/features/gallery/GalleryPage";
import { GALLERY_CONFIG } from "@/lib/gallery/config";

export const metadata: Metadata = {
  title: `${GALLERY_CONFIG.title} & Exhibition Archive | APEX.WORKS`,
  description: GALLERY_CONFIG.subtitle,
  openGraph: {
    title: `${GALLERY_CONFIG.title} & Exhibition Archive | APEX.WORKS`,
    description: GALLERY_CONFIG.subtitle,
    type: "website",
  },
};

export default function GalleryRoute() {
  return <GalleryPage />;
}
