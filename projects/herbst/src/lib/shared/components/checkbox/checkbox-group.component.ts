import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn, type ClassValue } from '../../utils';
import { HB_CHECKBOX_GROUP, type HbCheckboxGroupContext } from './checkbox.token';

@Component({
  selector: 'hb-checkbox-group',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => HbCheckboxGroupComponent), multi: true },
    { provide: HB_CHECKBOX_GROUP, useExisting: forwardRef(() => HbCheckboxGroupComponent) },
  ],
  host: { '[class]': 'classes()', role: 'group', '[attr.data-slot]': "'checkbox-group'" },
  exportAs: 'hbCheckboxGroup',
})
export class HbCheckboxGroupComponent implements ControlValueAccessor, HbCheckboxGroupContext {
  readonly hbValue = model<unknown[]>([]);
  readonly hbOrientation = input<'vertical' | 'horizontal'>('vertical');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  readonly hbChange = output<unknown[]>();

  private readonly cvaDisabled = signal(false);

  protected readonly classes = computed(() =>
    cn(
      'flex gap-3',
      this.hbOrientation() === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
      this.class(),
    ),
  );

  value = (): unknown[] => this.hbValue();
  disabled = (): boolean => this.hbDisabled() || this.cvaDisabled();
  isSelected(value: unknown): boolean {
    return this.hbValue().includes(value);
  }
  toggle(value: unknown): void {
    const current = this.hbValue();
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    this.hbValue.set(next);
    this.onChange(next);
    this.onTouched();
    this.hbChange.emit(next);
  }

  protected onChange: (value: unknown[]) => void = () => {};
  protected onTouched: () => void = () => {};
  writeValue(value: unknown[]): void {
    this.hbValue.set(value ?? []);
  }
  registerOnChange(fn: (value: unknown[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }
}
