// Dynamic route for /news/[slug] with SSG pre-rendering, metadata, JSON-LD, and ArticlePage.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/features/news/ArticlePage";
import { NEWS_POSTS } from "@/data/news";
import { getAdjacentPosts, getRelatedPosts } from "@/lib/news/utils";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return NEWS_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = NEWS_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Story Not Found | APEX.WORKS",
    };
  }

  const title = `${post.title} | APEX.WORKS`;
  const description = post.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: post.cover ? [{ url: post.cover, alt: post.coverAlt || post.title }] : [],
    },
  };
}

export default async function NewsArticleRoute({ params }: PageProps) {
  const { slug } = await params;
  const post = NEWS_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = getAdjacentPosts(post, NEWS_POSTS);
  const related = getRelatedPosts(post, NEWS_POSTS, 3);

  // Structured Data: Schema.org NewsArticle
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: [
      {
        "@type": "Person",
        name: post.author || "APEX Atelier Editorial",
      },
    ],
    image: post.cover ? [post.cover] : [],
    publisher: {
      "@type": "Organization",
      name: "APEX.WORKS",
    },
  };

  return (
    <main className="relative w-full bg-neutral-950 text-white selection:bg-[#93c5fd] selection:text-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticlePage
        post={post}
        previous={previous}
        next={next}
        related={related}
      />
    </main>
  );
}
