// Server page component for /contact route with SEO metadata.
import type { Metadata } from "next";
import { ContactPage } from "@/components/features/contact/ContactPage";
import { CONTACT_CONFIG } from "@/config/contact";

export const metadata: Metadata = {
  title: "Contact & Commissions | APEX.WORKS",
  description: CONTACT_CONFIG.intro,
  openGraph: {
    title: "Contact & Commissions | APEX.WORKS",
    description: CONTACT_CONFIG.intro,
  },
};

export default function ContactRoute() {
  return (
    <main className="relative w-full bg-neutral-950 text-white selection:bg-[#93c5fd] selection:text-neutral-950">
      <ContactPage />
    </main>
  );
}
