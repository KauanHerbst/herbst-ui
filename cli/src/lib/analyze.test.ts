import { describe, expect, it } from 'vitest';
import { analyzeComponent } from './analyze';

describe('analyzeComponent', () => {
  it('rewrites shared and sibling imports and collects deps', () => {
    const content = [
      "import { Component } from '@angular/core';",
      "import { cva } from 'class-variance-authority';",
      "import { phosphorX } from '@ng-icons/phosphor-icons/regular';",
      "import { cn } from '../../utils';",
      "import { HB_BUTTON_GROUP } from '../../core';",
      "import { HbButtonComponent } from '../button';",
      "import { foo } from './button.variants';",
    ].join('\n');

    const result = analyzeComponent('badge', [{ file: 'badge.component.ts', content }]);

    const out = result.files[0].content;
    expect(result.files[0].path).toBe('badge/badge.component.ts');
    expect(out).toContain("from '{{alias}}/utils'");
    expect(out).toContain("from '{{alias}}/core'");
    expect(out).toContain("from '{{alias}}/button'");
    expect(out).toContain("from './button.variants'");
    expect(out).toContain("from '@angular/core'");
    expect(result.dependencies.sort()).toEqual(
      ['@ng-icons/phosphor-icons', 'class-variance-authority'].sort(),
    );
    expect(result.registryDependencies.sort()).toEqual(['button', 'core', 'utils'].sort());
  });

  it('maps sibling subpaths to the barrel and dedupes', () => {
    const content = [
      "import { A } from '../popover/popover.component';",
      "import { B } from '../popover';",
    ].join('\n');
    const result = analyzeComponent('combobox', [{ file: 'combobox.component.ts', content }]);
    expect(result.files[0].content).not.toContain('../popover');
    expect(result.files[0].content.match(/\{\{alias\}\}\/popover/g)?.length).toBe(2);
    expect(result.registryDependencies).toEqual(['popover']);
  });
});
