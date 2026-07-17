import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbCalendarImports, type HbCalendarValue } from '@herbst/ui';

@Component({
  selector: 'hb-demo-calendar-constraints',
  imports: [HbCalendarImports],
  template: `
    <hb-calendar
      hbMode="multiple"
      [hbDefaultDate]="month"
      [hbMin]="min"
      [hbMax]="max"
      [hbDisabledDates]="disableWeekends"
      [hbWeekStartsOn]="1"
      [hbValue]="picks()"
      (hbValueChange)="picks.set($event)"
      class="w-fit rounded-lg border border-border"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCalendarConstraintsComponent {
  protected readonly month = new Date(2026, 6, 1);
  protected readonly min = new Date(2026, 6, 6);
  protected readonly max = new Date(2026, 6, 24);
  protected readonly picks = signal<HbCalendarValue>([new Date(2026, 6, 7), new Date(2026, 6, 9)]);

  protected readonly disableWeekends = (date: Date): boolean =>
    date.getDay() === 0 || date.getDay() === 6;
}
