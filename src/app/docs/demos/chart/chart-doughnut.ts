import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbChartImports, type HbChartConfig, type HbChartData } from '@herbst/ui';

@Component({
  selector: 'hb-demo-chart-doughnut',
  imports: [HbChartImports],
  template: `
    <hb-chart
      class="block w-80 max-w-full"
      hbType="doughnut"
      hbHeight="240px"
      [hbData]="data"
      [hbConfig]="config"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoChartDoughnutComponent {
  protected readonly data: HbChartData = {
    labels: ['Oak', 'Beech', 'Maple', 'Birch'],
    datasets: [{ label: 'Leaves', data: [12, 8, 5, 9] }],
  };

  protected readonly config: HbChartConfig = {
    Oak: { color: '#A64B2A' },
    Beech: { color: '#8F3A2E' },
    Maple: { color: '#6B7A55' },
    Birch: { color: '#C79A4E' },
  };
}
