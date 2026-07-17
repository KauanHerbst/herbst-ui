import { InjectionToken, type Signal } from '@angular/core';

export type HbSidebarSide = 'left' | 'right';
export type HbSidebarVariant = 'sidebar' | 'floating' | 'inset';
export type HbSidebarCollapsible = 'offcanvas' | 'icon' | 'none';
export type HbSidebarState = 'expanded' | 'collapsed';

export interface HbSidebarOpenChangeEvent {
  readonly originalEvent?: Event;
  readonly value: boolean;
}

export interface HbSidebarContext {
  readonly open: Signal<boolean>;
  readonly state: Signal<HbSidebarState>;
  readonly collapsed: Signal<boolean>;
  readonly side: Signal<HbSidebarSide>;
  readonly variant: Signal<HbSidebarVariant>;
  readonly collapsible: Signal<HbSidebarCollapsible>;
  readonly overlay: Signal<boolean>;
  readonly isMobile: Signal<boolean>;
  toggle(event?: Event): void;
  setOpen(value: boolean, event?: Event): void;
  markTrigger(): void;
  requestOutsideClose(event: Event): void;
}

export interface HbSidebarLayoutContext {
  register(id: string, ctx: HbSidebarContext): void;
  unregister(id: string): void;
  get(id: string): HbSidebarContext | undefined;
  first(): HbSidebarContext | undefined;
}

export interface HbSidebarMenuItemContext {
  readonly collapsibleItem: Signal<boolean>;
  readonly open: Signal<boolean>;
  readonly disabled: Signal<boolean>;
  toggle(): void;
}

export const HB_SIDEBAR = new InjectionToken<HbSidebarContext>('HB_SIDEBAR');
export const HB_SIDEBAR_LAYOUT = new InjectionToken<HbSidebarLayoutContext>('HB_SIDEBAR_LAYOUT');
export const HB_SIDEBAR_MENU_ITEM = new InjectionToken<HbSidebarMenuItemContext>(
  'HB_SIDEBAR_MENU_ITEM',
);
