import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { HbTreeImports } from './tree.imports';
import type { HbTreeKey, HbTreeNode, HbTreeSelectionMode } from './tree.types';

const NODES: HbTreeNode[] = [
  {
    key: 'src',
    label: 'src',
    children: [
      {
        key: 'app',
        label: 'app',
        children: [
          { key: 'a.ts', label: 'a.ts', leaf: true },
          { key: 'b.ts', label: 'b.ts', leaf: true },
        ],
      },
      { key: 'main.ts', label: 'main.ts', leaf: true },
    ],
  },
  { key: 'readme', label: 'readme.md', leaf: true },
];

@Component({
  imports: [HbTreeImports],
  template: `
    <hb-tree
      [hbNodes]="nodes"
      [(hbExpanded)]="expanded"
      [(hbSelection)]="selection"
      [(hbChecked)]="checked"
      [hbSelectionMode]="mode()"
      [hbCheckable]="checkable()"
      [hbShowSelectAll]="showSelectAll()"
      [hbFilter]="filter()"
      [hbLazy]="lazy()"
      [hbLoading]="loading()"
      (hbNodeExpand)="expandedNode.set($event.key)"
    />
  `,
})
class Host {
  readonly nodes = NODES;
  readonly expanded = signal<HbTreeKey[]>(['src']);
  readonly selection = signal<HbTreeKey[]>([]);
  readonly checked = signal<HbTreeKey[]>([]);
  readonly mode = signal<HbTreeSelectionMode>('single');
  readonly checkable = signal(false);
  readonly showSelectAll = signal(false);
  readonly filter = signal('');
  readonly lazy = signal(false);
  readonly loading = signal(false);
  readonly expandedNode = signal<HbTreeKey | null>(null);
}

describe('HbTreeComponent', () => {
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const rows = () =>
      Array.from(fixture.nativeElement.querySelectorAll('[role="treeitem"]')) as HTMLElement[];
    const rowFor = (key: string) =>
      fixture.nativeElement.querySelector(`[data-key="${key}"]`) as HTMLElement;
    return { fixture, host: fixture.componentInstance, rows, rowFor };
  }

  it('flattens only the expanded branches', () => {
    const { rows } = render();
    const labels = rows().map((r) => r.textContent?.trim());
    expect(labels).toEqual(['src', 'app', 'main.ts', 'readme.md']);
  });

  it('expands a node on toggle click', () => {
    const { fixture, rows, rowFor } = render();
    const toggle = rowFor('app').querySelector('button') as HTMLButtonElement;
    toggle.click();
    fixture.detectChanges();
    const labels = rows().map((r) => r.textContent?.trim());
    expect(labels).toContain('a.ts');
    expect(labels).toContain('b.ts');
  });

  it('selects a single node on row click', () => {
    const { fixture, host, rowFor } = render();
    rowFor('main.ts').click();
    fixture.detectChanges();
    expect(host.selection()).toEqual(['main.ts']);
    expect(rowFor('main.ts').getAttribute('data-selected')).toBe('true');
  });

  it('accumulates selection in multiple mode', () => {
    const { fixture, host, rowFor } = render();
    host.mode.set('multiple');
    fixture.detectChanges();
    rowFor('main.ts').click();
    rowFor('readme').click();
    fixture.detectChanges();
    expect(host.selection()).toEqual(['main.ts', 'readme']);
  });

  it('cascades checkboxes to descendants and marks the ancestor indeterminate', () => {
    const { fixture, host, rowFor } = render();
    host.checkable.set(true);
    fixture.detectChanges();
    const appCheckbox = rowFor('app').querySelector('input[type="checkbox"]') as HTMLInputElement;
    appCheckbox.click();
    fixture.detectChanges();
    expect(host.checked()).toEqual(expect.arrayContaining(['app', 'a.ts', 'b.ts']));
    expect(host.checked()).not.toContain('src');
    const srcCheckbox = rowFor('src').querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(srcCheckbox.indeterminate).toBe(true);
  });

  it('select-all checks every node', () => {
    const { fixture, host } = render();
    host.checkable.set(true);
    host.showSelectAll.set(true);
    fixture.detectChanges();
    const selectAll = fixture.nativeElement.querySelector(
      'label input[type="checkbox"]',
    ) as HTMLInputElement;
    selectAll.click();
    fixture.detectChanges();
    expect(host.checked()).toEqual(
      expect.arrayContaining(['src', 'app', 'a.ts', 'b.ts', 'main.ts', 'readme']),
    );
  });

  it('filters, keeping ancestors of the match', () => {
    const { fixture, host, rows } = render();
    host.filter.set('a.ts');
    fixture.detectChanges();
    const labels = rows().map((r) => r.textContent?.trim());
    expect(labels).toContain('a.ts');
    expect(labels).toContain('src');
    expect(labels).toContain('app');
    expect(labels).not.toContain('readme.md');
  });

  it('emits (hbNodeExpand) when a node is expanded (lazy)', () => {
    const { fixture, host, rowFor } = render();
    host.lazy.set(true);
    fixture.detectChanges();
    const toggle = rowFor('app').querySelector('button') as HTMLButtonElement;
    toggle.click();
    fixture.detectChanges();
    expect(host.expandedNode()).toBe('app');
  });

  it('shows skeleton rows while loading and no tree items', () => {
    const { fixture, host, rows } = render();
    host.loading.set(true);
    fixture.detectChanges();
    expect(rows().length).toBe(0);
    expect(
      fixture.nativeElement.querySelectorAll('[data-slot="skeleton"]').length,
    ).toBeGreaterThan(0);
  });

  it('navigates rows with ArrowDown', () => {
    const { fixture, rows } = render();
    const first = rows()[0];
    first.focus();
    first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(rows()[1]);
  });
});
