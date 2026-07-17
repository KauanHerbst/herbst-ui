import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import {
  HbCalendarImports,
  HbDatePickerComponent,
  HbDatePickerInputDirective,
  HbInputDirective,
  type HbCalendarValue,
} from '@herbst/ui';

@Component({
  selector: 'hb-demo-date-picker-input',
  imports: [HbDatePickerComponent, HbDatePickerInputDirective, HbInputDirective, HbCalendarImports],
  template: `
    <hb-date-picker>
      <input
        hbDatePickerTrigger
        hbDatePickerInput
        hb-input
        class="w-56"
        placeholder="Pick a date"
      />
      <hb-calendar [hbValue]="date()" (hbValueChange)="date.set($event)" />
    </hb-date-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoDatePickerInputComponent {
  protected readonly date = signal<HbCalendarValue>(new Date(2026, 6, 13));
}
