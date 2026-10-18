// Master client component managing catalogue state, URL synchronization, and drawer overlays.
"use client";

import React, { useState, useMemo, useCallback } from "react";
import type { Product } from "@/lib/merch/types";
import { PRODUCTS } from "@/lib/merch/data";
import { MerchHero } from "./MerchHero";
import { MerchFilterBar, type CategoryFilter, type SortOption } from "./MerchFilterBar";
import { MerchProductIndex } from "./MerchProductIndex";
import { MerchQuickView } from "./MerchQuickView";
import { MerchFeatured } from "./MerchFeatured";
import { MerchDetailsStrip } from "./MerchDetailsStrip";
import { MerchClosing } from "./MerchClosing";

export function MerchPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(() => {
    if (typeof window === "undefined") return "all";
    const cat = new URLSearchParams(window.location.search).get("category");
    return cat === "apparel" || cat === "gear" || cat === "limited" ? cat : "all";
  });
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("q") || "";
  });
  const [activeSort, setActiveSort] = useState<SortOption>(() => {
    if (typeof window === "undefined") return "featured";
    const sort = new URLSearchParams(window.location.search).get("sort");
    return sort === "price-asc" || sort === "price-desc" || sort === "featured" ? sort : "featured";
  });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(() => {
    if (typeof window === "undefined") return null;
    const slug = new URLSearchParams(window.location.search).get("product");
    return PRODUCTS.find((p) => p.slug === slug) || null;
  });

  // Sync state to URL via history.replaceState
  const syncUrl = useCallback(
    (cat: CategoryFilter, sort: SortOption, q: string, slug?: string) => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams();
      if (cat !== "all") params.set("category", cat);
      if (sort !== "featured") params.set("sort", sort);
      if (q.trim()) params.set("q", q.trim());
      if (slug) params.set("product", slug);

      const queryStr = params.toString();
      const newUrl = queryStr ? `${window.location.pathname}?${queryStr}` : window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    },
    []
  );

  const handleCategoryChange = (cat: CategoryFilter) => {
    setActiveCategory(cat);
    syncUrl(cat, activeSort, searchQuery, quickViewProduct?.slug);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    syncUrl(activeCategory, activeSort, q, quickViewProduct?.slug);
  };

  const handleSortChange = (sort: SortOption) => {
    setActiveSort(sort);
    syncUrl(activeCategory, sort, searchQuery, quickViewProduct?.slug);
  };

  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
    syncUrl(activeCategory, activeSort, searchQuery, product.slug);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
    syncUrl(activeCategory, activeSort, searchQuery);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.details.some((d) => d.toLowerCase().includes(q))
        );
      });
    }

    if (activeSort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, searchQuery, activeSort]);

  // Category counts computed from data
  const categoriesList = useMemo(() => {
    return [
      { id: "all" as CategoryFilter, label: "All Objects", count: PRODUCTS.length },
      {
        id: "apparel" as CategoryFilter,
        label: "Apparel System",
        count: PRODUCTS.filter((p) => p.category === "apparel").length,
      },
      {
        id: "gear" as CategoryFilter,
        label: "Hardware & Gear",
        count: PRODUCTS.filter((p) => p.category === "gear").length,
      },
      {
        id: "limited" as CategoryFilter,
        label: "Numbered Archive",
        count: PRODUCTS.filter((p) => p.category === "limited").length,
      },
    ];
  }, []);

  // Quick view next/prev navigation
  const currentIndex = quickViewProduct
    ? filteredProducts.findIndex((p) => p.id === quickViewProduct.id)
    : -1;

  const handlePrevProduct =
    currentIndex > 0
      ? () => handleOpenQuickView(filteredProducts[currentIndex - 1])
      : undefined;

  const handleNextProduct =
    currentIndex >= 0 && currentIndex < filteredProducts.length - 1
      ? () => handleOpenQuickView(filteredProducts[currentIndex + 1])
      : undefined;

  const featuredProduct = PRODUCTS.find((p) => p.featured) || PRODUCTS[0];

  return (
    <div className="w-full bg-neutral-950 text-white">
      {/* 01. Hero */}
      <MerchHero />

      {/* 02. Sticky Filter Bar */}
      <MerchFilterBar
        categories={categoriesList}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        activeSort={activeSort}
        onSortChange={handleSortChange}
        resultCount={filteredProducts.length}
      />

      {/* 03. Product Index */}
      <MerchProductIndex
        products={filteredProducts}
        onSelectProduct={handleOpenQuickView}
        onClearFilters={() => {
          setActiveCategory("all");
          setSearchQuery("");
          setActiveSort("featured");
          syncUrl("all", "featured", "");
        }}
      />

      {/* 04. Quick View Drawer */}
      <MerchQuickView
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={handleCloseQuickView}
        onPrev={handlePrevProduct}
        onNext={handleNextProduct}
      />

      {/* 05. Featured (Light surface) */}
      <MerchFeatured
        product={featuredProduct}
        onOpenQuickView={handleOpenQuickView}
      />

      {/* 06. Details Strip (Dark surface) */}
      <MerchDetailsStrip />

      {/* 07. Closing (Light surface) */}
      <MerchClosing />
    </div>
  );
}

export default MerchPage;
