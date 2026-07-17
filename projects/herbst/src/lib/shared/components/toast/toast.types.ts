import { InjectionToken, type Signal } from '@angular/core';

import type { ClassValue } from '../../utils';

export type HbToastType =
  | 'default'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'info'
  | 'loading';

export type HbToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'center';

export interface HbToastAction {
  label: string;
  onClick?: (ref: HbToastRef) => void;
  type?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  closeOnClick?: boolean;
}

export interface HbToastConfig {
  type?: HbToastType;
  title?: string;
  description?: string;
  icon?: string;
  duration?: number;
  position?: HbToastPosition;
  closable?: boolean;
  pauseOnHover?: boolean;
  progressBar?: boolean;
  actions?: HbToastAction[];
  class?: ClassValue;
  onDismiss?: () => void;
}

export interface HbToastGlobalConfig {
  position: HbToastPosition;
  duration: number;
  closable: boolean;
  pauseOnHover: boolean;
  progressBar: boolean;
  maxVisible: number;
  gap: string;
  offset: string;
}

export const HB_TOAST_DEFAULTS: HbToastGlobalConfig = {
  position: 'bottom-right',
  duration: 4000,
  closable: true,
  pauseOnHover: true,
  progressBar: false,
  maxVisible: 0,
  gap: '0.75rem',
  offset: '1rem',
};

export const HB_TOAST_CONFIG = new InjectionToken<Partial<HbToastGlobalConfig>>('HB_TOAST_CONFIG');

export interface HbToastRef {
  readonly id: number;
  readonly config: Signal<HbToastConfig>;
  readonly paused: Signal<boolean>;
  readonly visible: Signal<boolean>;
  dismiss(): void;
  pause(): void;
  resume(): void;
  update(patch: Partial<HbToastConfig>): void;
}
