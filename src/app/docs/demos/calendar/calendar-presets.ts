import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbCalendarImports, type HbCalendarPreset, type HbCalendarValue } from '@herbst/ui';

@Component({
  selector: 'hb-demo-calendar-presets',
  imports: [HbCalendarImports],
  template: `
    <hb-calendar
      hbCaption="dropdowns"
      hbShowTime
      [hbPresets]="presets"
      [hbValue]="date()"
      (hbValueChange)="date.set($event)"
      class="w-fit rounded-lg border border-border"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCalendarPresetsComponent {
  protected readonly date = signal<HbCalendarValue>(new Date(2026, 6, 13, 9, 30));

  protected readonly presets: HbCalendarPreset[] = [
    { label: 'Reference day', value: () => new Date(2026, 6, 13) },
    { label: 'First of month', value: new Date(2026, 6, 1) },
  ];
}
