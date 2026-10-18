// Client orchestrator for /gallery index page with filter state and section composition.
"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/features/navigation/Navbar";
import { GalleryHero } from "./GalleryHero";
import { GalleryFilterBar } from "./GalleryFilterBar";
import { GalleryEvents } from "./GalleryEvents";
import { GalleryFilms } from "./GalleryFilms";
import { GalleryClosing } from "./GalleryClosing";
import { GALLERY_EVENTS } from "@/lib/gallery/data";
import { FILMS } from "@/lib/gallery/films";
import {
  computeGalleryStats,
  getGalleryYears,
  getGallerySeries,
} from "@/lib/gallery/utils";

export function GalleryPage() {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedSeries, setSelectedSeries] = useState<string>("all");

  const stats = useMemo(() => computeGalleryStats(GALLERY_EVENTS, FILMS), []);
  const years = useMemo(() => getGalleryYears(GALLERY_EVENTS), []);
  const seriesList = useMemo(() => getGallerySeries(GALLERY_EVENTS), []);

  const filteredEvents = useMemo(() => {
    return GALLERY_EVENTS.filter((event) => {
      const matchYear =
        selectedYear === "all" || event.date.startsWith(selectedYear);
      const matchSeries =
        selectedSeries === "all" || event.series === selectedSeries;
      return matchYear && matchSeries;
    });
  }, [selectedYear, selectedSeries]);

  const handleClearFilters = () => {
    setSelectedYear("all");
    setSelectedSeries("all");
  };

  return (
    <div className="relative w-full min-h-screen bg-neutral-950 text-white flex flex-col">
      <Navbar tone="dark" variant="bar" />
      <GalleryHero stats={stats} />
      <GalleryFilterBar
        years={years}
        seriesList={seriesList}
        selectedYear={selectedYear}
        selectedSeries={selectedSeries}
        onYearChange={setSelectedYear}
        onSeriesChange={setSelectedSeries}
        filteredCount={filteredEvents.length}
      />
      <GalleryEvents
        events={filteredEvents}
        onClearFilters={handleClearFilters}
      />
      <GalleryFilms films={FILMS} />
      <GalleryClosing />
    </div>
  );
}

export default GalleryPage;
