"use client";

import { useState, useMemo, useEffect } from "react";

export function useDirectorySearch<T>(
  items: T[],
  getSearchText: (item: T) => string
) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 120);
    return () => clearTimeout(handler);
  }, [query]);

  const filteredItems = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      getSearchText(item).toLowerCase().includes(q)
    );
  }, [items, debouncedQuery, getSearchText]);

  return {
    query,
    setQuery,
    filteredItems,
    resultCount: filteredItems.length,
    isSearching: Boolean(debouncedQuery.trim()),
  };
}
