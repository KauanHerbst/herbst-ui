import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { ptBR } from 'date-fns/locale';

import { HbCalendarComponent } from './calendar.component';
import { HbCalendarImports } from './calendar.imports';
import type { HbCalendarDateRange, HbCalendarPreset, HbCalendarValue } from './calendar.utils';

@Component({
  imports: [HbCalendarComponent],
  template: `
    <hb-calendar
      [hbDefaultDate]="defaultDate"
      [(hbValue)]="value"
      [hbMode]="mode()"
      [hbCaption]="caption()"
      [hbPresets]="presets()"
      [hbShowTime]="showTime()"
      [hbNumberOfMonths]="numberOfMonths()"
      [hbLocale]="locale()"
      [hbMin]="min()"
      [hbDisabledDates]="disabledDates()"
    />
  `,
})
class Host {
  readonly defaultDate = new Date(2026, 0, 15);
  readonly value = signal<HbCalendarValue>(null);
  readonly mode = signal<'single' | 'range' | 'multiple'>('single');
  readonly caption = signal<'label' | 'dropdowns'>('label');
  readonly presets = signal<HbCalendarPreset[]>([]);
  readonly showTime = signal(false);
  readonly numberOfMonths = signal(1);
  readonly locale = signal<import('date-fns').Locale | null>(null);
  readonly min = signal<Date | null>(null);
  readonly disabledDates = signal<Date[]>([]);
}

@Component({
  imports: [HbCalendarImports],
  template: `
    <hb-calendar [hbDefaultDate]="defaultDate">
      <ng-template hbCalendarDay let-day>D{{ day.getDate() }}</ng-template>
    </hb-calendar>
  `,
})
class CustomHost {
  readonly defaultDate = new Date(2026, 0, 15);
}

const dayButton = (el: HTMLElement, date: Date) =>
  el.querySelector(`[data-day="${date.getTime()}"]`) as HTMLButtonElement | null;

describe('HbCalendar', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host, CustomHost] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const cal = () => fixture.nativeElement.querySelector('hb-calendar') as HTMLElement;
    return { fixture, cal };
  }

  it('renders the default month', () => {
    const { cal } = render();
    expect(cal().textContent).toContain('January 2026');
    expect(cal().querySelectorAll('thead th').length).toBe(7);
  });

  it('selects a day on click', () => {
    const { fixture, cal } = render();
    dayButton(cal(), new Date(2026, 0, 10))!.click();
    fixture.detectChanges();
    expect((fixture.componentInstance.value() as Date).getDate()).toBe(10);
  });

  it('navigates to the previous month', () => {
    const { fixture, cal } = render();
    (cal().querySelector('button[aria-label="Previous month"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(cal().textContent).toContain('December 2025');
  });

  it('disables days before hbMin', () => {
    const { fixture, cal } = render();
    fixture.componentInstance.min.set(new Date(2026, 0, 20));
    fixture.detectChanges();
    expect(dayButton(cal(), new Date(2026, 0, 10))!.getAttribute('aria-disabled')).toBe('true');
    expect(dayButton(cal(), new Date(2026, 0, 25))!.getAttribute('aria-disabled')).toBeNull();
  });

  it('selects a range and highlights the days in between', () => {
    const { fixture, cal } = render();
    fixture.componentInstance.mode.set('range');
    fixture.detectChanges();
    dayButton(cal(), new Date(2026, 0, 10))!.click();
    fixture.detectChanges();
    dayButton(cal(), new Date(2026, 0, 15))!.click();
    fixture.detectChanges();
    const range = fixture.componentInstance.value() as HbCalendarDateRange;
    expect(range.start?.getDate()).toBe(10);
    expect(range.end?.getDate()).toBe(15);
    expect(dayButton(cal(), new Date(2026, 0, 12))!.className).toContain('bg-accent');
  });

  it('toggles multiple dates', () => {
    const { fixture, cal } = render();
    fixture.componentInstance.mode.set('multiple');
    fixture.detectChanges();
    dayButton(cal(), new Date(2026, 0, 10))!.click();
    dayButton(cal(), new Date(2026, 0, 12))!.click();
    fixture.detectChanges();
    expect((fixture.componentInstance.value() as Date[]).length).toBe(2);
    dayButton(cal(), new Date(2026, 0, 10))!.click();
    fixture.detectChanges();
    expect((fixture.componentInstance.value() as Date[]).length).toBe(1);
  });

  it('renders month/year dropdowns in the dropdowns caption', () => {
    const { fixture, cal } = render();
    fixture.componentInstance.caption.set('dropdowns');
    fixture.detectChanges();
    expect(cal().querySelectorAll('select').length).toBe(2);
  });

  it('applies a preset value on click', () => {
    const { fixture, cal } = render();
    fixture.componentInstance.presets.set([{ label: 'Jump', value: new Date(2026, 5, 1) }]);
    fixture.detectChanges();
    const btn = Array.from(cal().querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Jump',
    ) as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    expect((fixture.componentInstance.value() as Date).getMonth()).toBe(5);
  });

  it('shows a time input and applies the selected time', () => {
    const { fixture, cal } = render();
    fixture.componentInstance.showTime.set(true);
    fixture.detectChanges();
    const time = cal().querySelector('input[type="time"]') as HTMLInputElement;
    expect(time).toBeTruthy();
    dayButton(cal(), new Date(2026, 0, 10))!.click();
    fixture.detectChanges();
    time.value = '09:15:30';
    time.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const value = fixture.componentInstance.value() as Date;
    expect(value.getHours()).toBe(9);
    expect(value.getMinutes()).toBe(15);
    expect(value.getSeconds()).toBe(30);
  });

  it('renders a custom day cell', () => {
    const fixture = TestBed.createComponent(CustomHost);
    fixture.detectChanges();
    const cal = fixture.nativeElement.querySelector('hb-calendar') as HTMLElement;
    expect(dayButton(cal, new Date(2026, 0, 10))!.textContent?.trim()).toBe('D10');
  });

  it('disables specific booked dates', () => {
    const { fixture, cal } = render();
    fixture.componentInstance.disabledDates.set([new Date(2026, 0, 12)]);
    fixture.detectChanges();
    expect(dayButton(cal(), new Date(2026, 0, 12))!.getAttribute('aria-disabled')).toBe('true');
  });

  it('renders multiple consecutive months (numberOfMonths)', () => {
    const { fixture, cal } = render();
    fixture.componentInstance.numberOfMonths.set(2);
    fixture.detectChanges();
    const tables = cal().querySelectorAll('table');
    expect(tables.length).toBe(2);
    expect(cal().textContent).toContain('January 2026');
    expect(cal().textContent).toContain('February 2026');
    expect(cal().querySelectorAll('[aria-label="Previous month"]').length).toBe(1);
    expect(cal().querySelectorAll('[aria-label="Next month"]').length).toBe(1);
  });

  it('localizes month/weekday labels via hbLocale', () => {
    const { fixture, cal } = render();
    fixture.componentInstance.locale.set(ptBR);
    fixture.detectChanges();
    expect(cal().textContent?.toLowerCase()).toContain('janeiro');
    expect(cal().textContent?.toLowerCase()).toContain('dom');
  });

});
