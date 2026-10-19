// Light band Films section with ChapterHeader, deferred LiteVideo player, and accessible internal scrolling playlist.
"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChapterHeader } from "@/components/shared/layout/ChapterHeader";
import { LiteVideo } from "./LiteVideo";
import { TOKENS } from "@/lib/tokens";
import type { FilmItem } from "@/lib/gallery/types";

interface GalleryFilmsProps {
  films: FilmItem[];
  id?: string;
  indexPrefix?: string;
}

export function GalleryFilms({
  films,
  id = "films",
  indexPrefix = "02",
}: GalleryFilmsProps) {
  const [activeFilmIndex, setActiveFilmIndex] = useState(0);
  const playlistRef = useRef<HTMLDivElement>(null);

  if (films.length === 0) return null;
  const activeFilm = films[activeFilmIndex] || films[0];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = (index + 1) % films.length;
      setActiveFilmIndex(nextIdx);
      const buttons = playlistRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]');
      buttons?.[nextIdx]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIdx = (index - 1 + films.length) % films.length;
      setActiveFilmIndex(prevIdx);
      const buttons = playlistRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]');
      buttons?.[prevIdx]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveFilmIndex(index);
    }
  };

  return (
    <section
      id={id}
      aria-label="Films and Documentaries"
      style={{
        paddingLeft: TOKENS.paddingInline,
        paddingRight: TOKENS.paddingInline,
      }}
      className="w-full bg-neutral-50 text-neutral-950 py-20 sm:py-28 lg:py-36 border-y border-neutral-950/10 select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Chapter Header */}
        <ChapterHeader
          index={indexPrefix}
          title="Documentary Archive"
          count={films.length}
          surface="light"
          lead="Direct cinematography and aerodynamic telemetry recordings from wind tunnels, fabrication autoclaves, and field trials."
        />

        {/* 12-Column Grid: Left 8 cols player, Right 4 cols playlist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
          {/* Left Player (Cols 1-8) */}
          <div className="lg:col-span-8 w-full">
            <LiteVideo key={activeFilm.id} film={activeFilm} />
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-neutral-600">
              <span className="text-neutral-950 font-medium text-sm sm:text-base">
                {activeFilm.title}
              </span>
              <span className="shrink-0 tracking-wider">
                DURATION {activeFilm.duration}
              </span>
            </div>
          </div>

          {/* Right Playlist (Cols 9-12) */}
          <div className="lg:col-span-4 w-full flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-neutral-950/10">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                PLAYLIST [{String(films.length).padStart(2, "0")}]
              </span>
              <span className="font-mono text-[11px] text-neutral-400">
                SELECT OR USE ARROWS
              </span>
            </div>

            {/* Scrollable playlist with fade mask */}
            <div
              ref={playlistRef}
              role="listbox"
              aria-label="Select film"
              className="relative max-h-[360px] lg:max-h-[460px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden divide-y divide-neutral-950/10"
            >
              {films.map((film, idx) => {
                const isActive = idx === activeFilmIndex;
                const thumbSrc =
                  film.poster ||
                  (film.provider === "youtube"
                    ? `https://i.ytimg.com/vi/${film.videoId}/mqdefault.jpg`
                    : undefined);

                return (
                  <button
                    key={film.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveFilmIndex(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`relative w-full flex items-start gap-4 p-3.5 text-left transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-neutral-950 ${
                      isActive
                        ? "bg-neutral-950/[0.06] font-medium"
                        : "hover:bg-neutral-950/[0.03] text-neutral-700 hover:text-neutral-950"
                    }`}
                  >
                    {/* Active Left Marker (1px neutral-950 line) */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-neutral-950"
                      />
                    )}

                    {/* 96px Thumbnail */}
                    <div className="relative w-24 h-16 shrink-0 rounded-md overflow-hidden bg-neutral-200">
                      {thumbSrc ? (
                        <Image
                          src={thumbSrc}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-300" />
                      )}
                    </div>

                    {/* Metadata & Title (wraps to 3 lines, never truncated) */}
                    <div className="flex-1 flex flex-col justify-between min-h-[64px]">
                      <span className="text-xs sm:text-sm font-sans text-neutral-950 line-clamp-3 leading-snug">
                        {film.title}
                      </span>
                      <span className="font-mono text-[11px] text-neutral-500 mt-1">
                        {film.duration} · {film.provider.toUpperCase()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GalleryFilms;
