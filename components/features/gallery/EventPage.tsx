// Event gallery detail page orchestrator managing photos, deep-linked lightbox, and adjacent navigation.
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/features/navigation/Navbar";
import { EventHero } from "./EventHero";
import { EventPhotos } from "./EventPhotos";
import { GalleryFilms } from "./GalleryFilms";
import { MoreEvents } from "./MoreEvents";
import { GalleryLightbox } from "./GalleryLightbox";
import { FILMS } from "@/lib/gallery/films";
import { getAdjacentEvents } from "@/lib/gallery/utils";
import type { GalleryEvent } from "@/lib/gallery/types";

interface EventPageProps {
  event: GalleryEvent;
}

export function EventPage({ event }: EventPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Deep-link check on initial client load: ?photo={n} (1-indexed)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const photoParam = params.get("photo");
    if (photoParam) {
      const idx = parseInt(photoParam, 10) - 1;
      if (!isNaN(idx) && idx >= 0 && idx < event.photos.length) {
        setLightboxIndex(idx);
      }
    }
  }, [event.photos.length]);

  const { prev, next } = useMemo(() => getAdjacentEvents(event.slug), [event.slug]);

  // Filter films assigned to this specific event
  const eventFilms = useMemo(() => {
    if (!event.videos || event.videos.length === 0) return [];
    return FILMS.filter((f) => event.videos?.includes(f.id));
  }, [event.videos]);

  return (
    <div className="relative w-full min-h-screen bg-neutral-950 text-white flex flex-col">
      <Navbar tone="dark" variant="bar" />
      <EventHero event={event} />
      <EventPhotos
        photos={event.photos}
        onOpenLightbox={(idx) => setLightboxIndex(idx)}
      />

      {/* Films of this event (light band, only if videos exist) */}
      {eventFilms.length > 0 && (
        <GalleryFilms
          films={eventFilms}
          id="event-films"
          indexPrefix="FILMS"
        />
      )}

      {/* Adjacent Event Navigation */}
      <MoreEvents prev={prev} next={next} />

      {/* Fullscreen Lightbox Modal */}
      <GalleryLightbox
        photos={event.photos}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}

export default EventPage;
