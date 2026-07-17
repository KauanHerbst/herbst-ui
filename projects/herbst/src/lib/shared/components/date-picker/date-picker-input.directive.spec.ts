import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbDatePickerInputDirective } from './date-picker-input.directive';

@Component({
  imports: [HbDatePickerInputDirective],
  template: `<input hbDatePickerInput [hbFormat]="fmt()" #dir="hbDatePickerInput" />`,
})
class Host {
  readonly fmt = signal('yyyy-MM-dd');
}

describe('HbDatePickerInputDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    return { fixture, input };
  }

  it('parses a typed date into the typed() signal', () => {
    const { fixture, input } = render();
    input.value = 'July 7, 2026';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const dir = fixture.debugElement.children[0].references['dir'] as HbDatePickerInputDirective;
    const typed = dir.typed();
    expect(typed).toBeInstanceOf(Date);
    expect(typed!.getFullYear()).toBe(2026);
    expect(typed!.getMonth()).toBe(6);
    expect(typed!.getDate()).toBe(7);
  });

  it('emits null for an unparseable string', () => {
    const { fixture, input } = render();
    input.value = 'not a date';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const dir = fixture.debugElement.children[0].references['dir'] as HbDatePickerInputDirective;
    expect(dir.typed()).toBeNull();
  });

  it('display() formats a date into the input when unfocused', () => {
    const { fixture, input } = render();
    const dir = fixture.debugElement.children[0].references['dir'] as HbDatePickerInputDirective;
    dir.display(new Date(2026, 0, 15));
    expect(input.value).toBe('2026-01-15');
  });
});
