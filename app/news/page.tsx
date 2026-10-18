import type { Metadata } from "next";
import { NewsPage } from "@/components/features/news/NewsPage";

export const metadata: Metadata = {
  title: "News & Dispatches | APEX.WORKS",
  description:
    "Field notes on material trials, aerodynamic telemetry, and limited fabrication runs from the APEX atelier.",
  openGraph: {
    title: "News & Dispatches | APEX.WORKS",
    description:
      "Field notes on material trials, aerodynamic telemetry, and limited fabrication runs from the APEX atelier.",
  },
};

export default function NewsRoute() {
  return (
    <main className="relative w-full bg-neutral-950 text-white selection:bg-[#93c5fd] selection:text-neutral-950">
      <NewsPage />
    </main>
  );
}
