import type { Metadata } from "next";
import { CoordinatorsHero } from "@/components/features/coordinators/CoordinatorsHero";
import { CoordinatorsPage } from "@/components/features/coordinators/CoordinatorsPage";

export const metadata: Metadata = {
  title: "Placement Coordinators | Students' Placement Office, IIT Kanpur",
  description:
    "Feel free to reach out to us at spo@iitk.ac.in. Meet the student coordinators and department representatives of the Students' Placement Office.",
  openGraph: {
    title: "Placement Coordinators | Students' Placement Office, IIT Kanpur",
    description: "Feel free to reach out to us at spo@iitk.ac.in",
  },
};

export default function PlacementCoordinatorsRoute() {
  return (
    <main className="relative w-full bg-neutral-950 text-white selection:bg-[#93c5fd] selection:text-neutral-950">
      <CoordinatorsHero />
      <CoordinatorsPage />
    </main>
  );
}
