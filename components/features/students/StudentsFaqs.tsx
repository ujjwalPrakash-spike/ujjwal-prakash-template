"use client";

import React from "react";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { Accordion, AccordionItem } from "@/components/shared/ui/Accordion";
import { StudentFaq, RESUME_NOTE } from "@/lib/students/data";
import { TOKENS } from "@/lib/tokens";

interface StudentsFaqsProps {
  faqs: StudentFaq[];
}

export function StudentsFaqs({ faqs }: StudentsFaqsProps) {
  const accordionItems: AccordionItem[] = faqs.map((faq, idx) => ({
    id: `faq-${idx + 1}`,
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <section
      id="faqs"
      aria-label="Resume Submission Frequently Asked Questions"
      className="bg-neutral-950 text-white scroll-mt-28 py-20 lg:py-28"
      style={{ paddingInline: TOKENS.paddingInline }}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <ChapterHeader
          index="05"
          title="Resume FAQs"
          surface="dark"
          count={faqs.length}
          lead="Frequently asked questions on resume formatting, master resumes, and PoC verification."
        />

        <div className="mt-12 md:mt-16">
          <Accordion
            items={accordionItems}
            tone="dark"
            allowMultiple={false}
            defaultOpenId="faq-1"
          />
        </div>

        {/* Note block below list */}
        <div className="mt-12 border-t border-white/10 pt-8 text-[15px] leading-relaxed text-white/65 max-w-[68ch]">
          <strong className="font-semibold text-white">{RESUME_NOTE.prefix}</strong>
          <span>{RESUME_NOTE.text}</span>
          <a
            href={RESUME_NOTE.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 decoration-[#93c5fd] hover:text-[#93c5fd] transition-colors"
          >
            {RESUME_NOTE.linkText}
          </a>
          <span>.</span>
        </div>
      </div>
    </section>
  );
}
