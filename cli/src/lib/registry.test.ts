import { describe, expect, it } from 'vitest';
import { fetchIndex, fetchItem, type Fetcher } from './registry';

function fakeFetcher(map: Record<string, unknown>): Fetcher {
  return async (url: string) => {
    const key = Object.keys(map).find((k) => url.endsWith(k));
    if (!key) return { ok: false, status: 404, text: async () => '' };
    return { ok: true, status: 200, text: async () => JSON.stringify(map[key]) };
  };
}

describe('registry', () => {
  it('fetches the index', async () => {
    const f = fakeFetcher({ '/index.json': [{ name: 'button', type: 'component' }] });
    const index = await fetchIndex('https://x/registry', f);
    expect(index[0].name).toBe('button');
  });

  it('throws a clear error on 404', async () => {
    const f = fakeFetcher({});
    await expect(fetchItem('https://x/registry', 'nope', f)).rejects.toThrow('nope');
  });
});
