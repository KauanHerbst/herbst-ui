import { cva } from 'class-variance-authority';

import type { HbToastType } from './toast.types';

export const toastVariants = cva(
  'pointer-events-auto relative flex w-[356px] max-w-[calc(100vw-2rem)] items-start gap-3 overflow-hidden rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg',
  {
    variants: {
      type: {
        default: 'border-border',
        info: 'border-border',
        success: 'border-success/40',
        warning: 'border-warning/40',
        destructive: 'border-destructive/40',
        loading: 'border-border',
      },
    },
    defaultVariants: { type: 'default' },
  },
);

export const TOAST_ICON_COLOR: Record<HbToastType, string> = {
  default: 'text-foreground',
  info: 'text-foreground',
  success: 'text-success',
  warning: 'text-warning',
  destructive: 'text-destructive',
  loading: 'text-muted-foreground',
};

export const TOAST_ICON: Record<HbToastType, string> = {
  default: '',
  info: 'phosphorInfo',
  success: 'phosphorCheckCircle',
  warning: 'phosphorWarning',
  destructive: 'phosphorXCircle',
  loading: '',
};

export const TOAST_PROGRESS_COLOR: Record<HbToastType, string> = {
  default: 'bg-primary',
  info: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
  loading: 'bg-primary',
};
