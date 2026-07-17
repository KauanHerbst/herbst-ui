import { describe, expect, it } from 'vitest';
import { resolveGraph } from './resolve';
import type { RegistryIndexEntry } from '../types';

const index: RegistryIndexEntry[] = [
  { name: 'utils', type: 'lib', dependencies: [], registryDependencies: [] },
  { name: 'core', type: 'lib', dependencies: [], registryDependencies: [] },
  { name: 'button', type: 'component', dependencies: [], registryDependencies: ['utils', 'core'] },
  { name: 'select', type: 'component', dependencies: [], registryDependencies: ['button', 'utils'] },
];

describe('resolveGraph', () => {
  it('returns deps before dependents, deduped', () => {
    const out = resolveGraph(['select'], index);
    expect(out.indexOf('utils')).toBeLessThan(out.indexOf('button'));
    expect(out.indexOf('button')).toBeLessThan(out.indexOf('select'));
    expect(new Set(out).size).toBe(out.length);
  });

  it('throws on unknown component', () => {
    expect(() => resolveGraph(['ghost'], index)).toThrow('ghost');
  });
});
