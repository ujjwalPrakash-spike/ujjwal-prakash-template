// Editorial /merch page route: provides SEO metadata, JSON-LD ItemList schema, and renders MerchPage.
import type { Metadata } from "next";
import { MerchPage } from "@/components/features/merch";
import { MERCH_CONFIG } from "@/lib/merch/config";
import { PRODUCTS } from "@/lib/merch/data";

export const metadata: Metadata = {
  title: `${MERCH_CONFIG.title} | APEX.WORKS`,
  description: MERCH_CONFIG.lead,
  openGraph: {
    title: `${MERCH_CONFIG.title} | APEX.WORKS`,
    description: MERCH_CONFIG.lead,
    type: "website",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: MERCH_CONFIG.title,
    description: MERCH_CONFIG.lead,
    numberOfItems: PRODUCTS.length,
    itemListElement: PRODUCTS.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: MERCH_CONFIG.currency,
          availability: product.available
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MerchPage />
    </>
  );
}
