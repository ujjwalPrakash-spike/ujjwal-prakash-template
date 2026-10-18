import Image from "next/image";
import Link from "next/link";
import { LeadershipMessage } from "@/lib/home/leadership";

interface LeadershipCardProps {
  message: LeadershipMessage;
  index: number;
  totalCards: number;
}

export function LeadershipCard({ message, index }: LeadershipCardProps) {
  const topOffset = 80 + index * 20;

  return (
    <div
      className="sticky w-full transition-all duration-300"
      style={{ top: `${topOffset}px`, zIndex: index + 1 }}
    >
      <div
        className={`relative w-full overflow-hidden rounded-2xl border ${message.borderAccent} ${message.cardBg} p-6 sm:p-8 md:p-12 lg:p-14 shadow-2xl backdrop-blur-md text-white`}
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                <span>{message.roleTag}</span>
              </div>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {message.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base md:text-lg">
                &ldquo;{message.quote}&rdquo;
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div>
                <h4 className="text-lg font-bold text-white sm:text-xl">
                  {message.name}
                </h4>
                <p className="text-xs font-medium text-zinc-400 sm:text-sm">
                  {message.designation}
                </p>
              </div>

              <Link
                href={message.href}
                className="group inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-white/20 hover:shadow-lg sm:text-sm"
              >
                <span>Read Full Message</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] overflow-hidden rounded-xl border border-white/15 bg-white/5 shadow-inner">
              <Image
                src={message.imageSrc}
                alt={message.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top filter brightness-95 contrast-105 transition-transform duration-500 hover:scale-105"
                priority={index === 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
