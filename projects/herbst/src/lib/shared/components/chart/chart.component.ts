import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  NgZone,
  numberAttribute,
  signal,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import type { Chart, ChartData, ChartType, TooltipModel } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { cn, type ClassValue } from '../../utils';
import {
  HB_CHART_PALETTE,
  type HbChartConfig,
  type HbChartData,
  type HbChartOptions,
} from './chart.types';

const ARC_TYPES = new Set<ChartType>(['pie', 'doughnut', 'polarArea']);

interface TooltipItem {
  label: string;
  value: string;
  color: string;
}
interface TooltipState {
  x: number;
  y: number;
  title: string;
  items: TooltipItem[];
}
interface LegendItem {
  key: string;
  label: string;
  color: string;
  index: number;
  hidden: boolean;
}

function deepMerge<T>(base: T, extra: Partial<T> | undefined): T {
  if (!extra) return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(extra)) {
    const b = out[k];
    out[k] =
      v && typeof v === 'object' && !Array.isArray(v) && b && typeof b === 'object'
        ? deepMerge(b, v as never)
        : v;
  }
  return out as T;
}

@Component({
  selector: 'hb-chart',
  imports: [BaseChartDirective],
  template: `
    <div class="relative w-full" [style.height]="hbHeight() || null">
      <canvas
        baseChart
        [type]="hbType()"
        [data]="themedData()"
        [options]="$any(themedOptions())"
        [legend]="false"
      ></canvas>

      @if (tooltip(); as t) {
        <div
          class="pointer-events-none absolute z-10 min-w-32 -translate-x-1/2 -translate-y-[calc(100%+0.5rem)] rounded-lg border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md"
          [style.left.px]="t.x"
          [style.top.px]="t.y"
        >
          @if (t.title) {
            <div class="mb-1 font-medium">{{ t.title }}</div>
          }
          @for (it of t.items; track $index) {
            <div class="flex items-center gap-1.5 py-0.5">
              <span class="size-2.5 shrink-0 rounded-[3px]" [style.background]="it.color"></span>
              <span class="text-muted-foreground">{{ it.label }}</span>
              <span class="ml-3 font-medium tabular-nums">{{ it.value }}</span>
            </div>
          }
        </div>
      }
    </div>

    @if (hbLegend()) {
      <div class="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
        @for (l of legendItems(); track l.key) {
          <button
            type="button"
            class="flex items-center gap-1.5 transition-opacity"
            [class.opacity-40]="l.hidden"
            (click)="toggleSeries(l.index)"
          >
            <span class="size-2.5 rounded-[3px]" [style.background]="l.color"></span>
            <span class="text-muted-foreground">{{ l.label }}</span>
          </button>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'hostClasses()', '[attr.data-slot]': "'chart'" },
  exportAs: 'hbChart',
})
export class HbChartComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  readonly hbType = input.required<ChartType>();
  readonly hbData = input.required<HbChartData>();
  readonly hbConfig = input<HbChartConfig>({});
  readonly hbOptions = input<HbChartOptions>({});
  readonly hbLegend = input(true, { transform: booleanAttribute });
  readonly hbTooltip = input(true, { transform: booleanAttribute });
  readonly hbAspectRatio = input(2, { transform: numberAttribute });
  readonly hbHeight = input<string>('');
  readonly class = input<ClassValue>('');

  private readonly chartDir = viewChild(BaseChartDirective);
  protected readonly tooltip = signal<TooltipState | null>(null);
  private readonly themeTick = signal(0);
  private readonly legendTick = signal(0);

  protected readonly hostClasses = computed(() => cn('block w-full', this.class()));
  private readonly isArc = computed(() => ARC_TYPES.has(this.hbType()));

  constructor() {
    afterNextRender(() => {
      const mo = new MutationObserver(() => this.themeTick.update((v) => v + 1));
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
      this.destroyRef.onDestroy(() => mo.disconnect());
    });
  }

  private resolve(raw: string | undefined): string {
    if (!raw) return '';
    const s = raw.trim();
    let name = '';
    if (s.startsWith('var(')) name = s.slice(4, -1).split(',')[0].trim();
    else if (s.startsWith('--')) name = s;
    if (!name) return s;
    if (typeof getComputedStyle === 'undefined') return s;
    const val = getComputedStyle(this.host.nativeElement).getPropertyValue(name).trim();
    return val || s;
  }
  private seriesColor(key: string, index: number): string {
    this.themeTick();
    const cfg = this.hbConfig()[key];
    if (cfg?.theme) {
      const dark = document.documentElement.classList.contains('dark');
      return this.resolve(dark ? cfg.theme.dark : cfg.theme.light);
    }
    if (cfg?.color) return this.resolve(cfg.color);
    return this.resolve(HB_CHART_PALETTE[index % HB_CHART_PALETTE.length]);
  }

  protected readonly themedData = computed<HbChartData>(() => {
    const data = this.hbData();
    const arc = this.isArc();
    const datasets = data.datasets.map((ds, i) => {
      if (arc) {
        const labels = (data.labels ?? []) as string[];
        const colors = labels.map((lbl, li) => this.seriesColor(String(lbl), li));
        return { ...ds, backgroundColor: colors, borderWidth: 0 };
      }
      const color = this.seriesColor(ds.label ?? `series-${i}`, i);
      return { ...ds, backgroundColor: color, borderColor: color, pointBackgroundColor: color };
    });
    return { ...data, datasets };
  });

  protected readonly themedOptions = computed<HbChartOptions>(() => {
    this.themeTick();
    const border = this.resolve('--color-border');
    const muted = this.resolve('--color-muted-foreground');
    const arc = this.isArc();
    const base: HbChartOptions = {
      responsive: true,
      maintainAspectRatio: !this.hbHeight(),
      aspectRatio: this.hbAspectRatio(),
      color: muted,
      plugins: {
        legend: { display: false },
        tooltip: this.hbTooltip()
          ? {
              enabled: false,
              external: (ctx: { chart: Chart; tooltip: TooltipModel<ChartType> }) =>
                this.onTooltip(ctx.chart, ctx.tooltip),
            }
          : { enabled: true },
      },
      scales: arc
        ? {}
        : {
            x: {
              grid: { color: border, drawTicks: false },
              border: { display: false },
              ticks: { color: muted, padding: 8 },
            },
            y: {
              grid: { color: border, drawTicks: false },
              border: { display: false },
              ticks: { color: muted, padding: 8 },
            },
          },
    };
    return deepMerge(base, this.hbOptions());
  });

  private onTooltip(_chart: Chart, model: TooltipModel<ChartType>): void {
    this.zone.run(() => {
      if (!model || model.opacity === 0) {
        this.tooltip.set(null);
        return;
      }
      const items: TooltipItem[] = (model.dataPoints ?? []).map((dp) => {
        const ds = dp.dataset as { backgroundColor?: unknown; borderColor?: unknown };
        const bg = Array.isArray(ds.backgroundColor)
          ? (ds.backgroundColor[dp.dataIndex] as string)
          : (ds.backgroundColor as string);
        return {
          label: (dp.dataset.label as string) || dp.label || '',
          value: dp.formattedValue,
          color: (ds.borderColor as string) || bg || '',
        };
      });
      this.tooltip.set({
        x: model.caretX,
        y: model.caretY,
        title: model.title?.[0] ?? '',
        items,
      });
    });
  }

  protected readonly legendItems = computed<LegendItem[]>(() => {
    this.legendTick();
    const data = this.hbData();
    const config = this.hbConfig();
    const chart = this.chartDir()?.chart;
    if (this.isArc()) {
      const labels = (data.labels ?? []) as string[];
      return labels.map((lbl, i) => ({
        key: String(lbl),
        label: config[String(lbl)]?.label ?? String(lbl),
        color: this.seriesColor(String(lbl), i),
        index: i,
        hidden: chart ? !chart.getDataVisibility(i) : false,
      }));
    }
    return data.datasets.map((ds, i) => {
      const key = ds.label ?? `series-${i}`;
      return {
        key,
        label: config[key]?.label ?? key,
        color: this.seriesColor(key, i),
        index: i,
        hidden: chart ? !chart.isDatasetVisible(i) : false,
      };
    });
  });

  protected toggleSeries(index: number): void {
    const chart = this.chartDir()?.chart;
    if (!chart) return;
    if (this.isArc()) {
      chart.toggleDataVisibility(index);
    } else {
      chart.setDatasetVisibility(index, !chart.isDatasetVisible(index));
    }
    chart.update();
    this.legendTick.update((v) => v + 1);
  }
}
