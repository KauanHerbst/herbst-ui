import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { HerbstConfig } from '../types';

export const CONFIG_FILE = 'herbst.json';

export async function readConfig(cwd: string): Promise<HerbstConfig | null> {
  try {
    const raw = await readFile(join(cwd, CONFIG_FILE), 'utf8');
    return JSON.parse(raw) as HerbstConfig;
  } catch {
    return null;
  }
}

export async function writeConfig(cwd: string, config: HerbstConfig): Promise<void> {
  await writeFile(join(cwd, CONFIG_FILE), JSON.stringify(config, null, 2) + '\n');
}
