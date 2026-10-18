// Type definitions for Gallery events, photo items, filter options, and films.

export type GallerySeries = "Architecture & Spatial" | "Kinetic Systems" | "Material Research";

export interface GalleryPhoto {
  src?: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

export interface GalleryEvent {
  slug: string;
  title: string;
  series: GallerySeries;
  date: string; // ISO date string (YYYY-MM-DD)
  location: string;
  cover?: string;
  coverAlt: string;
  summary?: string;
  photos: GalleryPhoto[];
  videos?: string[]; // IDs referencing films
}

export type FilmProvider = "youtube" | "vimeo";

export interface FilmItem {
  id: string;
  title: string;
  duration: string;
  provider: FilmProvider;
  videoId: string;
  poster?: string;
}

export type Density = "S" | "M" | "L";
