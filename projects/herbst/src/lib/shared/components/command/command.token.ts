import { InjectionToken } from '@angular/core';

import { type HbCommandSize } from './command.variants';

export interface HbCommandItemRef {
  matches(): boolean;
  hbDisabled(): boolean;
  hbValue(): unknown;
  hbSelect: { emit(value: unknown): void };
  scrollIntoView(): void;
}

export interface HbCommandInputRef {
  focus(): void;
}

export interface HbCommandContext {
  hbSize: () => HbCommandSize;
  query: () => string;
  hasVisibleItems: () => boolean;
  matchesFilter(label: string, keywords: readonly string[]): boolean;
  isActive(item: HbCommandItemRef): boolean;
  setActive(item: HbCommandItemRef): void;
  selectItem(item: HbCommandItemRef): void;
  registerInput(input: HbCommandInputRef): void;
  setQuery(value: string): void;
  onKeydown(event: KeyboardEvent): void;
}

export const HB_COMMAND = new InjectionToken<HbCommandContext>('HB_COMMAND');
