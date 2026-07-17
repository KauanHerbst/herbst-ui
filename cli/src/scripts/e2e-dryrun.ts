import { mkdtempSync, writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInit } from '../commands/init';
import { runAdd } from '../commands/add';
import type { Fetcher } from '../lib/registry';

const here = dirname(fileURLToPath(import.meta.url));
const registryDir = join(here, '..', '..', '..', 'registry');

const localFetcher: Fetcher = async (url) => {
  const rel = url.split('/registry/')[1];
  const abs = join(registryDir, rel);
  if (!existsSync(abs)) return { ok: false, status: 404, text: async () => '' };
  const text = readFileSync(abs, 'utf8');
  return { ok: true, status: 200, text: async () => text };
};

const dir = mkdtempSync(join(tmpdir(), 'herbst-e2e-'));
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

await runInit(dir, { yes: true, fetcher: localFetcher, install: false });
const result = await runAdd(dir, ['table'], { fetcher: localFetcher, install: false });
process.stdout.write(`wrote ${result.written.length} files, deps: ${result.installed.join(', ')}\n`);
process.stdout.write(`dir: ${dir}\n`);
