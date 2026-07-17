import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import {
  HbCurrencyDirective,
  HbInputDirective,
  HbMaskDirective,
  HbNumericDirective,
} from '@herbst/ui';

@Component({
  selector: 'hb-demo-input-directives',
  imports: [HbInputDirective, HbNumericDirective, HbCurrencyDirective, HbMaskDirective],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-3">
      <input hb-input hbNumeric hbDecimal placeholder="Numeric — digits & one dot" />
      <input hb-input hbNumeric hbSign="negative" placeholder="Numeric — negative only" />

      <input
        hb-input
        hbCurrency="EUR"
        hbLocale="de-DE"
        [(hbCurrencyValue)]="amount"
        placeholder="Type digits: 12345 → €123,45"
      />
      <p class="font-mono text-[12px] text-muted-foreground">Value: {{ amount() ?? '—' }}</p>

      <input hb-input hbMask="^[A-Za-z]*$" placeholder="Mask — letters only" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoInputDirectivesComponent {
  protected readonly amount = signal<number | null>(null);
}
