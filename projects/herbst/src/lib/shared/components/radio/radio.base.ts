import {
  booleanAttribute,
  computed,
  Directive,
  inject,
  input,
  output,
} from '@angular/core';

import { type ClassValue } from '../../utils';
import { HB_RADIO_GROUP, type HbRadioGroupContext } from './radio.token';
import { type HbRadioSize, type HbRadioStatus } from './radio.variants';



let radioUid = 0;
@Directive()
export abstract class HbRadioBase {
  protected readonly group = inject<HbRadioGroupContext | null>(HB_RADIO_GROUP, { optional: true });
  protected readonly uid = `hb-radio-${++radioUid}`;

  readonly hbValue = input<unknown>(null);
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbInvalid = input(false, { transform: booleanAttribute });
  readonly hbSize = input<HbRadioSize | null>(null);
  readonly hbStatus = input<HbRadioStatus | null>(null);
  readonly hbInputId = input<string>('');
  readonly class = input<ClassValue>('');

  readonly hbChange = output<unknown>();

  protected readonly checked = computed(() =>
    this.group ? this.group.isSelected(this.hbValue()) : false,
  );
  protected readonly isDisabled = computed(
    () => this.hbDisabled() || (this.group?.disabled() ?? false),
  );
  protected readonly isInvalid = computed(
    () => this.hbInvalid() || (this.group?.invalid() ?? false),
  );
  protected readonly effSize = computed<HbRadioSize>(
    () => this.hbSize() ?? this.group?.size() ?? 'md',
  );
  protected readonly effStatus = computed<HbRadioStatus>(
    () => this.hbStatus() ?? this.group?.status() ?? 'default',
  );
  protected readonly state = computed(() => (this.checked() ? 'checked' : 'unchecked'));
  protected readonly name = computed(() => this.group?.name() ?? this.uid);
  protected readonly stringValue = computed(() => {
    const value = this.hbValue();
    return value === null || value === undefined ? null : String(value);
  });

  protected onSelect(): void {
    this.group?.select(this.hbValue());
    this.hbChange.emit(this.hbValue());
  }
  protected onTouched(): void {
    this.group?.markTouched();
  }
}
