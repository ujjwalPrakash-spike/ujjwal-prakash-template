import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INSIGHTS_DATA, ARTICLE_BODIES, Insight } from "@/lib/insights";
import {
  ArticleHero,
  ArticleBody,
  ArticleContinue,
} from "@/components/features/insights/article";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = INSIGHTS_DATA.filter((i) => i.kind === "article");
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const articleMeta = INSIGHTS_DATA.find(
    (i): i is Extract<Insight, { kind: "article" }> =>
      i.kind === "article" && i.slug === slug
  );
  const articleContent = ARTICLE_BODIES[slug];

  if (!articleMeta || !articleContent) {
    return {
      title: "Insight Not Found | SPO Insights",
    };
  }

  // Extract description from first paragraph
  let description = `${articleMeta.title} - SPO Insights IIT Kanpur.`;
  const firstP = articleContent.blocks.find((b) => b.type === "p");
  if (firstP) {
    let pText = "";
    if (typeof firstP.content === "string") {
      pText = firstP.content;
    } else if (Array.isArray(firstP.content)) {
      pText = firstP.content
        .map((c) => (typeof c === "string" ? c : c.text))
        .join(" ");
    }
    if (pText.length > 155) {
      const truncated = pText.slice(0, 155);
      const lastSpace = truncated.lastIndexOf(" ");
      description = (lastSpace > 120 ? truncated.slice(0, lastSpace) : truncated) + "...";
    } else if (pText) {
      description = pText;
    }
  }

  return {
    title: `${articleMeta.title} | SPO Insights`,
    description,
    openGraph: {
      title: `${articleMeta.title} | SPO Insights`,
      description,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const articleEntries = INSIGHTS_DATA.filter(
    (i): i is Extract<Insight, { kind: "article" }> => i.kind === "article"
  );
  const posInArticles = articleEntries.findIndex((a) => a.slug === slug);
  if (posInArticles === -1) notFound();

  const article = articleEntries[posInArticles];
  const articleContent = ARTICLE_BODIES[slug];
  if (!articleContent) notFound();

  const prevArticle = posInArticles > 0 ? articleEntries[posInArticles - 1] : null;
  const nextArticle =
    posInArticles < articleEntries.length - 1
      ? articleEntries[posInArticles + 1]
      : null;

  // "More from {company}": up to 4 other insights from same company
  const moreFromCompany = INSIGHTS_DATA.filter(
    (i) =>
      i.company.toLowerCase() === article.company.toLowerCase() &&
      (i.kind === "drive" || i.slug !== slug)
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-[#93c5fd]/30 selection:text-white">
      <main id="main-content">
        <ArticleHero
          title={article.title}
          type={article.type}
          year={article.year}
          date={article.date}
          readTime={articleContent.readTime}
          role={article.role}
          company={article.company}
        />
        <ArticleBody blocks={articleContent.blocks} />
        <ArticleContinue
          prevArticle={prevArticle}
          nextArticle={nextArticle}
          moreFromCompany={moreFromCompany}
          companyName={article.company}
        />
      </main>
    </div>
  );
}
