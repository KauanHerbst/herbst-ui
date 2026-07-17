import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbChartImports, type HbChartConfig, type HbChartData } from '@herbst/ui';

@Component({
  selector: 'hb-demo-chart-line',
  imports: [HbChartImports],
  template: `
    <hb-chart
      class="block w-[32rem] max-w-full"
      hbType="line"
      hbHeight="240px"
      [hbData]="data"
      [hbConfig]="config"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoChartLineComponent {
  protected readonly data: HbChartData = {
    labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      { label: 'Field', data: [4, 9, 18, 27, 15], tension: 0.4 },
      { label: 'Archive', data: [2, 5, 11, 19, 24], tension: 0.4 },
    ],
  };

  protected readonly config: HbChartConfig = {
    Field: { label: 'Field', color: '#A64B2A' },
    Archive: { label: 'Archive', color: '#C79A4E' },
  };
}
