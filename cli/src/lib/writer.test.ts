import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { substituteAlias, writeItems } from './writer';
import type { HerbstConfig, RegistryItem } from '../types';

const config: HerbstConfig = {
  componentsDir: 'src/app/shared/ui',
  alias: '@shared/ui',
  stylesPath: 'src/styles.css',
  iconProvider: 'phosphor',
};

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'herbst-'));
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe('writer', () => {
  it('substitutes the alias token', () => {
    expect(substituteAlias("from '{{alias}}/utils'", '@shared/ui')).toBe("from '@shared/ui/utils'");
  });

  it('writes files under componentsDir and skips existing without overwrite', async () => {
    const item: RegistryItem = {
      name: 'button',
      type: 'component',
      dependencies: [],
      registryDependencies: [],
      files: [{ path: 'button/button.component.ts', content: "x '{{alias}}/utils'" }],
    };
    const first = await writeItems([item], config, dir, { overwrite: false });
    expect(first.written).toEqual(['src/app/shared/ui/button/button.component.ts']);
    const target = join(dir, 'src/app/shared/ui/button/button.component.ts');
    expect(existsSync(target)).toBe(true);
    expect(readFileSync(target, 'utf8')).toContain('@shared/ui/utils');

    const second = await writeItems([item], config, dir, { overwrite: false });
    expect(second.skipped).toEqual(['src/app/shared/ui/button/button.component.ts']);
  });

  it('writes the theme item under componentsDir', async () => {
    const theme: RegistryItem = {
      name: 'theme',
      type: 'lib',
      dependencies: [],
      registryDependencies: [],
      files: [{ path: 'theme.css', content: ':root {}' }],
    };
    const res = await writeItems([theme], config, dir, { overwrite: true });
    expect(res.written).toEqual(['src/app/shared/ui/theme.css']);
  });
});
