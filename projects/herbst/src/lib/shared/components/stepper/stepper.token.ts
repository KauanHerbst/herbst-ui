import { InjectionToken, type Signal } from '@angular/core';

export type HbStepperOrientation = 'horizontal' | 'vertical';
export type HbStepValue = number | string;

export interface HbStepContext {
  readonly active: HbStepValue;
  readonly index: number;
  readonly isFirst: boolean;
  readonly isLast: boolean;
  next(): void;
  prev(): void;
  activate(value: HbStepValue): void;
}

export interface HbStepRef {
  readonly value: Signal<HbStepValue>;
  readonly disabled: Signal<boolean>;
}

export interface HbStepperContext {
  readonly orientation: Signal<HbStepperOrientation>;
  readonly linear: Signal<boolean>;
  readonly active: Signal<HbStepValue>;
  readonly activeIndex: Signal<number>;
  readonly steps: Signal<readonly HbStepRef[]>;
  indexOf(step: unknown): number;
  isCompleted(index: number): boolean;
  canActivate(index: number): boolean;
  activate(value: HbStepValue): void;
  next(): void;
  prev(): void;
  contextFor(index: number): HbStepContext;
}

export const HB_STEPPER = new InjectionToken<HbStepperContext>('HB_STEPPER');
