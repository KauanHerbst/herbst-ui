import { describe, expect, it } from 'vitest';
import { parseArgs } from './index';

describe('parseArgs', () => {
  it('parses the add command with names and flags', () => {
    const parsed = parseArgs(['add', 'button', 'select', '--overwrite']);
    expect(parsed.command).toBe('add');
    expect(parsed.names).toEqual(['button', 'select']);
    expect(parsed.flags.overwrite).toBe(true);
  });

  it('parses init with no names', () => {
    const parsed = parseArgs(['init', '--yes']);
    expect(parsed.command).toBe('init');
    expect(parsed.names).toEqual([]);
    expect(parsed.flags.yes).toBe(true);
  });
});
