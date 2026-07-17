import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject, input, signal } from '@angular/core';
import { format, isValid, parse } from 'date-fns';

@Directive({
  selector: 'input[hbDatePickerInput]',
  host: {
    '[attr.data-slot]': "'date-picker-input'",
    autocomplete: 'off',
    '(input)': 'onInput()',
    '(blur)': 'onBlur()',
  },
  exportAs: 'hbDatePickerInput',
})
export class HbDatePickerInputDirective {
  private readonly host = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);

  readonly hbFormat = input('PP');
  readonly hbParseFormats = input<string[]>([]);

  private readonly _typed = signal<Date | null>(null);
  readonly typed = this._typed.asReadonly();

  display(date: Date | null): void {
    const el = this.host.nativeElement;
    if (this.document.activeElement === el) return;
    el.value = date ? format(date, this.hbFormat()) : '';
    this._typed.set(date);
  }

  protected onInput(): void {
    this._typed.set(this.parseText(this.host.nativeElement.value));
  }

  protected onBlur(): void {
    const date = this._typed();
    if (date) this.host.nativeElement.value = format(date, this.hbFormat());
  }

  private parseText(text: string): Date | null {
    const trimmed = text.trim();
    if (!trimmed) return null;
    for (const fmt of this.hbParseFormats()) {
      const parsed = parse(trimmed, fmt, new Date());
      if (isValid(parsed)) return parsed;
    }
    const native = new Date(trimmed);
    return isValid(native) ? native : null;
  }
}
