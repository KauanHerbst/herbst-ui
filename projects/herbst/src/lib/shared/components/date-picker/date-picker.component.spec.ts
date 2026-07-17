import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbButtonComponent } from '../button';
import { HbCalendarImports } from '../calendar';
import type { HbCalendarValue } from '../calendar';
import { HbDatePickerComponent } from './date-picker.component';
import { HbDatePickerInputDirective } from './date-picker-input.directive';

@Component({
  imports: [HbDatePickerComponent, HbCalendarImports, HbButtonComponent],
  template: `
    <hb-date-picker>
      <button hb-button hbDatePickerTrigger>Open</button>
      <hb-calendar [hbDefaultDate]="defaultDate" [(hbValue)]="value" />
    </hb-date-picker>
  `,
})
class Host {
  readonly defaultDate = new Date(2026, 0, 15);
  readonly value = signal<HbCalendarValue>(null);
}

describe('HbDatePickerComponent', () => {
  let overlay: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return fixture;
  }
  const triggerBtn = (fixture: ReturnType<typeof render>) =>
    fixture.nativeElement.querySelector('button') as HTMLButtonElement;

  it('opens the calendar on trigger click', () => {
    const fixture = render();
    triggerBtn(fixture).click();
    fixture.detectChanges();
    expect(overlay.textContent).toContain('January 2026');
  });

  it('selects a date and closes the popover', () => {
    const fixture = render();
    triggerBtn(fixture).click();
    fixture.detectChanges();
    const dayBtn = overlay.querySelector(
      `[data-day="${new Date(2026, 0, 10).getTime()}"]`,
    ) as HTMLButtonElement;
    dayBtn.click();
    fixture.detectChanges();
    expect((fixture.componentInstance.value() as Date).getDate()).toBe(10);
    expect(overlay.textContent).not.toContain('January 2026');
  });

});

@Component({
  imports: [HbDatePickerComponent, HbDatePickerInputDirective, HbCalendarImports],
  template: `
    <hb-date-picker>
      <span hbDatePickerTrigger>
        <input hbDatePickerInput hbFormat="yyyy-MM-dd" />
        <button type="button" class="open-btn">cal</button>
      </span>
      <hb-calendar [(hbValue)]="value" />
    </hb-date-picker>
  `,
})
class InputHost {
  readonly value = signal<HbCalendarValue>(null);
}

describe('HbDatePickerComponent with input', () => {
  let overlay: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [InputHost] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });
  function render() {
    const fixture = TestBed.createComponent(InputHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    return { fixture, input };
  }

  it('drives the calendar from a typed string while the popover is closed', () => {
    const { fixture, input } = render();
    input.value = 'March 20, 2026';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const value = fixture.componentInstance.value() as Date;
    expect(value).toBeInstanceOf(Date);
    expect(value.getMonth()).toBe(2);
    expect(value.getDate()).toBe(20);
  });

  it('writes the picked date back into the input', () => {
    const { fixture, input } = render();
    input.value = 'January 5, 2026';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.open-btn') as HTMLButtonElement).click();
    fixture.detectChanges();
    const btn = overlay.querySelector(
      `[data-day="${new Date(2026, 0, 12).getTime()}"]`,
    ) as HTMLButtonElement;
    btn.click();
    fixture.detectChanges();
    expect(input.value).toBe('2026-01-12');
  });
});
