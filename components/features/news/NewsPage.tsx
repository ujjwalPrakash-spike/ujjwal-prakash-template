// Client orchestrator for /news index route managing filter state, URL synchronization, and component hierarchy.
"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/features/navigation/Navbar";
import { NewsHero } from "./NewsHero";
import { NewsFilterBar } from "./NewsFilterBar";
import { NewsFeatured } from "./NewsFeatured";
import { NewsArchive } from "./NewsArchive";
import { NewsClosing } from "./NewsClosing";
import { NEWS_POSTS } from "@/data/news";
import {
  getCategories,
  getYears,
  groupPostsByMonth,
  formatDate,
} from "@/lib/news/utils";

function NewsContent() {
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  // Sync initial query params on mount
  useEffect(() => {
    const cat = searchParams.get("category");
    const yr = searchParams.get("year");
    const q = searchParams.get("q");
    const tg = searchParams.get("tag");

    if (cat) setSelectedCategory(cat);
    if (yr) setSelectedYear(yr);
    if (q) setSearchQuery(q);
    if (tg) setSelectedTag(tg);
  }, [searchParams]);

  const categories = useMemo(() => getCategories(NEWS_POSTS), []);
  const years = useMemo(() => getYears(NEWS_POSTS), []);

  const featuredPost = useMemo(
    () => NEWS_POSTS.find((p) => p.featured) || NEWS_POSTS[0],
    []
  );

  const isFiltering =
    selectedCategory !== "all" ||
    selectedYear !== "all" ||
    searchQuery.trim() !== "" ||
    selectedTag !== "";

  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return NEWS_POSTS.filter((post) => {
      // Category filter
      if (
        selectedCategory !== "all" &&
        post.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // Year filter
      if (selectedYear !== "all" && !post.date.startsWith(selectedYear)) {
        return false;
      }

      // Tag filter
      if (selectedTag) {
        const hasTag = post.tags?.some(
          (t) => t.toLowerCase() === selectedTag.toLowerCase()
        );
        if (!hasTag) return false;
      }

      // Search query over title and excerpt
      if (q) {
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchExcerpt = post.excerpt.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedYear, searchQuery, selectedTag]);

  const monthGroups = useMemo(
    () => groupPostsByMonth(filteredPosts),
    [filteredPosts]
  );

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSelectedYear("all");
    setSearchQuery("");
    setSelectedTag("");
  };

  const latestDateFormatted = NEWS_POSTS[0]
    ? formatDate(NEWS_POSTS[0].date)
    : "";

  return (
    <div className="relative w-full min-h-screen bg-neutral-950 text-white flex flex-col">
      <Navbar tone="dark" variant="bar" />

      {/* Hero */}
      <NewsHero
        totalStories={NEWS_POSTS.length}
        totalCategories={categories.length}
        latestDate={latestDateFormatted}
      />

      {/* Sticky Filter Bar */}
      <NewsFilterBar
        categories={categories}
        years={years}
        selectedCategory={selectedCategory}
        selectedYear={selectedYear}
        searchQuery={searchQuery}
        selectedTag={selectedTag}
        onCategoryChange={setSelectedCategory}
        onYearChange={setSelectedYear}
        onSearchChange={setSearchQuery}
        onTagClear={() => setSelectedTag("")}
        filteredCount={filteredPosts.length}
      />

      {/* Featured Story (only when no filters or search are active) */}
      {!isFiltering && featuredPost && <NewsFeatured post={featuredPost} />}

      {/* Light Band Archive */}
      <NewsArchive
        groups={monthGroups}
        totalFiltered={filteredPosts.length}
        onClearFilters={handleClearFilters}
        isFiltered={isFiltering}
      />

      {/* Dark Closing CTA */}
      <NewsClosing />
    </div>
  );
}

export function NewsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950" />}>
      <NewsContent />
    </Suspense>
  );
}

export default NewsPage;
