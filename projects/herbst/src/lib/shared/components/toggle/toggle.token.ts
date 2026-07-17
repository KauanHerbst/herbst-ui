import { InjectionToken } from '@angular/core';

import type { HbToggleGroupType, HbToggleSize, HbToggleVariant } from './toggle.variants';

export interface HbToggleItemRef {
  value: () => unknown;
  element: () => HTMLElement;
  disabled: () => boolean;
}

export interface HbToggleGroupContext {
  readonly type: () => HbToggleGroupType;
  readonly variant: () => HbToggleVariant;
  readonly size: () => HbToggleSize;
  readonly disabled: () => boolean;
  isSelected(value: unknown): boolean;
  toggle(value: unknown): void;
  registerItem(item: HbToggleItemRef): void;
  unregisterItem(item: HbToggleItemRef): void;
  isActiveItem(item: HbToggleItemRef): boolean;
  onItemKeydown(item: HbToggleItemRef, event: KeyboardEvent): void;
  markTouched(): void;
}

export const HB_TOGGLE_GROUP = new InjectionToken<HbToggleGroupContext>('HB_TOGGLE_GROUP');
