import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbOrgChartImports, type HbOrgChartKey, type HbOrgChartNode } from '@herbst/ui';

@Component({
  selector: 'hb-demo-org-chart-selection',
  imports: [HbOrgChartImports],
  template: `
    <div class="flex w-full flex-col gap-2">
      <hb-org-chart
        class="w-full"
        [hbNodes]="nodes"
        hbSelectionMode="single"
        [(hbSelection)]="selected"
        (hbNodeSelect)="last.set('selected ' + $event.label)"
        (hbNodeUnselect)="last.set('unselected ' + $event.label)"
      >
        <ng-template hbOrgChartNode let-node>
          <div class="flex flex-col items-center gap-0.5 px-1">
            <span class="text-sm font-medium">{{ node.label }}</span>
            <span class="text-[11px] text-muted-foreground">{{ $any(node.data).role }}</span>
          </div>
        </ng-template>
      </hb-org-chart>

      <p class="font-mono text-[12px] text-muted-foreground">
        {{ last() }} · keys: [{{ selected().join(', ') }}]
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoOrgChartSelectionComponent {
  protected readonly selected = signal<HbOrgChartKey[]>([]);
  protected readonly last = signal('Click a node');
  protected readonly nodes: HbOrgChartNode[] = [
    {
      key: 'director',
      label: 'A. Herbst',
      data: { role: 'Director' },
      children: [
        {
          key: 'curator',
          label: 'M. Vogel',
          data: { role: 'Curator' },
          children: [
            { key: 'a', label: 'L. Braun', data: { role: 'Assistant' } },
            { key: 'b', label: 'R. Klein', data: { role: 'Assistant' }, selectable: false },
          ],
        },
        { key: 'field', label: 'S. Adler', data: { role: 'Field lead' } },
      ],
    },
  ];
}
