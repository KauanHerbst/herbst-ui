import { InjectionToken, type TemplateRef } from '@angular/core';

export type HbNavMenuOrientation = 'horizontal' | 'vertical';
export type HbNavMenuSide = 'top' | 'bottom' | 'left' | 'right';

export interface HbNavMenuItemRef {
  value: () => string;
  triggerEl: () => HTMLElement | null;
  content: () => TemplateRef<unknown> | null;
}

export interface HbNavMenuContext {
  orientation: () => HbNavMenuOrientation;
  side: () => HbNavMenuSide;
  useViewport: () => boolean;
  activeValue: () => string | null;
  activeItem: () => HbNavMenuItemRef | null;
  activeContent: () => TemplateRef<unknown> | null;
  isOpen(value: string): boolean;
  hoverOpen(value: string): void;
  openImmediate(value: string): void;
  toggle(value: string): void;
  scheduleClose(): void;
  cancelClose(): void;
  registerItem(item: HbNavMenuItemRef): void;
  unregisterItem(item: HbNavMenuItemRef): void;
  onTriggerKeydown(value: string, event: KeyboardEvent): void;
}

export const HB_NAV_MENU = new InjectionToken<HbNavMenuContext>('HB_NAV_MENU');
