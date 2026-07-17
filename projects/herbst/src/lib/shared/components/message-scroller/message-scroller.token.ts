import { InjectionToken } from '@angular/core';

export type HbScrollPosition = 'start' | 'end' | 'last-anchor';

export interface HbMessageScrollerItemRef {
  messageId: () => string;
  anchor: () => boolean;
  element: () => HTMLElement;
}

export interface HbMessageScrollerContext {
  autoScroll: () => boolean;
  atBottom: () => boolean;
  scrollableStart: () => boolean;
  scrollableEnd: () => boolean;
  autoScrolling: () => boolean;
  registerViewport(element: HTMLElement): void;
  registerItem(item: HbMessageScrollerItemRef): void;
  unregisterItem(item: HbMessageScrollerItemRef): void;
  onViewportScroll(): void;
  onContentResize(): void;
  scrollToEnd(smooth?: boolean): void;
  scrollToStart(smooth?: boolean): void;
  scrollToMessage(id: string, smooth?: boolean): void;
}

export const HB_MESSAGE_SCROLLER = new InjectionToken<HbMessageScrollerContext>(
  'HB_MESSAGE_SCROLLER',
);
