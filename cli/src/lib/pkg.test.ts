import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { detectPackageManager, installArgs } from './pkg';

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'herbst-'));
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe('pkg', () => {
  it('detects pnpm from lockfile, defaults to npm', () => {
    expect(detectPackageManager(dir)).toBe('npm');
    writeFileSync(join(dir, 'pnpm-lock.yaml'), '');
    expect(detectPackageManager(dir)).toBe('pnpm');
  });

  it('builds install args per manager', () => {
    expect(installArgs('npm', ['clsx'])).toEqual(['install', 'clsx']);
    expect(installArgs('yarn', ['clsx'])).toEqual(['add', 'clsx']);
    expect(installArgs('pnpm', ['clsx'])).toEqual(['add', 'clsx']);
    expect(installArgs('bun', ['clsx'])).toEqual(['add', 'clsx']);
  });
});
