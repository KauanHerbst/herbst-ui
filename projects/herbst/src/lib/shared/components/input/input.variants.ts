import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const inputVariants = cva(
  cn(
    'min-w-0 rounded-md border border-input bg-background text-foreground shadow-xs',
    'outline-none transition-[color,box-shadow] placeholder:text-muted-foreground',
    'file:mr-2 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
    'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20 aria-[invalid=true]:focus-visible:ring-destructive/30',
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
      ring: {
        true: '',
        false: 'focus-visible:ring-0 aria-[invalid=true]:focus-visible:ring-0',
      },
      fluid: { true: 'w-full', false: 'w-auto' },
    },
    defaultVariants: { size: 'md', status: 'default', borderless: false, ring: true, fluid: false },
  },
);

export type HbInputSize = NonNullable<VariantProps<typeof inputVariants>['size']>;
export type HbInputStatus = NonNullable<VariantProps<typeof inputVariants>['status']>;
