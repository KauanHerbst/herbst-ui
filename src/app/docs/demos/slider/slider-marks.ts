import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbSliderImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-slider-marks',
  imports: [HbSliderImports],
  template: `
    <div class="flex w-full flex-wrap items-start gap-12">
      <div class="w-full max-w-xs">
        <hb-slider [hbValue]="40" [hbStep]="20" hbSize="lg" [hbMarks]="marks" />
      </div>

      <div class="h-44">
        <hb-slider hbOrientation="vertical" [hbValue]="60" hbTooltip hbInverted />
      </div>

      <div class="w-full max-w-xs">
        <hb-slider [hbValue]="50" hbSize="sm" hbDisabled [hbMarks]="[25, 50, 75]" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSliderMarksComponent {
  protected readonly marks = [
    { value: 0, label: '0' },
    { value: 40, label: 'Low' },
    { value: 80, label: 'High' },
    { value: 100, label: 'Max' },
  ];
}
