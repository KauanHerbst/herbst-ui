import type { RegistryIndexEntry, RegistryItem } from '../types';

export type Fetcher = (
  url: string,
) => Promise<{ ok: boolean; status: number; text: () => Promise<string> }>;

export const defaultFetcher: Fetcher = (url) => fetch(url);

export async function fetchIndex(base: string, fetcher: Fetcher): Promise<RegistryIndexEntry[]> {
  const res = await fetcher(`${base}/index.json`);
  if (!res.ok) throw new Error(`Failed to fetch registry index (${res.status})`);
  const parsed = JSON.parse(await res.text());
  return (Array.isArray(parsed) ? parsed : parsed.items) as RegistryIndexEntry[];
}

export async function fetchItem(
  base: string,
  name: string,
  fetcher: Fetcher,
): Promise<RegistryItem> {
  const res = await fetcher(`${base}/r/${name}.json`);
  if (!res.ok) throw new Error(`Component "${name}" not found in registry (${res.status})`);
  return JSON.parse(await res.text()) as RegistryItem;
}
