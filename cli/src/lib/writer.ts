import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { ALIAS_TOKEN, type HerbstConfig, type RegistryItem } from '../types';

export function substituteAlias(content: string, alias: string): string {
  return content.split(ALIAS_TOKEN).join(alias);
}

export interface WriteOptions {
  overwrite: boolean;
}

export async function writeItems(
  items: RegistryItem[],
  config: HerbstConfig,
  cwd: string,
  opts: WriteOptions,
): Promise<{ written: string[]; skipped: string[] }> {
  const written: string[] = [];
  const skipped: string[] = [];

  for (const item of items) {
    for (const file of item.files) {
      const rel = join(config.componentsDir, file.path);
      const abs = join(cwd, rel);
      if (existsSync(abs) && !opts.overwrite) {
        skipped.push(rel);
        continue;
      }
      await mkdir(dirname(abs), { recursive: true });
      await writeFile(abs, substituteAlias(file.content, config.alias));
      written.push(rel);
    }
  }

  return { written, skipped };
}
