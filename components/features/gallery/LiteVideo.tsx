// Deferred iframe video player with poster preview, 64px play circle, and zero 3rd-party requests before click.
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { TOKENS } from "@/lib/tokens";
import type { FilmItem } from "@/lib/gallery/types";

interface LiteVideoProps {
  film: FilmItem;
  className?: string;
  autoPlayOnClick?: boolean;
}

export function LiteVideo({
  film,
  className = "",
  autoPlayOnClick = true,
}: LiteVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Derive embed URL based on provider
  const embedUrl =
    film.provider === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${film.videoId}?autoplay=${
          autoPlayOnClick ? 1 : 0
        }&rel=0&modestbranding=1`
      : `https://player.vimeo.com/video/${film.videoId}?autoplay=${
          autoPlayOnClick ? 1 : 0
        }&dnt=1`;

  // Fallback poster if none supplied
  const posterSrc =
    film.poster ||
    (film.provider === "youtube"
      ? `https://i.ytimg.com/vi/${film.videoId}/maxresdefault.jpg`
      : undefined);

  return (
    <div
      style={{ borderRadius: TOKENS.radiusPortrait }}
      className={`relative w-full aspect-[16/9] overflow-hidden bg-neutral-900 select-none ${className}`.trim()}
    >
      {isPlaying ? (
        <iframe
          src={embedUrl}
          title={film.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <div className="relative w-full h-full group">
          {posterSrc ? (
            <Image
              src={posterSrc}
              alt={film.title}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                [FILM POSTER // {film.duration}]
              </span>
            </div>
          )}

          {/* Scrim overlay */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />

          {/* 64px Play Button */}
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play film: ${film.title}`}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-xl group-hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#93c5fd] focus-visible:outline-offset-4 cursor-pointer"
          >
            <IconPlayerPlayFilled size={24} className="ml-0.5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}

export default LiteVideo;
