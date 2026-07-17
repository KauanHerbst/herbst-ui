import { InjectionToken } from '@angular/core';

export interface HbCheckboxGroupContext {
  readonly value: () => unknown[];
  readonly disabled: () => boolean;
  isSelected(value: unknown): boolean;
  toggle(value: unknown): void;
}

export const HB_CHECKBOX_GROUP = new InjectionToken<HbCheckboxGroupContext>('HB_CHECKBOX_GROUP');
