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
import { HB_RADIO_GROUP, type HbRadioGroupContext } from './radio.token';
import { type HbRadioSize, type HbRadioStatus } from './radio.variants';



let radioGroupUid = 0;
@Component({
  selector: 'hb-radio-group',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => HbRadioGroupComponent), multi: true },
    { provide: HB_RADIO_GROUP, useExisting: forwardRef(() => HbRadioGroupComponent) },
  ],
  host: {
    '[class]': 'classes()',
    role: 'radiogroup',
    '[attr.aria-invalid]': 'hbInvalid() || null',
    '[attr.data-slot]': "'radio-group'",
  },
  exportAs: 'hbRadioGroup',
})
export class HbRadioGroupComponent implements ControlValueAccessor, HbRadioGroupContext {
  readonly hbValue = model<unknown>(null);
  readonly hbName = input<string>('');
  readonly hbOrientation = input<'vertical' | 'horizontal'>('vertical');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbInvalid = input(false, { transform: booleanAttribute });
  readonly hbSize = input<HbRadioSize>('md');
  readonly hbStatus = input<HbRadioStatus>('default');
  readonly class = input<ClassValue>('');

  readonly hbChange = output<unknown>();

  private readonly autoName = `hb-radio-group-${++radioGroupUid}`;
  private readonly cvaDisabled = signal(false);

  protected readonly classes = computed(() =>
    cn(
      'flex gap-3',
      this.hbOrientation() === 'horizontal' ? 'flex-row flex-wrap gap-4' : 'flex-col',
      this.class(),
    ),
  );

  value = (): unknown => this.hbValue();
  name = (): string => this.hbName() || this.autoName;
  disabled = (): boolean => this.hbDisabled() || this.cvaDisabled();
  invalid = (): boolean => this.hbInvalid();
  size = (): HbRadioSize => this.hbSize();
  status = (): HbRadioStatus => this.hbStatus();
  isSelected(value: unknown): boolean {
    return this.hbValue() === value;
  }
  select(value: unknown): void {
    this.hbValue.set(value);
    this.onChange(value);
    this.onTouched();
    this.hbChange.emit(value);
  }
  markTouched(): void {
    this.onTouched();
  }

  protected onChange: (value: unknown) => void = () => {};
  protected onTouched: () => void = () => {};
  writeValue(value: unknown): void {
    this.hbValue.set(value);
  }
  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }
}
