import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runInit } from './init';
import type { Fetcher } from '../lib/registry';

const registry: Record<string, unknown> = {
  '/r/utils.json': {
    name: 'utils',
    type: 'lib',
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: [],
    files: [{ path: 'utils/index.ts', content: "export * from './cn';" }],
  },
  '/r/theme.json': {
    name: 'theme',
    type: 'lib',
    dependencies: [],
    registryDependencies: [],
    files: [{ path: 'theme.css', content: ':root { --primary: red; }' }],
  },
};

const fetcher: Fetcher = async (url) => {
  const key = Object.keys(registry).find((k) => url.endsWith(k));
  return key
    ? { ok: true, status: 200, text: async () => JSON.stringify(registry[key]) }
    : { ok: false, status: 404, text: async () => '' };
};

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'herbst-'));
  mkdirSync(join(dir, 'src'), { recursive: true });
  writeFileSync(join(dir, 'src', 'styles.css'), '');
  writeFileSync(join(dir, 'tsconfig.json'), '{ "compilerOptions": {} }');
  writeFileSync(
    join(dir, 'angular.json'),
    JSON.stringify({
      projects: {
        demo: {
          projectType: 'application',
          architect: { build: { options: { styles: ['src/styles.css'] } } },
        },
      },
    }),
  );
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe('runInit', () => {
  it('writes config, patches tsconfig, installs theme and utils', async () => {
    const config = await runInit(dir, { yes: true, fetcher, install: false });
    expect(config.alias).toBe('@shared/ui');
    expect(existsSync(join(dir, 'herbst.json'))).toBe(true);

    const ts = JSON.parse(readFileSync(join(dir, 'tsconfig.json'), 'utf8'));
    expect(ts.compilerOptions.paths['@shared/ui/*']).toEqual(['src/app/shared/ui/*']);

    expect(existsSync(join(dir, 'src/app/shared/ui/utils/index.ts'))).toBe(true);
    expect(existsSync(join(dir, 'src/app/shared/ui/theme.css'))).toBe(true);

    const css = readFileSync(join(dir, 'src/styles.css'), 'utf8');
    expect(css).toContain("@import 'tailwindcss';");
    expect(css).toContain('theme.css');
  });
});
