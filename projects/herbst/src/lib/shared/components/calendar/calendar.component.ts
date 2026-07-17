import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  ElementRef,
  inject,
  Injector,
  input,
  linkedSignal,
  model,
  numberAttribute,
  signal,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  addDays,
  addMonths,
  endOfWeek,
  format,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  setMonth,
  setYear,
  startOfMonth,
  startOfWeek,
  type Locale,
} from 'date-fns';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCaretLeft,
  phosphorCaretRight,
  phosphorClock,
} from '@ng-icons/phosphor-icons/regular';

import { HbButtonComponent } from '../button';
import { cn, type ClassValue } from '../../utils';
import {
  buildMonthMatrix,
  isDateDisabled,
  todayInZone,
  type HbCalendarDateRange,
  type HbCalendarDisabledDates,
  type HbCalendarPreset,
  type HbCalendarValue,
  type HbCalendarWeekStart,
} from './calendar.utils';
import {
  calendarDayVariants,
  calendarSelectVariants,
  calendarVariants,
  calendarWeekdayVariants,
  type HbCalendarMode,
} from './calendar.variants';



let calendarUid = 0;
@Directive({ selector: '[hbCalendarDay]' })
export class HbCalendarDayDirective {}

@Component({
  selector: 'hb-calendar',
  imports: [NgIcon, NgTemplateOutlet, HbButtonComponent],
  template: `
    @if (hbPresets().length) {
      <div class="flex flex-col gap-1 border-r border-border pr-2">
        @for (preset of hbPresets(); track preset.label) {
          <button
            type="button"
            hb-button
            hbType="ghost"
            hbSize="sm"
            class="justify-start font-normal"
            (click)="applyPreset(preset)"
          >
            {{ preset.label }}
          </button>
        }
      </div>
    }

    <div class="flex flex-col gap-4">
      <div class="flex gap-4">
        @for (
          month of months();
          track month.key;
          let first = $first, last = $last, i = $index
        ) {
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              @if (first) {
                <button
                  type="button"
                  hb-button
                  hbType="ghost"
                  hbSize="icon"
                  class="size-7"
                  aria-label="Previous month"
                  [disabled]="hbDisabled()"
                  (click)="prevMonth()"
                >
                  <ng-icon name="phosphorCaretLeft" />
                </button>
              } @else {
                <span class="size-7"></span>
              }
              @if (hbCaption() === 'dropdowns') {
                <div class="flex items-center gap-1">
                  <select
                    [class]="selectClasses"
                    [value]="monthValue(month.date)"
                    aria-label="Month"
                    [disabled]="hbDisabled()"
                    (change)="onMonthSelect($event, i)"
                  >
                    @for (m of monthOptions(); track m.value) {
                      <option [value]="m.value">{{ m.label }}</option>
                    }
                  </select>
                  <select
                    [class]="selectClasses"
                    [value]="yearValue(month.date)"
                    aria-label="Year"
                    [disabled]="hbDisabled()"
                    (change)="onYearSelect($event, i)"
                  >
                    @for (y of yearOptions(); track y) {
                      <option [value]="y">{{ y }}</option>
                    }
                  </select>
                </div>
              } @else {
                <div class="text-sm font-medium" aria-live="polite">{{ month.label }}</div>
              }
              @if (last) {
                <button
                  type="button"
                  hb-button
                  hbType="ghost"
                  hbSize="icon"
                  class="size-7"
                  aria-label="Next month"
                  [disabled]="hbDisabled()"
                  (click)="nextMonth()"
                >
                  <ng-icon name="phosphorCaretRight" />
                </button>
              } @else {
                <span class="size-7"></span>
              }
            </div>

            <table class="border-collapse" role="grid" (keydown)="onKeydown($event)">
              <thead>
                <tr class="flex">
                  @for (wd of weekdays(); track wd.long) {
                    <th [class]="weekdayClasses" scope="col" [attr.aria-label]="wd.long">{{ wd.short }}</th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (week of month.weeks; track week[0].getTime()) {
                  <tr class="flex">
                    @for (day of week; track day.getTime()) {
                      <td class="p-0" role="gridcell" [attr.aria-selected]="isSelected(day)">
                        <button
                          type="button"
                          [class]="dayClasses(day, month.date)"
                          [attr.data-day]="day.getTime()"
                          [attr.aria-label]="dayLabel(day)"
                          [attr.aria-disabled]="isDayDisabled(day) || null"
                          [attr.aria-current]="isToday(day) ? 'date' : null"
                          [tabindex]="isFocused(day) ? 0 : -1"
                          (click)="selectDay(day)"
                        >
                          @if (dayTemplate(); as tpl) {
                            <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="dayContext(day, month.date)" />
                          } @else {
                            {{ day.getDate() }}
                          }
                        </button>
                      </td>
                    }
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>

      @if (hbShowTime()) {
        <div class="flex items-center gap-3 border-t border-border pt-3">
          <label [for]="timeId" class="text-sm font-medium">Time</label>
          <div class="relative grow">
            <input
              [id]="timeId"
              type="time"
              step="1"
              aria-label="Time"
              [class]="timeInputClasses"
              [value]="timeString()"
              [disabled]="hbDisabled()"
              (input)="onTimeInput($event)"
            />
            <ng-icon
              name="phosphorClock"
              class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [provideIcons({ phosphorCaretLeft, phosphorCaretRight, phosphorClock })],
  host: {
    '[class]': 'classes()',
    role: 'application',
    '[attr.aria-disabled]': 'hbDisabled() ? "" : null',
    '[attr.data-slot]': "'calendar'",
  },
  exportAs: 'hbCalendar',
})
export class HbCalendarComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly injector = inject(Injector);

  readonly hbValue = model<HbCalendarValue>(null);
  readonly hbMode = input<HbCalendarMode>('single');
  readonly hbDefaultDate = input<Date | null>(null);
  readonly hbMin = input<Date | null>(null);
  readonly hbMax = input<Date | null>(null);
  readonly hbDisabledDates = input<HbCalendarDisabledDates>([]);
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbTimezone = input<string | null>(null);
  readonly hbWeekStartsOn = input<HbCalendarWeekStart>(0);
  readonly hbLocale = input<Locale | null>(null);
  readonly hbCaption = input<'label' | 'dropdowns'>('label');
  readonly hbPresets = input<HbCalendarPreset[]>([]);
  readonly hbNumberOfMonths = input(1, { transform: numberAttribute });
  readonly hbShowTime = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  protected readonly today = computed(() => todayInZone(this.hbTimezone()));
  private readonly localeOpts = computed(() => {
    const locale = this.hbLocale();
    return locale ? { locale } : undefined;
  });

  private readonly anchorDate = computed<Date | null>(() => {
    const value = this.hbValue();
    if (value instanceof Date) return value;
    if (Array.isArray(value)) return value[0] ?? null;
    if (value && (value.start || value.end)) return value.start ?? value.end;
    return null;
  });

  protected readonly viewDate = linkedSignal(() =>
    startOfMonth(this.anchorDate() ?? this.hbDefaultDate() ?? this.today()),
  );

  protected readonly focusedDate = signal<Date>(this.hbDefaultDate() ?? new Date());

  protected readonly dayTemplate = contentChild(HbCalendarDayDirective, { read: TemplateRef });

  protected readonly timeState = linkedSignal<{ h: number; m: number; s: number }>(() => {
    const value = this.hbValue();
    return value instanceof Date
      ? { h: value.getHours(), m: value.getMinutes(), s: value.getSeconds() }
      : { h: 0, m: 0, s: 0 };
  });

  protected readonly timeString = computed(() => {
    const t = this.timeState();
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(t.h)}:${pad(t.m)}:${pad(t.s)}`;
  });
  protected readonly timeId = `hb-calendar-time-${++calendarUid}`;

  private readonly rangeValue = computed<HbCalendarDateRange>(() => {
    const value = this.hbValue();
    if (value && !(value instanceof Date) && !Array.isArray(value)) return value;
    return { start: null, end: null };
  });
  private readonly multipleValue = computed<Date[]>(() => {
    const value = this.hbValue();
    return Array.isArray(value) ? value : [];
  });

  protected readonly effectiveMonths = computed(() => Math.max(1, this.hbNumberOfMonths()));
  protected readonly months = computed(() => {
    const base = startOfMonth(this.viewDate());
    const weekStart = this.hbWeekStartsOn();
    return Array.from({ length: this.effectiveMonths() }, (_, i) => {
      const date = addMonths(base, i);
      return {
        key: date.getTime(),
        date,
        weeks: buildMonthMatrix(date, weekStart),
        label: format(date, 'MMMM yyyy', this.localeOpts()),
      };
    });
  });
  protected readonly weekdays = computed(() =>
    this.months()[0].weeks[0].map((d) => ({
      short: format(d, 'EEEEEE', this.localeOpts()),
      long: format(d, 'EEEE', this.localeOpts()),
    })),
  );

  protected readonly classes = computed(() =>
    cn(
      calendarVariants(),
      this.hbDisabled() ? 'pointer-events-none opacity-60' : '',
      this.class(),
    ),
  );
  protected readonly weekdayClasses = calendarWeekdayVariants();
  protected readonly selectClasses = calendarSelectVariants();
  protected readonly timeInputClasses = cn(
    'h-9 w-full rounded-md border border-input bg-background px-3 py-1 pr-9 text-sm tabular-nums shadow-xs',
    'outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50',
    'appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none',
  );

  protected readonly monthOptions = computed(() =>
    Array.from({ length: 12 }, (_, i) => ({
      value: String(i),
      label: format(new Date(2000, i, 1), 'MMMM', this.localeOpts()),
    })),
  );
  protected monthValue(date: Date): string {
    return String(getMonth(date));
  }
  protected yearValue(date: Date): number {
    return getYear(date);
  }
  protected readonly yearOptions = computed(() => {
    const current = this.today().getFullYear();
    const min = this.hbMin()?.getFullYear() ?? current - 100;
    const max = this.hbMax()?.getFullYear() ?? current + 10;
    const years: number[] = [];
    for (let year = min; year <= max; year++) years.push(year);
    return years;
  });

  constructor() {
    afterNextRender(
      () => this.focusedDate.set(this.anchorDate() ?? startOfMonth(this.viewDate())),
      { injector: this.injector },
    );
  }

  protected isToday(day: Date): boolean {
    return isSameDay(day, this.today());
  }
  protected isFocused(day: Date): boolean {
    return isSameDay(day, this.focusedDate());
  }
  protected isSelected(day: Date): boolean {
    const mode = this.hbMode();
    if (mode === 'multiple') return this.multipleValue().some((d) => isSameDay(d, day));
    if (mode === 'range') {
      const range = this.rangeValue();
      return (
        (!!range.start && isSameDay(day, range.start)) || (!!range.end && isSameDay(day, range.end))
      );
    }
    const value = this.hbValue();
    return value instanceof Date && isSameDay(day, value);
  }
  protected isInRange(day: Date): boolean {
    if (this.hbMode() !== 'range') return false;
    const range = this.rangeValue();
    return !!range.start && !!range.end && isAfter(day, range.start) && isBefore(day, range.end);
  }
  protected isOutside(day: Date, monthDate: Date): boolean {
    return !isSameMonth(day, monthDate);
  }
  protected isDayDisabled(day: Date): boolean {
    return (
      this.hbDisabled() || isDateDisabled(day, this.hbMin(), this.hbMax(), this.hbDisabledDates())
    );
  }

  protected dayClasses(day: Date, monthDate: Date): string {
    const selected = this.isSelected(day);
    return calendarDayVariants({
      selected,
      inRange: this.isInRange(day),
      today: this.isToday(day) && !selected,
      outside: this.isOutside(day, monthDate),
    });
  }
  protected dayLabel(day: Date): string {
    return format(day, 'PPPP', this.localeOpts());
  }

  protected selectDay(day: Date): void {
    if (this.isDayDisabled(day)) return;
    const mode = this.hbMode();
    if (mode === 'multiple') {
      const current = this.multipleValue();
      const exists = current.some((d) => isSameDay(d, day));
      this.hbValue.set(exists ? current.filter((d) => !isSameDay(d, day)) : [...current, day]);
    } else if (mode === 'range') {
      const range = this.rangeValue();
      if (!range.start || range.end) {
        this.hbValue.set({ start: day, end: null });
      } else if (isBefore(day, range.start)) {
        this.hbValue.set({ start: day, end: range.start });
      } else {
        this.hbValue.set({ start: range.start, end: day });
      }
    } else {
      this.hbValue.set(this.hbShowTime() ? this.withTime(day) : day);
    }
    this.focusedDate.set(day);
  }

  protected prevMonth(): void {
    this.viewDate.update((d) => addMonths(d, -1));
  }
  protected nextMonth(): void {
    this.viewDate.update((d) => addMonths(d, 1));
  }

  protected onMonthSelect(event: Event, index: number): void {
    const panel = this.months()[index].date;
    const month = Number((event.target as HTMLSelectElement).value);
    this.viewDate.set(startOfMonth(addMonths(setMonth(panel, month), -index)));
  }
  protected onYearSelect(event: Event, index: number): void {
    const panel = this.months()[index].date;
    const year = Number((event.target as HTMLSelectElement).value);
    this.viewDate.set(startOfMonth(addMonths(setYear(panel, year), -index)));
  }
  protected applyPreset(preset: HbCalendarPreset): void {
    const value = typeof preset.value === 'function' ? preset.value() : preset.value;
    this.hbValue.set(value);
  }

  protected dayContext(day: Date, monthDate: Date): Record<string, unknown> {
    return {
      $implicit: day,
      date: day,
      selected: this.isSelected(day),
      today: this.isToday(day),
      disabled: this.isDayDisabled(day),
      outside: this.isOutside(day, monthDate),
      inRange: this.isInRange(day),
    };
  }

  protected onTimeInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    if (!raw) return;
    const [h = 0, m = 0, s = 0] = raw.split(':').map((n) => Number(n) || 0);
    this.timeState.set({ h, m, s });
    const value = this.hbValue();
    if (value instanceof Date) this.hbValue.set(this.withTime(value));
  }

  private withTime(day: Date): Date {
    const t = this.timeState();
    return new Date(day.getFullYear(), day.getMonth(), day.getDate(), t.h, t.m, t.s);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const current = this.focusedDate();
    let next: Date | null = null;

    switch (event.key) {
      case 'ArrowLeft':
        next = addDays(current, -1);
        break;
      case 'ArrowRight':
        next = addDays(current, 1);
        break;
      case 'ArrowUp':
        next = addDays(current, -7);
        break;
      case 'ArrowDown':
        next = addDays(current, 7);
        break;
      case 'Home':
        next = startOfWeek(current, { weekStartsOn: this.hbWeekStartsOn() });
        break;
      case 'End':
        next = endOfWeek(current, { weekStartsOn: this.hbWeekStartsOn() });
        break;
      case 'PageUp':
        next = addMonths(current, -1);
        break;
      case 'PageDown':
        next = addMonths(current, 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectDay(current);
        return;
      default:
        return;
    }

    event.preventDefault();
    this.focusedDate.set(next);
    const base = startOfMonth(this.viewDate());
    const lastVisible = startOfMonth(addMonths(base, this.effectiveMonths() - 1));
    const nextMonth = startOfMonth(next);
    if (isBefore(nextMonth, base)) {
      this.viewDate.set(nextMonth);
    } else if (isAfter(nextMonth, lastVisible)) {
      this.viewDate.set(startOfMonth(addMonths(nextMonth, -(this.effectiveMonths() - 1))));
    }
    this.focusDay(next);
  }

  private focusDay(day: Date): void {
    afterNextRender(
      () => {
        const el = this.host.nativeElement.querySelector(
          `[data-day="${day.getTime()}"]`,
        ) as HTMLElement | null;
        el?.focus();
      },
      { injector: this.injector },
    );
  }
}
