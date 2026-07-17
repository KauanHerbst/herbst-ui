import { booleanAttribute, Directive, ElementRef, inject, input } from '@angular/core';

export type HbNumericSign = 'both' | 'positive' | 'negative';

@Directive({
  selector: 'input[hbNumeric]',
  host: { '(input)': 'onInput()' },
  exportAs: 'hbNumeric',
})
export class HbNumericDirective {
  private readonly host = inject<ElementRef<HTMLInputElement>>(ElementRef);

  readonly hbSign = input<HbNumericSign>('both');
  readonly hbDecimal = input(false, { transform: booleanAttribute });

  private lastValid = '';

  protected onInput(): void {
    const el = this.host.nativeElement;
    let value = el.value;

    if (this.hbSign() === 'negative' && value && value !== '-' && !value.startsWith('-')) {
      value = `-${value}`;
    }

    if (value === '' || value === '-' || this.pattern().test(value)) {
      this.lastValid = value;
      if (el.value !== value) el.value = value;
    } else {
      el.value = this.lastValid;
    }
  }

  private pattern(): RegExp {
    const sign = this.hbSign();
    const signPart = sign === 'positive' ? '' : sign === 'negative' ? '-' : '-?';
    const decimal = this.hbDecimal() ? '(\\.\\d*)?' : '';
    return new RegExp(`^${signPart}\\d*${decimal}$`);
  }
}
