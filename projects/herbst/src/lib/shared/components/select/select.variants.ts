import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const selectTriggerVariants = cva(
  cn(
    'flex min-w-0 items-center justify-between gap-2 rounded-md border border-input bg-background text-foreground shadow-xs',
    'outline-none transition-[color,box-shadow] data-[placeholder=true]:text-muted-foreground',
    'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20',
    '[&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0',
  ),
  {
    variants: {
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-2.5 text-sm',
        md: 'h-9 px-3 text-sm',
        lg: 'h-10 px-3.5 text-base',
        xl: 'h-11 px-4 text-base',
      },
      status: {
        default: '',
        success: 'border-success focus-visible:border-success focus-visible:ring-success/30',
        warning: 'border-warning focus-visible:border-warning focus-visible:ring-warning/30',
        error: 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30',
      },
      borderless: {
        true: 'rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0',
        false: '',
      },
      ring: { true: '', false: 'focus-visible:ring-0 aria-[invalid=true]:focus-visible:ring-0' },
      fluid: { true: 'w-full', false: 'w-fit' },
    },
    defaultVariants: {
      size: 'md',
      status: 'default',
      borderless: false,
      ring: true,
      fluid: false,
    },
  },
);

export const selectContentVariants = cva(
  cn(
    'z-50 max-h-(--hb-select-max-height,20rem) min-w-(--hb-select-trigger-width,8rem) overflow-hidden',
    'rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none',
  ),
);

export const selectViewportVariants = cva('flex flex-col overflow-y-auto p-0');

export const selectItemVariants = cva(
  cn(
    'relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none',
    'focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground',
    'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
    '[&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0',
  ),
);

export const selectLabelVariants = cva(
  'px-2 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground',
);
export const selectSeparatorVariants = cva('-mx-1 my-1 h-px bg-border');
export const selectIndicatorVariants = cva(
  'absolute right-2 flex size-3.5 items-center justify-center [&_ng-icon]:size-4',
);
export const selectScrollButtonVariants = cva(
  'flex cursor-default items-center justify-center py-1 text-muted-foreground',
);

export type HbSelectSize = NonNullable<VariantProps<typeof selectTriggerVariants>['size']>;
export type HbSelectStatus = NonNullable<VariantProps<typeof selectTriggerVariants>['status']>;
