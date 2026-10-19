// Light band FAQ section presenting atelier policies and inquiry information via Accordion.
import React from "react";
import { CONTACT_CONFIG } from "@/config/contact";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { Accordion, type AccordionItem } from "@/components/shared/ui/Accordion";

export function ContactFaq() {
  const accordionItems: AccordionItem[] = CONTACT_CONFIG.faqs.map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <section
      aria-label="Frequently Asked Questions"
      className="relative w-full bg-neutral-50 text-neutral-950 pt-20 sm:pt-28 pb-32 sm:pb-40 overflow-hidden"
    >
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-12 lg:px-16">
        <ChapterHeader
          index="04"
          title="Frequently Asked Questions"
          count={accordionItems.length}
          surface="light"
          lead="Key guidelines regarding response cycles, private studio visits, custom fabrication schedules, and privacy practices."
        />

        <div className="w-full max-w-4xl">
          <Accordion
            items={accordionItems}
            defaultOpenId={accordionItems[0]?.id}
            tone="light"
          />
        </div>
      </div>
    </section>
  );
}
