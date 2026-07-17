import { describe, expect, it } from 'vitest';
import { buildItem } from './build-registry';

describe('buildItem', () => {
  it('excludes spec files and builds a component item', () => {
    const files = [
      { file: 'badge.component.ts', content: "import { cn } from '../../utils';" },
      { file: 'badge.component.spec.ts', content: "import { it } from 'vitest';" },
      { file: 'index.ts', content: "export * from './badge.component';" },
    ];
    const item = buildItem('badge', 'registry:component', files);
    expect(item.files.map((f) => f.path)).toEqual(['badge/badge.component.ts', 'badge/index.ts']);
    expect(item.registryDependencies).toContain('utils');
    expect(item.type).toBe('registry:component');
    expect(item.devDependencies).toEqual([]);
  });
});
