import { InjectionToken } from '@angular/core';

export interface HbComboboxItemRef {
  readonly optionId: string;
}

export interface HbComboboxContext {
  hbMultiple: () => boolean;
  matchesFilter(label: string): boolean;
  isSelected(value: unknown): boolean;
  activeEntryFor(item: HbComboboxItemRef): boolean;
  setActiveByItem(item: HbComboboxItemRef): void;
  reportLabel(value: unknown, label: string): void;
  selectValue(value: unknown): void;
}

export const HB_COMBOBOX = new InjectionToken<HbComboboxContext>('HB_COMBOBOX');
