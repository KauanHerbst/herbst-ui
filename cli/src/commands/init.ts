import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DEFAULT_REGISTRY, type HerbstConfig } from '../types';
import { writeConfig } from '../lib/config';
import { patchTsconfigPaths } from '../lib/tsconfig';
import { ensureImports } from '../lib/styles';
import { pickAngularProject } from '../lib/angular';
import { defaultFetcher, fetchItem, type Fetcher } from '../lib/registry';
import { writeItems } from '../lib/writer';
import { detectPackageManager, runInstall } from '../lib/pkg';

const BASE_DEPS = [
  'clsx',
  'tailwind-merge',
  'class-variance-authority',
  '@ng-icons/core',
  '@ng-icons/phosphor-icons',
];

export interface InitOptions {
  yes?: boolean;
  fetcher?: Fetcher;
  install?: boolean;
  project?: string;
}

export async function runInit(cwd: string, opts: InitOptions = {}): Promise<HerbstConfig> {
  const fetcher = opts.fetcher ?? defaultFetcher;
  const angularJson = JSON.parse(await readFile(join(cwd, 'angular.json'), 'utf8'));
  const target = pickAngularProject(angularJson, opts.project);

  const config: HerbstConfig = {
    componentsDir: 'src/app/shared/ui',
    alias: '@shared/ui',
    stylesPath: target.stylesPath,
    iconProvider: 'phosphor',
  };

  await writeConfig(cwd, config);
  await patchTsconfigPaths(cwd, config.alias, config.componentsDir);

  const utils = await fetchItem(DEFAULT_REGISTRY, 'utils', fetcher);
  const theme = await fetchItem(DEFAULT_REGISTRY, 'theme', fetcher);
  await writeItems([utils, theme], config, cwd, { overwrite: true });
  await ensureImports(cwd, config);

  if (opts.install !== false) {
    runInstall(detectPackageManager(cwd), BASE_DEPS, cwd);
  }

  return config;
}
