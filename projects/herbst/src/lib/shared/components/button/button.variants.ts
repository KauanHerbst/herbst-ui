import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium',
    'transition-all outline-none shrink-0 select-none',
    'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[icon-only]:aspect-square data-[icon-only]:px-0',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    '[&_ng-icon]:flex [&_ng-icon]:items-center',
  ),
  {
    variants: {
      hbType: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
        success: 'bg-success text-success-foreground hover:bg-success/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      hbSize: {
        xs: 'h-7 gap-1 px-2 text-xs rounded-md',
        default: 'h-9 px-4 py-2 rounded-md',
        sm: 'h-8 px-3 text-xs rounded-md',
        lg: 'h-10 px-6 rounded-md',
        xl: 'h-11 px-8 text-base rounded-md',
        icon: 'size-9 rounded-md',
      },
      hbShape: {
        default: 'rounded-md',
        circle: 'rounded-full',
        square: 'rounded-none',
      },
      hbFull: {
        true: 'w-full',
      },
      hbDisabled: {
        true: 'pointer-events-none opacity-50',
      },
      hbLoading: {
        true: 'pointer-events-none opacity-50',
      },
    },
    defaultVariants: {
      hbType: 'default',
      hbSize: 'default',
      hbShape: 'default',
    },
  },
);

export type HbButtonType = NonNullable<VariantProps<typeof buttonVariants>['hbType']>;
export type HbButtonSize = NonNullable<VariantProps<typeof buttonVariants>['hbSize']>;
export type HbButtonShape = NonNullable<VariantProps<typeof buttonVariants>['hbShape']>;
