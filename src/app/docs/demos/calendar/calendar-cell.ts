import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbCalendarImports, type HbCalendarValue } from '@herbst/ui';

@Component({
  selector: 'hb-demo-calendar-cell',
  imports: [HbCalendarImports],
  template: `
    <div class="flex flex-col gap-2">
      <hb-calendar
        [hbValue]="date()"
        (hbValueChange)="date.set($event)"
        [hbDefaultDate]="month"
        class="w-fit rounded-lg border border-border"
      >
        <ng-template hbCalendarDay let-day>
          <span class="relative flex size-full items-center justify-center">
            {{ day.getDate() }}
            @if (hasEvent(day)) {
              <span
                class="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary"
              ></span>
            }
          </span>
        </ng-template>
      </hb-calendar>

      <p class="font-mono text-[12px] text-muted-foreground">
        Dots mark days with an autumn walk planned.
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCalendarCellComponent {
  protected readonly month = new Date(2026, 9, 1);
  protected readonly date = signal<HbCalendarValue>(new Date(2026, 9, 12));

  private readonly events = new Set([3, 12, 19, 26]);

  protected hasEvent(day: Date): boolean {
    return day.getMonth() === 9 && this.events.has(day.getDate());
  }
}
