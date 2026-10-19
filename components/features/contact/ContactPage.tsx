// Contact page layout orchestrator assembling hero, form, details, channels, visit, and FAQ sections.
"use client";

import React, { Suspense } from "react";
import { Navbar } from "@/components/features/navigation/Navbar";
import { ContactHero } from "./ContactHero";
import { ContactForm } from "./ContactForm";
import { ContactDetails } from "./ContactDetails";
import { ChannelsSection } from "./ChannelsSection";
import { VisitSection } from "./VisitSection";
import { ContactFaq } from "./ContactFaq";

function ContactMain() {
  return (
    <div className="relative w-full bg-neutral-950 text-white min-h-screen flex flex-col">
      <Navbar tone="dark" variant="bar" />

      {/* 1. Hero (Dark) */}
      <ContactHero />

      {/* 2. Form + Details (Dark) */}
      <section
        aria-label="Direct Dispatch & Specifications"
        className="relative w-full bg-neutral-950 text-white pb-20 sm:pb-28 lg:pb-36"
      >
        <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Columns 1-7: Contact Form */}
            <div className="lg:col-span-7 w-full">
              <h2 className="sr-only">Contact Form</h2>
              <ContactForm />
            </div>

            {/* Columns 9-12: Sticky Details Column (lg:col-start-9) */}
            <div className="lg:col-start-9 lg:col-span-4 w-full">
              <ContactDetails />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Channels Directory (Light band) */}
      <ChannelsSection />

      {/* 4. Atelier Visit & Facility (Dark) */}
      <VisitSection />

      {/* 5. Frequently Asked Questions (Light band, last section before footer) */}
      <ContactFaq />
    </div>
  );
}

export function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950" />}>
      <ContactMain />
    </Suspense>
  );
}

export default ContactPage;
