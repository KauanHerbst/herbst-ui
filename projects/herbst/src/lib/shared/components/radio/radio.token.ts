import { InjectionToken } from '@angular/core';

import type { HbRadioSize, HbRadioStatus } from './radio.variants';

export interface HbRadioGroupContext {
  readonly value: () => unknown;
  readonly name: () => string;
  readonly disabled: () => boolean;
  readonly invalid: () => boolean;
  readonly size: () => HbRadioSize;
  readonly status: () => HbRadioStatus;
  isSelected(value: unknown): boolean;
  select(value: unknown): void;
  markTouched(): void;
}

export const HB_RADIO_GROUP = new InjectionToken<HbRadioGroupContext>('HB_RADIO_GROUP');
