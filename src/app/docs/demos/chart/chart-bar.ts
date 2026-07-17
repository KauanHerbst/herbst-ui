import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbChartImports, type HbChartConfig, type HbChartData } from '@herbst/ui';

@Component({
  selector: 'hb-demo-chart-bar',
  imports: [HbChartImports],
  template: `
    <hb-chart
      class="block w-[32rem] max-w-full"
      hbType="bar"
      hbHeight="240px"
      [hbData]="data"
      [hbConfig]="config"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoChartBarComponent {
  protected readonly data: HbChartData = {
    labels: ['Oak', 'Beech', 'Maple', 'Birch'],
    datasets: [
      { label: 'October', data: [12, 8, 5, 9] },
      { label: 'November', data: [7, 6, 4, 8] },
    ],
  };

  protected readonly config: HbChartConfig = {
    October: { label: 'October', color: '#A64B2A' },
    November: { label: 'November', color: '#6B7A55' },
  };
}
