import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { HbSliderImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-slider-range',
  imports: [HbSliderImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-3">
      <hb-slider
        [(hbValue)]="price"
        hbTooltip
        [hbMin]="0"
        [hbMax]="1000"
        [hbStep]="10"
        [hbMinStepsBetweenThumbs]="5"
        [hbFormat]="formatPrice"
      />
      <p class="font-mono text-[12px] text-muted-foreground">{{ label() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSliderRangeComponent {
  protected readonly price = signal<number | number[] | null>([200, 700]);
  protected readonly formatPrice = (value: number): string => '$' + value;
  protected readonly label = computed(() => {
    const v = this.price();
    return Array.isArray(v) ? this.formatPrice(v[0]) + ' – ' + this.formatPrice(v[1]) : '';
  });
}
