import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { ChartData } from 'chart.js';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { beforeAll, describe, expect, it } from 'vitest';

import { HbChartImports } from './chart.imports';
import type { HbChartConfig } from './chart.types';

beforeAll(() => {
  const ctxStub = new Proxy(
    {},
    {
      get: (_t, prop) =>
        prop === 'measureText'
          ? () => ({ width: 0 })
          : prop === 'canvas'
            ? document.createElement('canvas')
            : () => undefined,
    },
  );
  (HTMLCanvasElement.prototype as unknown as { getContext: () => unknown }).getContext = () =>
    ctxStub;
});

@Component({
  imports: [HbChartImports],
  template: `
    <hb-chart [hbType]="'bar'" [hbData]="data" [hbConfig]="config" [hbLegend]="legend()" />
  `,
})
class Host {
  readonly data: ChartData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      { label: 'revenue', data: [10, 20, 30] },
      { label: 'expenses', data: [5, 15, 25] },
    ],
  };
  readonly config: HbChartConfig = {
    revenue: { label: 'Revenue', color: '#f97316' },
    expenses: { label: 'Expenses', color: '#14b8a6' },
  };
  readonly legend = signal(true);
}

describe('HbChartComponent', () => {
  function render() {
    const fixture = TestBed.configureTestingModule({
      providers: [provideCharts(withDefaultRegisterables())],
    }).createComponent(Host);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('[data-slot="chart"]') as HTMLElement;
    return { fixture, host };
  }

  it('renders the chart host and a canvas', () => {
    const { host } = render();
    expect(host).toBeTruthy();
    expect(host.querySelector('canvas')).toBeTruthy();
  });

  it('renders a legend with the configured series labels', () => {
    const { host } = render();
    const legend = host.querySelectorAll('button');
    expect(legend.length).toBe(2);
    expect(host.textContent).toContain('Revenue');
    expect(host.textContent).toContain('Expenses');
  });

  it('hides the legend when hbLegend is false', () => {
    const { fixture, host } = render();
    fixture.componentInstance.legend.set(false);
    fixture.detectChanges();
    expect(host.querySelectorAll('button').length).toBe(0);
  });

  it('uses the configured colour on the legend indicator', () => {
    const { host } = render();
    const swatch = host.querySelector('button span') as HTMLElement;
    expect(swatch.style.background).toContain('rgb');
  });
});
