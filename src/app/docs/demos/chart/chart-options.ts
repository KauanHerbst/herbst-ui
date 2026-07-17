import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  HbChartImports,
  type HbChartConfig,
  type HbChartData,
  type HbChartOptions,
} from '@herbst/ui';

@Component({
  selector: 'hb-demo-chart-options',
  imports: [HbChartImports],
  template: `
    <hb-chart
      class="block w-[32rem] max-w-full"
      hbType="bar"
      hbHeight="220px"
      [hbLegend]="false"
      [hbTooltip]="false"
      [hbData]="data"
      [hbConfig]="config"
      [hbOptions]="options"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoChartOptionsComponent {
  protected readonly data: HbChartData = {
    labels: ['Oak', 'Beech', 'Maple', 'Birch'],
    datasets: [
      { label: 'October', data: [12, 8, 5, 9] },
      { label: 'November', data: [7, 6, 4, 8] },
    ],
  };

  protected readonly config: HbChartConfig = {
    October: { color: '#A64B2A' },
    November: { color: '#6B7A55' },
  };

  protected readonly options: HbChartOptions = {
    scales: { x: { stacked: true }, y: { stacked: true } },
  };
}
