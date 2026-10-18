"use client";

import { createContext, useContext, useMemo } from "react";
import { useDirectorySearch } from "./useDirectorySearch";

interface DirectoryContextValue<T> {
  query: string;
  setQuery: (q: string) => void;
  filteredItems: T[];
  filterList: (list: T[]) => T[];
  resultCount: number;
  isSearching: boolean;
}

const DirectoryContext = createContext<DirectoryContextValue<unknown> | null>(null);

export function DirectoryProvider<T>({
  items,
  getSearchText,
  children,
}: {
  items: T[];
  getSearchText: (item: T) => string;
  children: React.ReactNode;
}) {
  const search = useDirectorySearch(items, getSearchText);

  const value = useMemo(
    () => ({
      ...search,
      filterList: (list: T[]) => {
        const q = search.query.trim().toLowerCase();
        if (!q) return list;
        return list.filter((item) =>
          getSearchText(item).toLowerCase().includes(q)
        );
      },
    }),
    [search, getSearchText]
  );

  return (
    <DirectoryContext.Provider value={value as unknown as DirectoryContextValue<unknown>}>
      {children}
    </DirectoryContext.Provider>
  );
}

export function useDirectory<T>() {
  const ctx = useContext(DirectoryContext);
  if (!ctx) throw new Error("useDirectory must be used within DirectoryProvider");
  return ctx as unknown as DirectoryContextValue<T>;
}
