import {
  booleanAttribute,
  computed,
  Directive,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { type ControlValueAccessor } from '@angular/forms';

import { type ClassValue } from '../../utils';
import {
  switchThumbVariants,
  type HbSwitchSize,
  type HbSwitchStatus,
} from './switch.variants';



let switchUid = 0;
@Directive()
export abstract class HbSwitchBase implements ControlValueAccessor {
  protected readonly uid = `hb-switch-${++switchUid}`;

  readonly hbChecked = model(false);
  readonly hbStatus = input<HbSwitchStatus>('default');
  readonly hbSize = input<HbSwitchSize>('md');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbInvalid = input(false, { transform: booleanAttribute });
  readonly hbRequired = input(false, { transform: booleanAttribute });
  readonly hbName = input<string>('');
  readonly hbInputId = input<string>('');
  readonly hbAriaLabel = input<string>('');
  readonly hbCheckedIcon = input<string>('');
  readonly hbUncheckedIcon = input<string>('');
  readonly class = input<ClassValue>('');

  readonly hbChange = output<boolean>();

  protected readonly cvaDisabled = signal(false);

  protected readonly isDisabled = computed(() => this.hbDisabled() || this.cvaDisabled());
  protected readonly state = computed(() => (this.hbChecked() ? 'checked' : 'unchecked'));
  protected readonly thumbClasses = computed(() => switchThumbVariants({ size: this.hbSize() }));

  protected onNativeChange(event: Event): void {
    const next = (event.target as HTMLInputElement).checked;
    this.hbChecked.set(next);
    this.onChange(next);
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
