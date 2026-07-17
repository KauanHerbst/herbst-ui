import { Directive, ElementRef, inject, input, model } from '@angular/core';

@Directive({
  selector: 'input[hbCurrency]',
  host: { '(input)': 'onInput()' },
  exportAs: 'hbCurrency',
})
export class HbCurrencyDirective {
  private readonly host = inject<ElementRef<HTMLInputElement>>(ElementRef);

  readonly hbCurrency = input('USD');
  readonly hbLocale = input<string | undefined>(undefined);
  readonly hbCurrencyValue = model<number | null>(null);

  protected onInput(): void {
    const el = this.host.nativeElement;
    const digits = el.value.replace(/\D/g, '');
    if (!digits) {
      el.value = '';
      this.hbCurrencyValue.set(null);
      return;
    }
    const amount = Number(digits) / 100;
    this.hbCurrencyValue.set(amount);
    el.value = new Intl.NumberFormat(this.hbLocale(), {
      style: 'currency',
      currency: this.hbCurrency(),
    }).format(amount);
  }
}
