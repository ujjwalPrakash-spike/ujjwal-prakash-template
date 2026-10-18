// Dynamic route for /gallery/[slug] with static pre-rendering, metadata, JSON-LD, and EventPage.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventPage } from "@/components/features/gallery/EventPage";
import { GALLERY_EVENTS } from "@/lib/gallery/data";
import { getEventBySlug } from "@/lib/gallery/utils";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return GALLERY_EVENTS.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Exhibition Not Found | APEX.WORKS",
    };
  }

  const title = `${event.title} | APEX.WORKS`;
  const description =
    event.summary || `${event.title} (${event.series}) photographed on location in ${event.location}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: event.cover ? [{ url: event.cover, alt: event.coverAlt }] : [],
    },
  };
}

export default async function EventRoute({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Structured Data: Schema.org ImageGallery
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: event.title,
    description: event.summary,
    datePublished: event.date,
    contentLocation: event.location,
    image: event.photos.map((p) => p.src).filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventPage event={event} />
    </>
  );
}
