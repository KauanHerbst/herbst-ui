import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { HbCalendarImports, type HbCalendarValue } from '@herbst/ui';

@Component({
  selector: 'hb-demo-calendar-single',
  imports: [HbCalendarImports],
  template: `
    <div class="flex flex-col gap-2">
      <hb-calendar
        [hbValue]="date()"
        (hbValueChange)="date.set($event)"
        class="w-fit rounded-lg border border-border"
      />
      <p class="font-mono text-[12px] text-muted-foreground">Selected: {{ label() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCalendarSingleComponent {
  protected readonly date = signal<HbCalendarValue>(new Date(2026, 6, 13));

  protected readonly label = computed(() => {
    const value = this.date();
    return value instanceof Date ? value.toDateString() : '—';
  });
}
