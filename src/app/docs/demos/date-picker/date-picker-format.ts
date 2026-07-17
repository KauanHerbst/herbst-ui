import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import {
  HbCalendarImports,
  HbDatePickerComponent,
  HbDatePickerInputDirective,
  HbInputDirective,
  type HbCalendarValue,
} from '@herbst/ui';

@Component({
  selector: 'hb-demo-date-picker-format',
  imports: [HbDatePickerComponent, HbDatePickerInputDirective, HbInputDirective, HbCalendarImports],
  template: `
    <hb-date-picker>
      <input
        hbDatePickerTrigger
        hbDatePickerInput
        hb-input
        class="w-56"
        hbFormat="yyyy-MM-dd"
        [hbParseFormats]="['yyyy-MM-dd', 'MM/dd/yyyy']"
        placeholder="YYYY-MM-DD"
      />
      <hb-calendar [hbValue]="date()" (hbValueChange)="date.set($event)" />
    </hb-date-picker>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoDatePickerFormatComponent {
  protected readonly date = signal<HbCalendarValue>(new Date(2026, 6, 13));
}
