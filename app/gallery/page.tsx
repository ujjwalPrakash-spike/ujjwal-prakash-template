// Simple Gallery route with minimal bar navbar, headline, and global layout footer.
import type { Metadata } from "next";
import { Navbar } from "@/components/features/navigation/Navbar";

export const metadata: Metadata = {
  title: "Gallery & Installations | APEX.WORKS",
  description: "Exhibition archives, spatial prototypes, and physical atelier installations.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between pt-16">
      <Navbar tone="dark" variant="bar" />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-32 max-w-2xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#93c5fd] mb-4">
          ARCHIVE // EXHIBITIONS
        </span>
        <h1 className="text-4xl sm:text-6xl font-medium tracking-tight mb-4">
          Gallery & Artifacts
        </h1>
        <p className="text-white/60 max-w-md text-sm sm:text-base leading-relaxed">
          Curated visual catalog of spatial structures, carbon composite fabrication, and kinetic prototypes.
        </p>
      </div>
    </main>
  );
}
