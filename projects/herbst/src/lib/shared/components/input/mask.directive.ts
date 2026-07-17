import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'input[hbMask]',
  host: { '(input)': 'onInput()' },
  exportAs: 'hbMask',
})
export class HbMaskDirective {
  private readonly host = inject<ElementRef<HTMLInputElement>>(ElementRef);

  readonly hbMask = input<string | RegExp>('');

  private lastValid = '';

  protected onInput(): void {
    const el = this.host.nativeElement;
    const mask = this.hbMask();
    if (!mask) return;
    const pattern = mask instanceof RegExp ? mask : new RegExp(mask);
    if (el.value === '' || pattern.test(el.value)) {
      this.lastValid = el.value;
    } else {
      el.value = this.lastValid;
    }
  }
}
