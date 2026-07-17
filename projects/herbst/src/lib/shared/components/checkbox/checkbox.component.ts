import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheck, phosphorMinus } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HB_CHECKBOX_GROUP, type HbCheckboxGroupContext } from './checkbox.token';
import {
  checkboxVariants,
  type HbCheckboxShape,
  type HbCheckboxSize,
  type HbCheckboxStatus,
} from './checkbox.variants';


let checkboxUid = 0;
@Directive({ selector: '[hbCheckboxIndicator]' })
export class HbCheckboxIndicatorDirective {}


@Component({
  selector: 'hb-checkbox',
  imports: [NgIcon, NgTemplateOutlet],
  template: `
    <label [class]="labelClasses()">
      <input
        type="checkbox"
        class="peer sr-only"
        [id]="hbInputId() || uid"
        [checked]="checked()"
        [indeterminate]="hbIndeterminate()"
        [disabled]="isDisabled()"
        [required]="hbRequired() || null"
        [value]="stringValue()"
        [attr.name]="hbName() || null"
        [attr.aria-invalid]="hbInvalid() || null"
        [attr.aria-label]="hbAriaLabel() || null"
        (change)="onNativeChange($event)"
        (blur)="onTouched()"
      />
      <span
        [class]="boxClasses()"
        [attr.data-state]="state()"
        [attr.aria-invalid]="hbInvalid() || null"
        aria-hidden="true"
      >
        @if (indicatorTpl(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="indicatorContext()" />
        } @else if (hbIndeterminate()) {
          <ng-icon name="phosphorMinus" />
        } @else if (checked()) {
          <ng-icon [name]="hbIcon() || 'phosphorCheck'" />
        }
      </span>
      <ng-content />
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [provideIcons({ phosphorCheck, phosphorMinus })],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => HbCheckboxComponent), multi: true },
  ],
  host: { '[class]': "'inline-flex'", '[attr.data-slot]': "'checkbox'" },
  exportAs: 'hbCheckbox',
})
export class HbCheckboxComponent implements ControlValueAccessor {
  protected readonly uid = `hb-checkbox-${++checkboxUid}`;
  private readonly group = inject<HbCheckboxGroupContext | null>(HB_CHECKBOX_GROUP, {
    optional: true,
  });

  readonly hbChecked = model(false);
  readonly hbIndeterminate = model(false);
  readonly hbValue = input<unknown>(null);
  readonly hbStatus = input<HbCheckboxStatus>('default');
  readonly hbSize = input<HbCheckboxSize>('md');
  readonly hbShape = input<HbCheckboxShape>('square');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbInvalid = input(false, { transform: booleanAttribute });
  readonly hbRequired = input(false, { transform: booleanAttribute });
  readonly hbIcon = input<string>('');
  readonly hbInputId = input<string>('');
  readonly hbName = input<string>('');
  readonly hbAriaLabel = input<string>('');
  readonly class = input<ClassValue>('');

  readonly hbChange = output<boolean>();

  protected readonly indicatorTpl = contentChild(HbCheckboxIndicatorDirective, {
    read: TemplateRef,
  });

  private readonly cvaDisabled = signal(false);

  protected readonly checked = computed(() =>
    this.group ? this.group.isSelected(this.hbValue()) : this.hbChecked(),
  );
  protected readonly isDisabled = computed(
    () => this.hbDisabled() || (this.group?.disabled() ?? false) || this.cvaDisabled(),
  );
  protected readonly state = computed(() =>
    this.hbIndeterminate() ? 'indeterminate' : this.checked() ? 'checked' : 'unchecked',
  );
  protected readonly stringValue = computed(() => {
    const value = this.hbValue();
    return value === null || value === undefined ? null : String(value);
  });

  protected readonly boxClasses = computed(() =>
    cn(
      checkboxVariants({ size: this.hbSize(), shape: this.hbShape(), status: this.hbStatus() }),
      this.class(),
    ),
  );
  protected readonly labelClasses = computed(() =>
    cn(
      'relative inline-flex items-center gap-2 text-sm leading-none select-none',
      this.isDisabled() ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
    ),
  );
  protected indicatorContext(): Record<string, unknown> {
    return {
      $implicit: this.checked(),
      checked: this.checked(),
      indeterminate: this.hbIndeterminate(),
    };
  }

  protected onNativeChange(event: Event): void {
    const next = (event.target as HTMLInputElement).checked;
    this.hbIndeterminate.set(false);
    if (this.group) {
      this.group.toggle(this.hbValue());
    } else {
      this.hbChecked.set(next);
      this.onChange(next);
    }
    this.onTouched();
    this.hbChange.emit(next);
  }

  protected onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};
  writeValue(value: boolean): void {
    this.hbChecked.set(!!value);
  }
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }
}
