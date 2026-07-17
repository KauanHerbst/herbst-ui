import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbOrgChartImports, type HbOrgChartKey, type HbOrgChartNode } from '@herbst/ui';

@Component({
  selector: 'hb-demo-org-chart-checkbox',
  imports: [HbOrgChartImports],
  template: `
    <div class="flex w-full flex-col gap-2">
      <hb-org-chart
        class="w-full"
        [hbNodes]="nodes"
        hbSelectionMode="checkbox"
        hbLayout="horizontal"
        [hbCollapsible]="false"
        [(hbSelection)]="selected"
      />
      <p class="font-mono text-[12px] text-muted-foreground">{{ selected().length }} checked</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoOrgChartCheckboxComponent {
  protected readonly selected = signal<HbOrgChartKey[]>([]);
  protected readonly nodes: HbOrgChartNode[] = [
    {
      key: 'herbst',
      label: 'Herbst',
      children: [
        {
          key: 'trees',
          label: 'Trees',
          children: [
            { key: 'oak', label: 'Oak' },
            { key: 'beech', label: 'Beech' },
          ],
        },
        {
          key: 'shrubs',
          label: 'Shrubs',
          children: [{ key: 'hazel', label: 'Hazel' }],
        },
      ],
    },
  ];
}
