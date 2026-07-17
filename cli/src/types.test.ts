import { describe, expect, it } from 'vitest';
import { ALIAS_TOKEN, DEFAULT_REGISTRY } from './types';

describe('types', () => {
  it('exposes the alias placeholder and default registry on main', () => {
    expect(ALIAS_TOKEN).toBe('{{alias}}');
    expect(DEFAULT_REGISTRY).toContain('/herbst-ui/main/registry');
  });
});
