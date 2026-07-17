import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import {
  HbButtonComponent,
  HbCalendarImports,
  HbDatePickerComponent,
  type HbCalendarValue,
} from '@herbst/ui';

@Component({
  selector: 'hb-demo-date-picker-button',
  imports: [HbDatePickerComponent, HbButtonComponent, HbCalendarImports],
  template: `
    <hb-date-picker>
      <button hbDatePickerTrigger hb-button hbType="outline">{{ label() }}</button>
      <hb-calendar [hbValue]="date()" (hbValueChange)="date.set($event)" />
    </hb-date-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoDatePickerButtonComponent {
  protected readonly date = signal<HbCalendarValue>(null);

  protected readonly label = computed(() => {
    const value = this.date();
    return value instanceof Date ? value.toDateString() : 'Pick a date';
  });
}
