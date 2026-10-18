// Pure helper utilities for gallery statistics, date formatting, layout computation, and event pagination.
import { GALLERY_EVENTS } from "./data";
import { FILMS } from "./films";
import { GALLERY_CONFIG } from "./config";
import type { GalleryEvent, GalleryPhoto } from "./types";

export interface GalleryStats {
  eventsCount: number;
  photosCount: number;
  filmsCount: number;
  yearsCount: number;
}

export function computeGalleryStats(
  events: GalleryEvent[] = GALLERY_EVENTS,
  films = FILMS
): GalleryStats {
  const eventsCount = events.length;
  const photosCount = events.reduce((acc, ev) => acc + ev.photos.length, 0);
  const filmsCount = films.length;
  const years = new Set(events.map((ev) => ev.date.slice(0, 4)));

  return {
    eventsCount,
    photosCount,
    filmsCount,
    yearsCount: years.size,
  };
}

export interface YearOption {
  year: string;
  count: number;
}

export function getGalleryYears(events: GalleryEvent[] = GALLERY_EVENTS): YearOption[] {
  const map = new Map<string, number>();
  events.forEach((ev) => {
    const yr = ev.date.slice(0, 4);
    map.set(yr, (map.get(yr) || 0) + 1);
  });

  return Array.from(map.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => b.year.localeCompare(a.year));
}

export interface SeriesOption {
  series: string;
  count: number;
}

export function getGallerySeries(events: GalleryEvent[] = GALLERY_EVENTS): SeriesOption[] {
  const map = new Map<string, number>();
  events.forEach((ev) => {
    map.set(ev.series, (map.get(ev.series) || 0) + 1);
  });

  return Array.from(map.entries())
    .map(([series, count]) => ({ series, count }))
    .sort((a, b) => a.series.localeCompare(b.series));
}

export function formatGalleryDate(
  isoDate: string,
  locale = GALLERY_CONFIG.locale
): string {
  try {
    const [year, month, day] = isoDate.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return isoDate;
  }
}

export function getEventBySlug(slug: string): GalleryEvent | undefined {
  return GALLERY_EVENTS.find((e) => e.slug === slug);
}

export function getAdjacentEvents(currentSlug: string): {
  prev: GalleryEvent | null;
  next: GalleryEvent | null;
} {
  // Sort by date ascending
  const sorted = [...GALLERY_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  const currentIndex = sorted.findIndex((e) => e.slug === currentSlug);
  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const next = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

  return { prev, next };
}

/**
 * Pure justified-row layout calculation: computes per-item dimensions so each row fills the container.
 */
export interface JustifiedRowItem {
  photo: GalleryPhoto;
  index: number;
  width: number;
  height: number;
}

export interface JustifiedRow {
  items: JustifiedRowItem[];
  rowHeight: number;
  isLastRow: boolean;
}

export function computeJustifiedRows(
  photos: GalleryPhoto[],
  containerWidth: number,
  targetRowHeight: number,
  gap = 8
): JustifiedRow[] {
  if (containerWidth <= 0 || photos.length === 0) return [];

  const rows: JustifiedRow[] = [];
  let currentRowPhotos: { photo: GalleryPhoto; index: number; aspect: number }[] = [];
  let currentRowAspectSum = 0;

  photos.forEach((photo, index) => {
    const aspect = photo.width > 0 && photo.height > 0 ? photo.width / photo.height : 1.5;
    currentRowPhotos.push({ photo, index, aspect });
    currentRowAspectSum += aspect;

    const rowGaps = (currentRowPhotos.length - 1) * gap;
    const availableWidth = containerWidth - rowGaps;
    const computedHeight = availableWidth / currentRowAspectSum;

    // When computed height drops close to or below target, lock row
    if (computedHeight <= targetRowHeight * 1.15 && currentRowPhotos.length >= 2) {
      const rowHeight = Math.round(computedHeight);
      let consumedWidth = 0;

      const items: JustifiedRowItem[] = currentRowPhotos.map((item, i) => {
        const isLastItemInRow = i === currentRowPhotos.length - 1;
        const itemWidth = isLastItemInRow
          ? availableWidth - consumedWidth
          : Math.round(rowHeight * item.aspect);
        consumedWidth += itemWidth;

        return {
          photo: item.photo,
          index: item.index,
          width: itemWidth,
          height: rowHeight,
        };
      });

      rows.push({ items, rowHeight, isLastRow: false });
      currentRowPhotos = [];
      currentRowAspectSum = 0;
    }
  });

  // Last row unscaled left-aligned
  if (currentRowPhotos.length > 0) {
    const items: JustifiedRowItem[] = currentRowPhotos.map((item) => ({
      photo: item.photo,
      index: item.index,
      width: Math.round(targetRowHeight * item.aspect),
      height: targetRowHeight,
    }));
    rows.push({ items, rowHeight: targetRowHeight, isLastRow: true });
  }

  return rows;
}
