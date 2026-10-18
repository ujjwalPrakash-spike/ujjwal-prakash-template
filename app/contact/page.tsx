import type { Metadata } from "next";
import { Navbar } from "@/components/features/navigation/Navbar";

export const metadata: Metadata = {
  title: "Contact & Commissions | APEX.WORKS",
  description: "Direct atelier commissions, partner inquiries, and technical consultations.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between pt-16">
      <Navbar tone="dark" variant="bar" />
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-24 max-w-2xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#93c5fd] mb-4">
          COMMISSIONS // INQUIRIES
        </span>
        <h1 className="text-4xl sm:text-6xl font-medium tracking-tight mb-6">
          Initiate a Build
        </h1>
        <p className="text-white/70 text-base sm:text-lg mb-10 leading-relaxed">
          For racing teams, luxury automotive builders, and hardware pioneers seeking bespoke digital architecture. We deploy in 48 hours.
        </p>

        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <span className="block text-xs font-mono uppercase tracking-wider text-white/50 mb-1">
              Direct Inquiries
            </span>
            <span className="text-lg font-mono text-white">commissions@apexworks.io</span>
          </div>
          <a
            href="mailto:commissions@apexworks.io"
            className="h-12 px-8 rounded-full bg-white text-black font-semibold text-sm inline-flex items-center justify-center hover:bg-neutral-200 transition-colors shrink-0"
          >
            Email Atelier
          </a>
        </div>
      </div>
    </main>
  );
}
