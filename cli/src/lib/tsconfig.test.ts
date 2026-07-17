import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { stripJsonComments, patchTsconfigPaths } from './tsconfig';

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'herbst-'));
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe('tsconfig', () => {
  it('strips line and block comments', () => {
    expect(stripJsonComments('{\n  "a": 1 /* x */ \n}')).not.toContain('/*');
  });

  it('adds the alias path preserving existing paths', async () => {
    writeFileSync(
      join(dir, 'tsconfig.json'),
      '{\n  /* c */\n  "compilerOptions": { "paths": { "@herbst/ui": ["x"] } }\n}',
    );
    await patchTsconfigPaths(dir, '@shared/ui', 'src/app/shared/ui');
    const parsed = JSON.parse(readFileSync(join(dir, 'tsconfig.json'), 'utf8'));
    expect(parsed.compilerOptions.paths['@shared/ui/*']).toEqual(['src/app/shared/ui/*']);
    expect(parsed.compilerOptions.paths['@herbst/ui']).toEqual(['x']);
  });
});
