import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const comboboxTriggerVariants = cva(
  cn(
    'flex min-w-0 flex-nowrap items-center gap-1 overflow-hidden rounded-md border border-input bg-background text-foreground shadow-xs',
    'transition-[color,box-shadow]',
    'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
    'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50',
    'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20',
  ),
  {
    variants: {
      size: {
        xs: 'min-h-7 px-1.5 py-0.5 text-xs',
        sm: 'min-h-8 px-2 py-1 text-sm',
        md: 'min-h-9 px-2.5 py-1 text-sm',
        lg: 'min-h-10 px-3 py-1.5 text-base',
        xl: 'min-h-11 px-3.5 py-2 text-base',
      },
      status: {
        default: '',
        success: 'border-success focus-within:border-success focus-within:ring-success/30',
        warning: 'border-warning focus-within:border-warning focus-within:ring-warning/30',
        error: 'border-destructive focus-within:border-destructive focus-within:ring-destructive/30',
      },
      borderless: {
        true: 'rounded-none border-0 bg-transparent shadow-none focus-within:ring-0',
        false: '',
      },
      ring: { true: '', false: 'focus-within:ring-0 aria-[invalid=true]:focus-within:ring-0' },
      fluid: { true: 'w-full', false: 'w-fit min-w-48' },
    },
    defaultVariants: { size: 'md', status: 'default', borderless: false, ring: true, fluid: false },
  },
);

export type HbComboboxSize = NonNullable<VariantProps<typeof comboboxTriggerVariants>['size']>;
export type HbComboboxStatus = NonNullable<VariantProps<typeof comboboxTriggerVariants>['status']>;
