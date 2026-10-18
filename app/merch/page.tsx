import type { Metadata } from "next";
import { Navbar } from "@/components/features/navigation/Navbar";

export const metadata: Metadata = {
  title: "Lookbook & Merch | APEX.WORKS",
  description: "Limited-run teamwear, trackside capsules, and technical apparel.",
};

export default function MerchPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between pt-16">
      <Navbar tone="dark" variant="bar" />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-32">
        <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#93c5fd] mb-4">
          COMING SOON // CAPSULE 01
        </span>
        <h1 className="text-4xl sm:text-6xl font-medium tracking-tight mb-4">
          Editorial Merch Lookbook
        </h1>
        <p className="text-white/60 max-w-md text-sm sm:text-base">
          Limited-run technical garments and serialized paddock hardware. Design integration in progress.
        </p>
      </div>
    </main>
  );
}
