"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  IconArrowUpRight,
  IconMail,
  IconBrandFacebook,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import LogoBadge from "@/components/ui/LogoBadge";
import { BackToTop } from "@/components/ui/BackToTop";
import {
  FOOTER_COLUMNS,
  FOOTER_CONTACT,
  FOOTER_SOCIAL,
  type FooterLink,
} from "@/lib/site/footer";

function NavLink({ link }: { link: FooterLink }) {
  const external = link.external ?? false;
  return (
    <li>
      <a
        href={link.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="relative group inline-flex items-start text-[16px] text-white/75 font-normal leading-[1.4] py-[10px] min-h-[44px] hover:text-white hover:translate-x-1 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-4 rounded text-balance"
      >
        <span>{link.label}</span>
        <span
          className="absolute left-0 bottom-[6px] h-[1px] w-0 bg-[#93c5fd] transition-[width] duration-300 group-hover:w-full"
          aria-hidden="true"
        />
      </a>
    </li>
  );
}

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const wordmarkY = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);
  const wordmarkOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0, 0.6, 1]
  );

  return (
    <footer
      ref={footerRef}
      className="relative z-10 w-full bg-neutral-950 text-white rounded-t-[clamp(24px,3.5vw,36px)] -mt-[clamp(24px,3.5vw,36px)] overflow-hidden"
    >
      <div
        className="mx-auto max-w-[1440px]"
        style={{
          paddingInline: "clamp(24px, 6vw, 96px)",
          paddingTop: "clamp(80px, 12vh, 160px)",
        }}
      >
        {/* Row 1: Centerpiece */}
        <div className="pb-12">
          <motion.p
            initial={{
              opacity: shouldReduceMotion ? 1 : 0,
              y: shouldReduceMotion ? 0 : 24,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13px] uppercase tracking-[0.12em] text-white/50 mb-4"
          >
            Get in touch
          </motion.p>

          <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-6 overflow-hidden">
            <motion.a
              href={`mailto:${FOOTER_CONTACT.email.display}`}
              initial={{
                opacity: shouldReduceMotion ? 1 : 0,
                y: shouldReduceMotion ? 0 : "100%",
              }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{
                duration: 0.9,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group inline-flex items-center gap-4 sm:gap-6 text-white font-medium tracking-[-0.03em] leading-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-4 rounded"
              style={{ fontSize: "clamp(1.75rem, 7vw, 6rem)" }}
            >
              <span className="relative">
                {FOOTER_CONTACT.email.display}
                <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-[#93c5fd] transition-[width] duration-400 group-hover:w-full" />
              </span>
              <span
                className="inline-flex items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-neutral-950"
                style={{
                  width: "clamp(40px, 5vw, 72px)",
                  height: "clamp(40px, 5vw, 72px)",
                }}
              >
                <IconArrowUpRight size={24} stroke={1.75} />
              </span>
            </motion.a>

            <motion.a
              href={FOOTER_CONTACT.phone.href}
              initial={{
                opacity: shouldReduceMotion ? 1 : 0,
                y: shouldReduceMotion ? 0 : 24,
              }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{
                duration: 0.7,
                delay: 0.16,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[18px] text-white/70 hover:text-white transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-4 rounded self-start lg:self-baseline"
            >
              {FOOTER_CONTACT.phone.display}
            </motion.a>
          </div>

          <motion.div
            initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="h-[1px] w-full bg-white/10 mt-[clamp(48px,8vh,96px)]"
          />
        </div>

        {/* Row 2: Link columns (4 equal columns across 12 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[clamp(32px,4vw,64px)] gap-y-12">
          {FOOTER_COLUMNS.map((col, idx) => (
            <motion.nav
              key={col.title}
              aria-label={col.title}
              initial={{
                opacity: shouldReduceMotion ? 1 : 0,
                y: shouldReduceMotion ? 0 : 16,
              }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h2 className="text-[13px] uppercase tracking-[0.12em] font-normal text-white/50 mb-5">
                {col.title}
              </h2>
              <ul className="flex flex-col">
                {col.links.map((link) => (
                  <NavLink key={link.href + link.label} link={link} />
                ))}
              </ul>
            </motion.nav>
          ))}

          <motion.div
            initial={{
              opacity: shouldReduceMotion ? 1 : 0,
              y: shouldReduceMotion ? 0 : 16,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{
              duration: 0.7,
              delay: 3 * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h2 className="text-[13px] uppercase tracking-[0.12em] font-normal text-white/50 mb-5">
              Contact
            </h2>
            <address className="not-italic text-[16px] text-white/75 font-normal leading-[1.6]">
              {FOOTER_CONTACT.lines.map((line) => {
                if (line.includes("Kanpur-208016")) {
                  return (
                    <span key={line} className="block">
                      IIT Kanpur,{" "}
                      <span className="whitespace-nowrap">Kanpur-208016</span>
                    </span>
                  );
                }
                return (
                  <span key={line} className="block">
                    {line}
                  </span>
                );
              })}
            </address>
          </motion.div>
        </div>

        {/* Row 3: Bottom bar */}
        <div
          className="border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{
            marginTop: "clamp(64px, 10vh, 120px)",
            paddingTop: "24px",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="h-8 max-h-[32px] w-auto shrink-0 flex items-center overflow-hidden">
              <LogoBadge
                size="footer"
                imageClassName="h-8 max-h-[32px] w-auto object-contain brightness-0 invert"
              />
            </div>
            <div>
              <p className="text-[15px] font-medium text-white leading-tight">
                Students&rsquo; Placement Office, IIT Kanpur
              </p>
              <p className="text-[13px] text-white/50 font-normal mt-0.5">
                &copy; {year} SPO, IIT Kanpur
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {[
              {
                icon: IconMail,
                href: FOOTER_SOCIAL[0].href,
                label: FOOTER_SOCIAL[0].label,
                external: false,
              },
              {
                icon: IconBrandFacebook,
                href: "https://www.facebook.com/iitkanpur",
                label: "IIT Kanpur on Facebook",
                external: true,
              },
              {
                icon: IconBrandLinkedin,
                href: FOOTER_SOCIAL[2].href,
                label: FOOTER_SOCIAL[2].label,
                external: true,
              },
            ].map(({ icon: Icon, href, label, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-2 rounded"
              >
                <Icon size={20} stroke={1.75} />
              </a>
            ))}

            <div className="ml-2 pl-3 border-l border-white/15">
              <BackToTop />
            </div>
          </div>
        </div>

        {/* Row 4: Decorative wordmark */}
        <div
          className="hidden min-[480px]:flex justify-center select-none pointer-events-none"
          style={{
            marginTop: "clamp(32px, 5vh, 64px)",
            marginBottom: "-4%",
          }}
          aria-hidden="true"
        >
          <motion.span
            style={{
              y: shouldReduceMotion ? "0%" : wordmarkY,
              opacity: shouldReduceMotion ? 1 : wordmarkOpacity,
              fontSize: "clamp(4.5rem, 21vw, 22rem)",
            }}
            className="font-semibold tracking-[-0.05em] leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent"
          >
            SPO IITK
          </motion.span>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
