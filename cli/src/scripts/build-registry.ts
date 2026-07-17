import { readdirSync, readFileSync, mkdirSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { analyzeComponent } from '../lib/analyze';
import type { RegistryFile, RegistryIndex, RegistryIndexEntry, RegistryItem, RegistryType } from '../types';

export function buildItem(
  name: string,
  type: RegistryType,
  files: { file: string; content: string }[],
): RegistryItem {
  const sources = files.filter((f) => !f.file.endsWith('.spec.ts'));
  const analyzed = analyzeComponent(name, sources);
  return {
    name,
    type,
    dependencies: analyzed.dependencies,
    devDependencies: [],
    registryDependencies: analyzed.registryDependencies.filter((d) => d !== name),
    files: analyzed.files,
  };
}

function readFolder(dir: string): { file: string; content: string }[] {
  return readdirSync(dir)
    .filter((f) => statSync(join(dir, f)).isFile())
    .map((f) => ({ file: f, content: readFileSync(join(dir, f), 'utf8') }));
}

function readDemos(dir: string): RegistryFile[] {
  if (!existsSync(dir)) return [];
  return readFolder(dir)
    .filter((f) => f.file.endsWith('.ts') && f.file !== 'index.ts')
    .map((f) => ({ path: f.file, content: f.content }));
}

export function buildRegistry(
  componentsRoot: string,
  libRoot: string,
  demosRoot: string,
): RegistryItem[] {
  const items: RegistryItem[] = [];

  for (const entry of readdirSync(componentsRoot)) {
    const dir = join(componentsRoot, entry);
    if (!statSync(dir).isDirectory()) continue;
    const item = buildItem(entry, 'registry:component', readFolder(dir));
    const demos = readDemos(join(demosRoot, entry));
    if (demos.length) item.demos = demos;
    items.push(item);
  }

  for (const lib of ['utils', 'core', 'services']) {
    const dir = join(libRoot, lib);
    if (!existsSync(dir)) continue;
    items.push(buildItem(lib, 'registry:lib', readFolder(dir)));
  }

  const themeCss = readFileSync(join(libRoot, 'styles', 'theme.css'), 'utf8');
  items.push({
    name: 'theme',
    type: 'registry:lib',
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
    files: [{ path: 'theme.css', content: themeCss }],
  });

  return items;
}

function toIndex(version: string, items: RegistryItem[]): RegistryIndex {
  const entries: RegistryIndexEntry[] = items.map((i) => ({
    name: i.name,
    type: i.type,
    dependencies: i.dependencies,
    devDependencies: i.devDependencies,
    registryDependencies: i.registryDependencies,
  }));
  return { version, items: entries };
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const cliRoot = join(here, '..', '..');
  const repoRoot = join(cliRoot, '..');
  const libRoot = join(repoRoot, 'projects', 'herbst', 'src', 'lib', 'shared');
  const componentsRoot = join(libRoot, 'components');
  const demosRoot = join(repoRoot, 'src', 'app', 'docs', 'demos');
  const outRoot = join(repoRoot, 'registry');
  const rRoot = join(outRoot, 'r');

  const version = JSON.parse(readFileSync(join(cliRoot, 'package.json'), 'utf8')).version;
  const items = buildRegistry(componentsRoot, libRoot, demosRoot);
  const index = toIndex(version, items);

  mkdirSync(rRoot, { recursive: true });
  writeFileSync(join(outRoot, 'index.json'), JSON.stringify(index, null, 2) + '\n');
  for (const item of items) {
    writeFileSync(join(rRoot, `${item.name}.json`), JSON.stringify(item, null, 2) + '\n');
  }
  process.stdout.write(`registry: ${items.length} items written (v${version})\n`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
