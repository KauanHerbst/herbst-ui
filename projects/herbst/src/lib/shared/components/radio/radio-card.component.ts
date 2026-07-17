import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn } from '../../utils';
import { HbRadioBase } from './radio.base';
import { radioCardVariants, radioVariants } from './radio.variants';

@Component({
  selector: 'hb-radio-card',
  template: `
    <label [class]="cardClasses()" [attr.data-state]="state()" [attr.aria-invalid]="isInvalid() || null">
      <input
        type="radio"
        class="peer sr-only"
        [id]="hbInputId() || uid"
        [name]="name()"
        [value]="stringValue()"
        [checked]="checked()"
        [disabled]="isDisabled()"
        [attr.aria-invalid]="isInvalid() || null"
        (change)="onSelect()"
        (blur)="onTouched()"
      />
      <div class="flex-1"><ng-content /></div>
      @if (hbIndicator()) {
        <span
          [class]="circleClasses()"
          [attr.data-state]="state()"
          aria-hidden="true"
        >
          @if (checked()) {
            <span data-slot="radio-dot"></span>
          }
        </span>
      }
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': "'block'", '[attr.data-slot]': "'radio-card'" },
  exportAs: 'hbRadioCard',
})
export class HbRadioCardComponent extends HbRadioBase {
  readonly hbIndicator = input(true, { transform: booleanAttribute });

  protected readonly cardClasses = computed(() =>
    cn(radioCardVariants({ status: this.effStatus() }), this.class()),
  );
  protected readonly circleClasses = computed(() =>
    cn(radioVariants({ size: this.effSize(), status: this.effStatus(), focusable: false })),
  );
}
