import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runAdd } from './add';
import type { Fetcher } from '../lib/registry';

const index = [
  { name: 'utils', type: 'lib', dependencies: ['clsx'], registryDependencies: [] },
  {
    name: 'button',
    type: 'component',
    dependencies: ['class-variance-authority'],
    registryDependencies: ['utils'],
  },
];
const items: Record<string, unknown> = {
  '/r/utils.json': {
    name: 'utils',
    type: 'lib',
    dependencies: ['clsx'],
    registryDependencies: [],
    files: [{ path: 'utils/cn.ts', content: 'export const cn = 1;' }],
  },
  '/r/button.json': {
    name: 'button',
    type: 'component',
    dependencies: ['class-variance-authority'],
    registryDependencies: ['utils'],
    files: [{ path: 'button/button.component.ts', content: "import '{{alias}}/utils';" }],
  },
};

const fetcher: Fetcher = async (url) => {
  if (url.endsWith('/index.json')) {
    return { ok: true, status: 200, text: async () => JSON.stringify(index) };
  }
  const key = Object.keys(items).find((k) => url.endsWith(k));
  return key
    ? { ok: true, status: 200, text: async () => JSON.stringify(items[key]) }
    : { ok: false, status: 404, text: async () => '' };
};

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'herbst-'));
  writeFileSync(
    join(dir, 'herbst.json'),
    JSON.stringify({
      componentsDir: 'src/app/shared/ui',
      alias: '@shared/ui',
      stylesPath: 'src/styles.css',
      iconProvider: 'phosphor',
    }),
  );
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe('runAdd', () => {
  it('resolves deps, writes files and reports npm deps', async () => {
    const result = await runAdd(dir, ['button'], { fetcher, install: false });
    expect(existsSync(join(dir, 'src/app/shared/ui/utils/cn.ts'))).toBe(true);
    expect(existsSync(join(dir, 'src/app/shared/ui/button/button.component.ts'))).toBe(true);
    expect(result.installed.sort()).toEqual(['class-variance-authority', 'clsx'].sort());
  });

  it('errors when config is missing', async () => {
    rmSync(join(dir, 'herbst.json'));
    await expect(runAdd(dir, ['button'], { fetcher, install: false })).rejects.toThrow('init');
  });
});
