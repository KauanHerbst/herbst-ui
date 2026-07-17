import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pickAngularProject } from './angular';

const here = dirname(fileURLToPath(import.meta.url));
const angularJson = JSON.parse(
  readFileSync(join(here, '..', '__fixtures__', 'angular.json'), 'utf8'),
);

describe('pickAngularProject', () => {
  it('picks the single application and its styles path', () => {
    const target = pickAngularProject(angularJson);
    expect(target.project).toBe('demo');
    expect(target.stylesPath).toBe('src/styles.css');
  });

  it('throws when a requested project is missing', () => {
    expect(() => pickAngularProject(angularJson, 'ghost')).toThrow('ghost');
  });
});
