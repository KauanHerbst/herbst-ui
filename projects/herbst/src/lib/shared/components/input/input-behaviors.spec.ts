import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbCurrencyDirective } from './currency.directive';
import { HbMaskDirective } from './mask.directive';
import { HbNumericDirective, type HbNumericSign } from './numeric.directive';

@Component({
  imports: [HbNumericDirective, HbCurrencyDirective, HbMaskDirective],
  template: `
    <input class="numeric" hbNumeric [hbSign]="sign()" />
    <input class="currency" hbCurrency="USD" hbLocale="en-US" />
    <input class="mask" [hbMask]="mask()" />
  `,
})
class Host {
  readonly sign = signal<HbNumericSign>('both');
  readonly mask = signal('^\\d{0,3}$');
}

function type(input: HTMLInputElement, values: string[]) {
  for (const v of values) {
    input.value = v;
    input.dispatchEvent(new Event('input'));
  }
}

describe('Input behaviors', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = (cls: string) => fixture.nativeElement.querySelector(`.${cls}`) as HTMLInputElement;
    return { fixture, el };
  }

  it('hbNumeric rejects non-numeric characters', () => {
    const { el } = render();
    type(el('numeric'), ['1', '12', '12a']);
    expect(el('numeric').value).toBe('12');
  });

  it('hbCurrency formats digits as currency', () => {
    const { el } = render();
    type(el('currency'), ['1234']);
    expect(el('currency').value).toContain('12.34');
  });

  it('hbMask reverts values that fail the pattern', () => {
    const { el } = render();
    type(el('mask'), ['1', '12', '123', '1234']);
    expect(el('mask').value).toBe('123');
  });
});
