import { LEADERSHIP_SECTION_DATA } from "@/lib/home/leadership";
import { LeadershipCard } from "./LeadershipCard";

export function LeadershipStackSection() {
  const { sectionTag, heading, subheading, messages } =
    LEADERSHIP_SECTION_DATA;

  return (
    <section className="relative w-full bg-white px-4 pt-20 sm:px-6 sm:pt-28 md:px-12 lg:px-20 pb-0 text-black">
      <div className="mx-auto mb-16 max-w-7xl">
        <div className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-semibold tracking-wider text-black/70 uppercase">
          <span>{sectionTag}</span>
        </div>

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl md:text-5xl lg:text-6xl">
          {heading}
        </h2>
        <p className="mt-4 max-w-3xl text-base text-neutral-600 sm:text-lg md:text-xl">
          {subheading}
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col space-y-12 pb-24">
        {messages.map((message, index) => (
          <LeadershipCard
            key={message.id}
            message={message}
            index={index}
            totalCards={messages.length}
          />
        ))}
      </div>
    </section>
  );
}
