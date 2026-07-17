import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readConfig, writeConfig } from './config';

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'herbst-'));
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe('config', () => {
  it('returns null when no config exists', async () => {
    expect(await readConfig(dir)).toBeNull();
  });

  it('round-trips a written config', async () => {
    const config = {
      componentsDir: 'src/app/shared/ui',
      alias: '@shared/ui',
      stylesPath: 'src/styles.css',
      iconProvider: 'phosphor',
    };
    await writeConfig(dir, config);
    expect(await readConfig(dir)).toEqual(config);
  });
});
