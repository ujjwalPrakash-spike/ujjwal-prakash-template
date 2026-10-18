// Pure collection helpers: grouping, distinct counts, and ranking.

export function groupBy<T, K extends string>(
  items: T[],
  getKey: (item: T) => K
): { group: K; items: T[] }[] {
  const map = new Map<K, T[]>();
  for (const item of items) {
    const key = getKey(item);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }
  return Array.from(map.entries()).map(([group, groupItems]) => ({
    group,
    items: groupItems,
  }));
}

export function countDistinct<T, K>(items: T[], getKey: (item: T) => K): number {
  return new Set(items.map(getKey)).size;
}

export function topNByCount<T, K extends string>(
  items: T[],
  getKey: (item: T) => K,
  n: number
): { key: K; count: number }[] {
  const counts = new Map<K, number>();
  for (const item of items) {
    const k = getKey(item);
    if (!k) continue;
    counts.set(k, (counts.get(k) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.key.localeCompare(b.key);
    })
    .slice(0, n);
}
