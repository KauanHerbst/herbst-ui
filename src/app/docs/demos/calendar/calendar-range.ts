import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbCalendarImports, type HbCalendarValue } from '@herbst/ui';

@Component({
  selector: 'hb-demo-calendar-range',
  imports: [HbCalendarImports],
  template: `
    <hb-calendar
      hbMode="range"
      [hbNumberOfMonths]="2"
      [hbValue]="range()"
      (hbValueChange)="range.set($event)"
      class="w-fit rounded-lg border border-border"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCalendarRangeComponent {
  protected readonly range = signal<HbCalendarValue>({
    start: new Date(2026, 6, 8),
    end: new Date(2026, 6, 15),
  });
}
