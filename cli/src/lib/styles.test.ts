import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { ensureImports } from './styles';

const config = {
  componentsDir: 'src/app/shared/ui',
  alias: '@shared/ui',
  stylesPath: 'src/styles.css',
  iconProvider: 'phosphor',
};

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'herbst-'));
  const styles = join(dir, config.stylesPath);
  mkdirSync(dirname(styles), { recursive: true });
  writeFileSync(styles, '');
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe('ensureImports', () => {
  it('adds tailwind and theme imports once (idempotent)', async () => {
    await ensureImports(dir, config);
    await ensureImports(dir, config);
    const css = readFileSync(join(dir, config.stylesPath), 'utf8');
    expect(css.match(/@import 'tailwindcss';/g)?.length).toBe(1);
    expect(css).toContain("@import './app/shared/ui/theme.css';");
  });
});
