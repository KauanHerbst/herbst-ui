import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const badgeVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-1 whitespace-nowrap font-medium tabular-nums',
    'transition-colors [&>ng-icon>svg]:size-[1em]',
    'focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none',
  ),
  {
    variants: {
      type: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        outline: 'border border-border text-foreground',
      },
      shape: {
        rounded: 'rounded-md',
        pill: 'rounded-full',
        circle: 'aspect-square rounded-full p-0',
        square: 'rounded-none',
      },
      size: {
        xs: 'h-4 min-w-4 px-1 text-[0.625rem]',
        sm: 'h-5 min-w-5 px-1.5 text-xs',
        md: 'h-6 min-w-6 px-2 text-xs',
        lg: 'h-7 min-w-7 px-2.5 text-sm',
        xl: 'h-8 min-w-8 px-3 text-base',
      },
    },
    defaultVariants: { type: 'default', shape: 'pill', size: 'md' },
  },
);

export const overlayBadgePositionVariants = cva('pointer-events-none absolute z-10', {
  variants: {
    position: {
      'top-right': 'top-0 right-0 -translate-y-1/2 translate-x-1/2',
      'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
      'bottom-right': 'right-0 bottom-0 translate-x-1/2 translate-y-1/2',
      'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    },
  },
  defaultVariants: { position: 'top-right' },
});

export type HbBadgeType = NonNullable<VariantProps<typeof badgeVariants>['type']>;
export type HbBadgeShape = NonNullable<VariantProps<typeof badgeVariants>['shape']>;
export type HbBadgeSize = NonNullable<VariantProps<typeof badgeVariants>['size']>;
export type HbBadgePosition = NonNullable<
  VariantProps<typeof overlayBadgePositionVariants>['position']
>;
