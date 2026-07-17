import { InjectionToken, type Signal } from '@angular/core';

export type HbButtonGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type HbButtonGroupOrientation = 'horizontal' | 'vertical';

export interface HbButtonGroupContext {
  readonly size: Signal<HbButtonGroupSize | null>;
  readonly orientation: Signal<HbButtonGroupOrientation>;
}

export const HB_BUTTON_GROUP = new InjectionToken<HbButtonGroupContext>('HB_BUTTON_GROUP');
