import {
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
import { switchTrackVariants, type HbSwitchLabelPosition } from './switch.variants';

@Component({
  selector: 'hb-switch',
  imports: [NgIcon],
  template: `
    <label [class]="labelClasses()">
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
      <span
        [class]="trackClasses()"
        [attr.data-state]="state()"
        [attr.aria-invalid]="hbInvalid() || null"
        aria-hidden="true"
      >
        <span [class]="thumbClasses()" [attr.data-state]="state()">
          @if (hbChecked() && hbCheckedIcon()) {
            <ng-icon [name]="hbCheckedIcon()" />
          } @else if (!hbChecked() && hbUncheckedIcon()) {
            <ng-icon [name]="hbUncheckedIcon()" />
          }
        </span>
      </span>
      <ng-content />
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => HbSwitchComponent), multi: true },
  ],
  host: { '[class]': "'inline-flex'", '[attr.data-slot]': "'switch'" },
  exportAs: 'hbSwitch',
})
export class HbSwitchComponent extends HbSwitchBase {
  readonly hbLabelPosition = input<HbSwitchLabelPosition>('end');

  protected readonly trackClasses = computed(() =>
    cn(
      switchTrackVariants({ size: this.hbSize(), status: this.hbStatus(), focusable: true }),
      this.class(),
    ),
  );
  protected readonly labelClasses = computed(() =>
    cn(
      'relative inline-flex items-center gap-2 text-sm leading-none select-none',
      this.hbLabelPosition() === 'start' && 'flex-row-reverse',
      this.isDisabled() ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
    ),
  );
}
