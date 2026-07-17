import { DEFAULT_REGISTRY } from '../types';
import { readConfig } from '../lib/config';
import { defaultFetcher, fetchIndex, fetchItem, type Fetcher } from '../lib/registry';
import { resolveGraph } from '../lib/resolve';
import { writeItems } from '../lib/writer';
import { detectPackageManager, runInstall } from '../lib/pkg';

export interface AddOptions {
  overwrite?: boolean;
  fetcher?: Fetcher;
  install?: boolean;
}

export async function runAdd(
  cwd: string,
  names: string[],
  opts: AddOptions = {},
): Promise<{ written: string[]; skipped: string[]; installed: string[] }> {
  const config = await readConfig(cwd);
  if (!config) throw new Error('No herbst.json found. Run "herbst-ui init" first.');

  const fetcher = opts.fetcher ?? defaultFetcher;
  const base = config.registry ?? DEFAULT_REGISTRY;

  const index = await fetchIndex(base, fetcher);
  const order = resolveGraph(names, index);

  const items = [];
  const npmDeps = new Set<string>();
  for (const name of order) {
    const item = await fetchItem(base, name, fetcher);
    items.push(item);
    for (const dep of item.dependencies) npmDeps.add(dep);
  }

  const result = await writeItems(items, config, cwd, { overwrite: opts.overwrite ?? false });

  const installed = [...npmDeps];
  if (opts.install !== false) {
    runInstall(detectPackageManager(cwd), installed, cwd);
  }

  return { ...result, installed };
}
