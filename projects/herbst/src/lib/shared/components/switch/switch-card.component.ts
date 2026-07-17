import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';

import { cn } from '../../utils';
import { HbSwitchBase } from './switch.base';
import { switchCardVariants, switchTrackVariants } from './switch.variants';

@Component({
  selector: 'hb-switch-card',
  imports: [NgIcon],
  template: `
    <label
      [class]="cardClasses()"
      [attr.data-state]="state()"
      [attr.aria-invalid]="hbInvalid() || null"
    >
      <input
        type="checkbox"
        role="switch"
        class="peer sr-only"
        [id]="hbInputId() || uid"
        [checked]="hbChecked()"
        [disabled]="isDisabled()"
        [required]="hbRequired() || null"
        [attr.name]="hbName() || null"
        [attr.aria-invalid]="hbInvalid() || null"
        [attr.aria-label]="hbAriaLabel() || null"
        (change)="onNativeChange($event)"
        (blur)="onTouched()"
      />
      <div class="flex-1"><ng-content /></div>
      @if (hbIndicator()) {
        <span [class]="trackClasses()" [attr.data-state]="state()" aria-hidden="true">
          <span [class]="thumbClasses()" [attr.data-state]="state()">
            @if (hbChecked() && hbCheckedIcon()) {
              <ng-icon [name]="hbCheckedIcon()" />
            } @else if (!hbChecked() && hbUncheckedIcon()) {
              <ng-icon [name]="hbUncheckedIcon()" />
            }
          </span>
        </span>
      }
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HbSwitchCardComponent),
      multi: true,
    },
  ],
  host: { '[class]': "'block'", '[attr.data-slot]': "'switch-card'" },
  exportAs: 'hbSwitchCard',
})
export class HbSwitchCardComponent extends HbSwitchBase {
  readonly hbIndicator = input(true, { transform: booleanAttribute });

  protected readonly cardClasses = computed(() =>
    cn(switchCardVariants({ status: this.hbStatus() }), this.class()),
  );
  protected readonly trackClasses = computed(() =>
    switchTrackVariants({ size: this.hbSize(), status: this.hbStatus(), focusable: false }),
  );
}
