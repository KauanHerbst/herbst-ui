import { type ElementRef, InjectionToken } from '@angular/core';

import { type HbResizableOrientation } from './resizable.variants';

export interface HbResizableHandleRef {
  readonly el: ElementRef<HTMLElement>;
}

export interface HbResizableContext {
  hbOrientation: () => HbResizableOrientation;
  startResize(handleIndex: number, event: PointerEvent): void;
  handleIndexOf(handle: HbResizableHandleRef): number;
  resizeByKeyboard(handleIndex: number, direction: number, toExtreme?: 'min' | 'max' | null): void;
}

export const HB_RESIZABLE_GROUP = new InjectionToken<HbResizableContext>('HB_RESIZABLE_GROUP');
