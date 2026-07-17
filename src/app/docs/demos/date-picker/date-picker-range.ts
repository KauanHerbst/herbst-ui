import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import {
  HbButtonComponent,
  HbCalendarImports,
  HbDatePickerComponent,
  type HbCalendarValue,
} from '@herbst/ui';

@Component({
  selector: 'hb-demo-date-picker-range',
  imports: [HbDatePickerComponent, HbButtonComponent, HbCalendarImports],
  template: `
    <hb-date-picker [hbCloseOnSelect]="true">
      <button hbDatePickerTrigger hb-button hbType="outline">{{ label() }}</button>
      <hb-calendar
        hbMode="range"
        [hbNumberOfMonths]="2"
        [hbMin]="min"
        [hbMax]="max"
        [hbValue]="range()"
        (hbValueChange)="range.set($event)"
      />
    </hb-date-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoDatePickerRangeComponent {
  protected readonly min = new Date(2026, 6, 1);
  protected readonly max = new Date(2026, 7, 31);
  protected readonly range = signal<HbCalendarValue>({
    start: new Date(2026, 6, 8),
    end: new Date(2026, 6, 15),
  });

  protected readonly label = computed(() => {
    const value = this.range();
    if (value && typeof value === 'object' && 'start' in value) {
      const { start, end } = value as { start: Date | null; end: Date | null };
      if (start && end) return start.toDateString() + ' → ' + end.toDateString();
    }
    return 'Pick a range';
  });
}
