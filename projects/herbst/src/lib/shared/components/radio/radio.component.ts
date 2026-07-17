import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ViewEncapsulation,
} from '@angular/core';

import { cn } from '../../utils';
import { HbRadioBase } from './radio.base';
import { radioVariants } from './radio.variants';

@Component({
  selector: 'hb-radio',
  template: `
    <label [class]="labelClasses()">
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
      <span
        [class]="circleClasses()"
        [attr.data-state]="state()"
        [attr.aria-invalid]="isInvalid() || null"
        aria-hidden="true"
      >
        @if (checked()) {
          <span data-slot="radio-dot"></span>
        }
      </span>
      <ng-content />
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': "'inline-flex'", '[attr.data-slot]': "'radio'" },
  exportAs: 'hbRadio',
})
export class HbRadioComponent extends HbRadioBase {
  protected readonly circleClasses = computed(() =>
    cn(
      radioVariants({ size: this.effSize(), status: this.effStatus(), focusable: true }),
      this.class(),
    ),
  );
  protected readonly labelClasses = computed(() =>
    cn(
      'relative inline-flex items-center gap-2 text-sm leading-none select-none',
      this.isDisabled() ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
    ),
  );
}
