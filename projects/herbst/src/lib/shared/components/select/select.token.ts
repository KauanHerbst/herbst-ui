import { InjectionToken } from '@angular/core';

export interface HbSelectItemRef {
  readonly optionId: string;
}

export interface HbSelectContext {
  hbMultiple: () => boolean;
  matchesFilter(label: string): boolean;
  isSelected(value: unknown): boolean;
  activeEntryFor(item: HbSelectItemRef): boolean;
  setActiveByItem(item: HbSelectItemRef): void;
  reportLabel(value: unknown, label: string): void;
  selectValue(value: unknown): void;
}

export const HB_SELECT = new InjectionToken<HbSelectContext>('HB_SELECT');
