"use client";

// Accessible accordion component for 9 academic programmes.

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import { ACADEMIC_PROGRAMMES, type AcademicProgramme } from "@/lib/about/programmes";
import { ABOUT_TOKENS } from "@/lib/about/tokens";

export function ProgrammeAccordion({
  programmes = ACADEMIC_PROGRAMMES,
}: {
  programmes?: AcademicProgramme[];
}) {
  const [openId, setOpenId] = useState<string>(programmes[0]?.id || "");
  const shouldReduceMotion = useReducedMotion();

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? "" : id));

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      document.getElementById(`acc-btn-${programmes[(index + 1) % programmes.length].id}`)?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      document.getElementById(`acc-btn-${programmes[(index - 1 + programmes.length) % programmes.length].id}`)?.focus();
    }
  };

  return (
    <div className="w-full divide-y divide-neutral-950/10 border-y border-neutral-950/10">
      {programmes.map((prog, idx) => {
        const isOpen = openId === prog.id;
        const metaLine = [prog.admission, prog.duration].filter(Boolean).join(" · ");

        return (
          <div key={prog.id} className="w-full">
            <h3>
              <button
                id={`acc-btn-${prog.id}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`acc-panel-${prog.id}`}
                onClick={() => toggle(prog.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-full py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left group focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-4 rounded"
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono text-sm text-neutral-950/40 shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-medium text-neutral-950 tracking-[-0.02em] group-hover:text-neutral-950/80 transition-colors"
                    style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.75rem)" }}
                  >
                    {prog.name}
                  </span>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pl-10 md:pl-0">
                  {metaLine ? <span className="text-[13px] text-neutral-950/55 font-normal">{metaLine}</span> : null}
                  <div className="h-8 w-8 rounded-full border border-neutral-950/15 flex items-center justify-center text-neutral-950/70 group-hover:text-neutral-950 group-hover:border-neutral-950/40 transition-colors">
                    {isOpen ? <IconMinus size={16} /> : <IconPlus size={16} />}
                  </div>
                </div>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`acc-panel-${prog.id}`}
                  role="region"
                  aria-labelledby={`acc-btn-${prog.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: ABOUT_TOKENS.ease }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pt-2 pl-10 sm:pl-12 pr-4 max-w-[80ch]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {prog.admission ? (
                        <div>
                          <span className="block text-[12px] uppercase tracking-wider text-neutral-950/50 mb-1">Admission</span>
                          <span className="text-[15px] text-neutral-950/80">{prog.admission}</span>
                        </div>
                      ) : null}
                      {prog.duration ? (
                        <div>
                          <span className="block text-[12px] uppercase tracking-wider text-neutral-950/50 mb-1">Duration</span>
                          <span className="text-[15px] text-neutral-950/80">{prog.duration}</span>
                        </div>
                      ) : null}
                      {prog.eligibility ? (
                        <div>
                          <span className="block text-[12px] uppercase tracking-wider text-neutral-950/50 mb-1">Eligibility</span>
                          <span className="text-[15px] text-neutral-950/80">{prog.eligibility}</span>
                        </div>
                      ) : null}
                      {prog.internships ? (
                        <div>
                          <span className="block text-[12px] uppercase tracking-wider text-neutral-950/50 mb-1">Internships</span>
                          <span className="text-[15px] text-neutral-950/80">{prog.internships}</span>
                        </div>
                      ) : null}
                    </div>

                    <p className="text-[16px] leading-[1.7] text-neutral-950/75 mb-4 text-pretty">{prog.description}</p>
                    {prog.example ? (
                      <p className="text-[14px] text-neutral-950/50 italic">
                        <span className="not-italic font-medium text-neutral-950/70 mr-1.5">Example:</span>
                        {prog.example}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
