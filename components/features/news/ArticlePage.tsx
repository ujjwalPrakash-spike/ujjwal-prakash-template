// Orchestrator for /news/[slug] single article view.
"use client";

import React from "react";
import { Navbar } from "@/components/features/navigation/Navbar";
import { ArticleHero } from "./ArticleHero";
import { ArticleBody } from "./ArticleBody";
import { ContinueStories } from "./ContinueStories";
import type { NewsPost } from "@/lib/news/types";

interface ArticlePageProps {
  post: NewsPost;
  previous: NewsPost | null;
  next: NewsPost | null;
  related: NewsPost[];
}

export function ArticlePage({ post, previous, next, related }: ArticlePageProps) {
  return (
    <div className="relative w-full min-h-screen bg-neutral-950 text-white flex flex-col">
      <Navbar tone="dark" variant="bar" />
      <ArticleHero post={post} />
      <ArticleBody post={post} />
      <ContinueStories previous={previous} next={next} related={related} />
    </div>
  );
}

export default ArticlePage;
