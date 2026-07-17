import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const chipVariants = cva(
  cn(
    'inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full font-medium',
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
      size: {
        xs: 'h-6 gap-1 px-2 text-xs',
        sm: 'h-7 px-2.5 text-xs',
        md: 'h-8 px-3 text-sm',
        lg: 'h-9 px-3.5 text-sm',
        xl: 'h-10 px-4 text-base',
      },
    },
    defaultVariants: { type: 'secondary', size: 'md' },
  },
);

export type HbChipType = NonNullable<VariantProps<typeof chipVariants>['type']>;
export type HbChipSize = NonNullable<VariantProps<typeof chipVariants>['size']>;
