import { InjectionToken, type TemplateRef } from '@angular/core';

import type { ClassValue } from '../../utils';
import type {
  HbTabsActivationMode,
  HbTabsAlign,
  HbTabsOrientation,
  HbTabsPosition,
  HbTabsSize,
  HbTabsVariant,
} from './tabs.variants';

export interface HbTabTriggerRef {
  value: () => unknown;
  element: () => HTMLElement;
  disabled: () => boolean;
}

export interface HbTabsContext {
  value: () => unknown;
  isActive(value: unknown): boolean;
  select(value: unknown): void;

  variant: () => HbTabsVariant;
  size: () => HbTabsSize;
  position: () => HbTabsPosition;
  orientation: () => HbTabsOrientation;
  align: () => HbTabsAlign;
  activationMode: () => HbTabsActivationMode;

  showArrows: () => boolean;
  scrollThreshold: () => number;
  indicatorTemplate: () => TemplateRef<unknown> | null;
  indicatorClass: () => ClassValue;

  registerTrigger(trigger: HbTabTriggerRef): void;
  unregisterTrigger(trigger: HbTabTriggerRef): void;
  triggers: () => HbTabTriggerRef[];
  onTriggerKeydown(trigger: HbTabTriggerRef, event: KeyboardEvent): void;

  tabId(value: unknown): string;
  panelId(value: unknown): string;
}

export const HB_TABS = new InjectionToken<HbTabsContext>('HB_TABS');
