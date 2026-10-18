import type { Metadata } from "next";
import { TeamHero } from "@/components/features/team/TeamHero";
import { TeamPage } from "@/components/features/team/TeamPage";

export const metadata: Metadata = {
  title: "Team & Roster | APEX.WORKS",
  description:
    "Meet the principals, aerodynamicists, race engineers, and creative directors behind the APEX high-performance digital engine.",
  openGraph: {
    title: "Team & Roster | APEX.WORKS",
    description: "Meet the team and engineering directorate at APEX.WORKS",
  },
};

export default function TeamRoute() {
  return (
    <main className="relative w-full bg-neutral-950 text-white selection:bg-[#93c5fd] selection:text-neutral-950">
      <TeamHero />
      <TeamPage />
    </main>
  );
}
