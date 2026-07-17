import type { ChartData } from 'chart.js';

export type HbChartOptions = Record<string, unknown>;
export type HbChartData = ChartData;

export interface HbChartSeriesConfig {
  label?: string;
  color?: string;
  icon?: string;
  theme?: { light: string; dark: string };
}

export type HbChartConfig = Record<string, HbChartSeriesConfig>;

export const HB_CHART_PALETTE: readonly string[] = [
  'var(--color-orange-500)',
  'var(--color-teal-500)',
  'var(--color-amber-500)',
  'var(--color-rose-500)',
  'var(--color-sky-500)',
  'var(--color-violet-500)',
];
