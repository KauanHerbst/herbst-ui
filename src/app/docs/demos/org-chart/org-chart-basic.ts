import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbOrgChartImports, type HbOrgChartKey, type HbOrgChartNode } from '@herbst/ui';

@Component({
  selector: 'hb-demo-org-chart-basic',
  imports: [HbOrgChartImports],
  template: ` <hb-org-chart class="w-full" [hbNodes]="nodes" [(hbCollapsedKeys)]="collapsed" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoOrgChartBasicComponent {
  protected readonly collapsed = signal<HbOrgChartKey[]>(['field']);
  protected readonly nodes: HbOrgChartNode[] = [
    {
      key: 'director',
      label: 'Director',
      children: [
        {
          key: 'curator',
          label: 'Curator',
          children: [
            { key: 'assistant-a', label: 'Assistant A' },
            { key: 'assistant-b', label: 'Assistant B' },
          ],
        },
        {
          key: 'field',
          label: 'Field lead',
          children: [{ key: 'collector', label: 'Collector' }],
        },
      ],
    },
  ];
}
