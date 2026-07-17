import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbOrgChartImports } from './org-chart.imports';
import type { HbOrgChartNode, HbOrgChartSelectionMode } from './org-chart.types';

const ORG: HbOrgChartNode[] = [
  {
    key: 'ceo',
    label: 'CEO',
    children: [
      { key: 'cto', label: 'CTO', children: [{ key: 'fe', label: 'Frontend' }, { key: 'be', label: 'Backend' }] },
      { key: 'cfo', label: 'CFO' },
    ],
  },
];

@Component({
  imports: [HbOrgChartImports],
  template: `
    <hb-org-chart
      [hbNodes]="nodes"
      [hbSelectionMode]="mode()"
      [(hbSelection)]="selection"
      [(hbCollapsedKeys)]="collapsed"
    >
      <ng-template hbOrgChartNode let-node>
        <span data-slot="custom-node">{{ node.label }} #{{ node.key }}</span>
      </ng-template>
    </hb-org-chart>
  `,
})
class Host {
  readonly nodes = ORG;
  readonly mode = signal<HbOrgChartSelectionMode>('single');
  readonly selection = signal<(string | number)[]>([]);
  readonly collapsed = signal<(string | number)[]>([]);
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const nodeByLabel = (label: string) =>
    fixture.debugElement
      .queryAll(By.css('[data-slot="org-chart-node"]'))
      .find((d) => (d.nativeElement as HTMLElement).textContent?.includes(label))
      ?.nativeElement as HTMLElement | undefined;
  return { fixture, host: fixture.componentInstance, nodeByLabel };
}

describe('HbOrgChartComponent', () => {
  it('renders the tree recursively with custom node content', () => {
    const { fixture } = render();
    const boxes = fixture.debugElement.queryAll(By.css('[data-slot="org-chart-node"]'));
    expect(boxes.length).toBe(5);
    expect((boxes[0].nativeElement as HTMLElement).textContent).toContain('CEO #ceo');
  });

  it('selects a single node on click (controlled)', () => {
    const { host, nodeByLabel } = render();
    nodeByLabel('CTO')!.click();
    expect(host.selection()).toEqual(['cto']);
    nodeByLabel('CFO')!.click();
    expect(host.selection()).toEqual(['cfo']);
  });

  it('accumulates in multiple mode', () => {
    const { fixture, host, nodeByLabel } = render();
    fixture.componentInstance.mode.set('multiple');
    fixture.detectChanges();
    nodeByLabel('CTO')!.click();
    nodeByLabel('CFO')!.click();
    expect(host.selection().sort()).toEqual(['cfo', 'cto']);
  });

  it('cascades checkbox selection to descendants and marks ancestors', () => {
    const { fixture, host } = render();
    fixture.componentInstance.mode.set('checkbox');
    fixture.detectChanges();
    const ctoCheckbox = fixture.debugElement
      .queryAll(By.css('[data-slot="org-chart-node"]'))
      .find((d) => (d.nativeElement as HTMLElement).textContent?.includes('CTO'))!
      .query(By.css('input[type="checkbox"]')).nativeElement as HTMLInputElement;
    ctoCheckbox.click();
    fixture.detectChanges();
    expect(host.selection().sort()).toEqual(['be', 'cto', 'fe']);
  });

  it('collapses a node via the toggler (controlled)', () => {
    const { fixture, host } = render();
    const togglers = fixture.debugElement.queryAll(By.css('.hb-org-chart-toggler'));
    expect(togglers.length).toBeGreaterThan(0);
    (togglers[0].nativeElement as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(host.collapsed()).toEqual(['ceo']);
    const boxesAfter = fixture.debugElement.queryAll(By.css('[data-slot="org-chart-node"]'));
    expect(boxesAfter.length).toBe(1);
  });
});
