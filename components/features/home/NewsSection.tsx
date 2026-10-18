"use client";

import { motion, useReducedMotion } from "framer-motion";
import { IconArrowUpRight } from "@tabler/icons-react";
import Image from "next/image";
import { NEWS_ITEMS, type NewsItem } from "@/lib/home/news";

function NewsRow({ item, index }: { item: NewsItem; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative">
      <motion.div
        initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{
          duration: 1.1,
          delay: index * 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: "left" }}
        className="h-[1px] w-full bg-neutral-950/10"
      />

      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-12 items-baseline py-8 focus-visible:outline-2 focus-visible:outline-neutral-950 focus-visible:outline-offset-4 rounded transition-colors"
      >
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.6, delay: 0.1 + index * 0.09 }}
          className="col-span-12 md:col-span-3 flex items-baseline gap-2 mb-2 md:mb-0"
        >
          {item.date && (
            <span className="font-mono text-[13px] text-neutral-950/55">
              {item.date}
            </span>
          )}
          <span className="text-[13px] uppercase tracking-[0.12em] text-neutral-950/55 font-normal">
            {item.source}
          </span>
        </motion.div>

        <motion.div
          initial={{
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : 24,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{
            duration: 0.7,
            delay: 0.15 + index * 0.09,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="col-span-10 md:col-span-8 pr-4"
        >
          <h3
            className="font-medium tracking-[-0.02em] leading-[1.2] text-neutral-950 lg:line-clamp-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3"
            style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)" }}
          >
            {item.title}
          </h3>
        </motion.div>

        <motion.div
          initial={{
            opacity: shouldReduceMotion ? 1 : 0,
            scale: shouldReduceMotion ? 1 : 0.8,
          }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{
            duration: 0.5,
            delay: 0.24 + index * 0.09,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="col-span-2 md:col-span-1 flex justify-end"
        >
          <span
            className="w-11 h-11 rounded-full border border-neutral-950/15 flex items-center justify-center text-neutral-950 transition-colors duration-300 group-hover:bg-neutral-950 group-hover:text-white"
            aria-hidden="true"
          >
            <IconArrowUpRight size={18} stroke={1.75} />
          </span>
        </motion.div>
      </a>
    </div>
  );
}

function FeaturedNewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block col-span-12 lg:col-span-7 focus-visible:outline-2 focus-visible:outline-neutral-950 focus-visible:outline-offset-4 rounded-2xl"
    >
      {item.image && (
        <div className="aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden mb-5">
          <Image
            src={item.image}
            alt={item.title}
            width={1200}
            height={750}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 1023px) 100vw, 58vw"
          />
        </div>
      )}
      <div className="flex items-baseline gap-3 mb-3">
        {item.date && (
          <span className="font-mono text-[13px] text-neutral-950/55">
            {item.date}
          </span>
        )}
        <span className="text-[13px] uppercase tracking-[0.12em] text-neutral-950/55 font-normal">
          {item.source}
        </span>
      </div>
      <h3
        className="font-medium tracking-[-0.02em] leading-[1.15] text-neutral-950 line-clamp-3"
        style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.5rem)" }}
      >
        {item.title}
      </h3>
      {item.summary && (
        <p className="mt-3 text-base text-neutral-950/65 font-normal leading-relaxed">
          {item.summary}
        </p>
      )}
    </a>
  );
}

function NewsListItem({ item }: { item: NewsItem }) {
  return (
    <li className="border-t border-neutral-950/10 first:border-t-0">
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start justify-between gap-4 py-6 focus-visible:outline-2 focus-visible:outline-neutral-950 focus-visible:outline-offset-2 rounded"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 mb-2">
            {item.date && (
              <span className="font-mono text-[13px] text-neutral-950/55">
                {item.date}
              </span>
            )}
            <span className="text-[13px] uppercase tracking-[0.12em] text-neutral-950/55 font-normal">
              {item.source}
            </span>
          </div>
          <p
            className="font-medium tracking-[-0.01em] leading-[1.3] text-neutral-950 line-clamp-3"
            style={{ fontSize: "clamp(1.125rem, 1.4vw, 1.375rem)" }}
          >
            {item.title}
          </p>
        </div>
        <span
          className="shrink-0 text-neutral-950/45 mt-1 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-neutral-950"
          aria-hidden="true"
        >
          <IconArrowUpRight size={18} stroke={1.75} />
        </span>
      </a>
    </li>
  );
}

export function NewsSection() {
  const shouldReduceMotion = useReducedMotion();
  const items = NEWS_ITEMS;
  if (items.length === 0) return null;

  const hasFeaturedLayout =
    items.length >= 3 && items.some((item) => Boolean(item.image));

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 md:gap-8 pb-5">
        <div className="overflow-hidden">
          <motion.h2
            id="news-heading"
            initial={{ y: shouldReduceMotion ? 0 : "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-medium tracking-[-0.03em] text-neutral-950"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3.5rem)" }}
          >
            News
          </motion.h2>
        </div>

        <nav
          aria-label="News links"
          className="flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {[
            { label: "Follow on X", href: "https://twitter.com/IITKanpur" },
            { label: "Facebook", href: "https://www.facebook.com/iitkanpur" },
            { label: "All news", href: "https://www.iitk.ac.in/new/" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-1 text-[15px] text-neutral-950/60 font-normal hover:text-neutral-950 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-neutral-950 focus-visible:outline-offset-4 rounded group"
            >
              <span>{label}</span>
              <IconArrowUpRight
                size={14}
                stroke={2}
                className="opacity-70 group-hover:opacity-100"
              />
              <span className="absolute left-0 bottom-[-2px] h-[1px] w-0 bg-neutral-950 transition-[width] duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>

      <motion.div
        initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
        className="h-[1px] w-full bg-neutral-950/10 mb-2"
      />

      {hasFeaturedLayout ? (
        <div className="mt-8 grid grid-cols-12 gap-x-[clamp(32px,4vw,64px)] gap-y-10">
          <FeaturedNewsCard item={items[0]} />
          <ul className="col-span-12 lg:col-span-5 flex flex-col">
            {items.slice(1, 5).map((item) => (
              <NewsListItem key={item.href + item.title} item={item} />
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col">
          {items.map((item, index) => (
            <NewsRow key={item.href + item.title} item={item} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsSection;
