// Pure computation helpers for News metrics, grouping, date formatting, and related posts.

import type { Block, NewsPost, MonthGroup, NewsCategoryCount, NewsYearCount } from "./types";
import { NEWS_CONFIG } from "./config";

/**
 * Counts total words across all block types and calculates estimated read time in minutes.
 * Standard rate: 200 wpm, rounded up, minimum 1 minute.
 */
export function computeReadTime(body: Block[]): number {
  let wordCount = 0;

  for (const block of body) {
    if (block.type === "h2") {
      wordCount += block.content.trim().split(/\s+/).filter(Boolean).length;
    } else if (block.type === "p") {
      const text = typeof block.content === "string"
        ? block.content
        : Array.isArray(block.content)
        ? block.content.map((s) => (typeof s === "string" ? s : s.text)).join(" ")
        : typeof block.content === "object" && block.content !== null && "text" in block.content
        ? (block.content as { text: string }).text
        : "";
      wordCount += text.trim().split(/\s+/).filter(Boolean).length;
    } else if (block.type === "ol" || block.type === "ul") {
      for (const item of block.content) {
        const text = typeof item === "string"
          ? item
          : Array.isArray(item)
          ? item.map((s) => (typeof s === "string" ? s : s.text)).join(" ")
          : typeof item === "object" && item !== null && "text" in item
          ? (item as { text: string }).text
          : "";
        wordCount += text.trim().split(/\s+/).filter(Boolean).length;
      }
    } else if (block.type === "quote") {
      wordCount += block.text.trim().split(/\s+/).filter(Boolean).length;
    }
  }

  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Formats an ISO date into uppercase short format: e.g. "OCT 14, 2026"
 */
export function formatDate(isoDate: string, locale: string = NEWS_CONFIG.locale): string {
  try {
    const d = new Date(isoDate);
    const formatter = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
    return formatter.format(d).toUpperCase();
  } catch {
    return isoDate;
  }
}

/**
 * Formats an ISO date into month and year string: e.g. "OCTOBER 2026"
 */
export function formatMonthYear(isoDate: string, locale: string = NEWS_CONFIG.locale): string {
  try {
    const d = new Date(isoDate);
    const formatter = new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
    return formatter.format(d).toUpperCase();
  } catch {
    return isoDate;
  }
}

/**
 * Groups an array of posts by month and year in descending chronological order.
 */
export function groupPostsByMonth(posts: NewsPost[]): MonthGroup[] {
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const map = new Map<string, NewsPost[]>();

  for (const post of sorted) {
    const key = post.date.substring(0, 7); // "YYYY-MM"
    const existing = map.get(key);
    if (existing) {
      existing.push(post);
    } else {
      map.set(key, [post]);
    }
  }

  const groups: MonthGroup[] = [];
  for (const [key, groupPosts] of map.entries()) {
    const sampleDate = groupPosts[0]?.date || `${key}-01`;
    groups.push({
      monthKey: key,
      monthLabel: formatMonthYear(sampleDate),
      posts: groupPosts,
    });
  }

  return groups;
}

/**
 * Computes unique categories with post counts.
 */
export function getCategories(posts: NewsPost[]): NewsCategoryCount[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Computes unique publication years with post counts in descending order.
 */
export function getYears(posts: NewsPost[]): NewsYearCount[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    const yr = post.date.substring(0, 4);
    counts.set(yr, (counts.get(yr) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => b.year.localeCompare(a.year));
}

/**
 * Finds the previous (chronologically older) and next (chronologically newer) posts.
 */
export function getAdjacentPosts(
  currentPost: NewsPost,
  allPosts: NewsPost[]
): { previous: NewsPost | null; next: NewsPost | null } {
  const sorted = [...allPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const currentIndex = sorted.findIndex((p) => p.slug === currentPost.slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  // Next is newer (lower index), Previous is older (higher index)
  const next = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const previous = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;

  return { previous, next };
}

/**
 * Computes related stories prioritizing matching category and overlapping tags.
 */
export function getRelatedPosts(
  currentPost: NewsPost,
  allPosts: NewsPost[],
  limit = 3
): NewsPost[] {
  const currentTags = new Set(currentPost.tags || []);

  const candidates = allPosts
    .filter((p) => p.slug !== currentPost.slug)
    .map((p) => {
      let score = 0;
      if (p.category === currentPost.category) score += 3;
      if (p.tags) {
        for (const t of p.tags) {
          if (currentTags.has(t)) score += 1;
        }
      }
      return { post: p, score };
    });

  // Sort by score descending, then by date descending
  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
  });

  return candidates.slice(0, limit).map((c) => c.post);
}
