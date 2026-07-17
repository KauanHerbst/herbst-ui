import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbSliderImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-slider-basic',
  imports: [HbSliderImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-3">
      <hb-slider [(hbValue)]="volume" hbTooltip [hbStep]="5" hbAriaLabel="Volume" />
      <p class="font-mono text-[12px] text-muted-foreground">Value: {{ volume() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSliderBasicComponent {
  protected readonly volume = signal<number | number[] | null>(35);
}
