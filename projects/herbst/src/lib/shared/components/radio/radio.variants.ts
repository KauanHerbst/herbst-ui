import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const radioVariants = cva(
  cn(
    'relative inline-grid shrink-0 place-content-center rounded-full border border-input bg-background shadow-xs transition-shadow',
    '[&>[data-slot=radio-dot]]:rounded-full',
  ),
  {
    variants: {
      size: {
        xs: 'size-3.5 [&>[data-slot=radio-dot]]:size-1.5',
        sm: 'size-4 [&>[data-slot=radio-dot]]:size-2',
        md: 'size-5 [&>[data-slot=radio-dot]]:size-2.5',
        lg: 'size-6 [&>[data-slot=radio-dot]]:size-3',
        xl: 'size-7 [&>[data-slot=radio-dot]]:size-3.5',
      },
      status: {
        default: 'data-[state=checked]:border-primary [&>[data-slot=radio-dot]]:bg-primary',
        error:
          'border-destructive [&>[data-slot=radio-dot]]:bg-destructive',
        success: 'border-success [&>[data-slot=radio-dot]]:bg-success',
        warning: 'border-warning [&>[data-slot=radio-dot]]:bg-warning',
      },
      focusable: {
        true: cn(
          'peer-focus-visible:border-ring peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20',
        ),
        false: '',
      },
    },
    defaultVariants: { size: 'md', status: 'default', focusable: true },
  },
);

export const radioCardVariants = cva(
  cn(
    'relative flex w-full cursor-pointer items-center gap-3 rounded-md border border-input bg-background p-4 text-left text-sm shadow-xs transition-[color,box-shadow]',
    'has-[:focus-visible]:border-ring has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50',
    'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
    'data-[state=checked]:ring-1',
    'aria-[invalid=true]:border-destructive',
  ),
  {
    variants: {
      status: {
        default:
          'data-[state=checked]:border-primary data-[state=checked]:ring-primary data-[state=checked]:bg-primary/5',
        error:
          'data-[state=checked]:border-destructive data-[state=checked]:ring-destructive data-[state=checked]:bg-destructive/5',
        success:
          'data-[state=checked]:border-success data-[state=checked]:ring-success data-[state=checked]:bg-success/5',
        warning:
          'data-[state=checked]:border-warning data-[state=checked]:ring-warning data-[state=checked]:bg-warning/5',
      },
    },
    defaultVariants: { status: 'default' },
  },
);

export type HbRadioSize = NonNullable<VariantProps<typeof radioVariants>['size']>;
export type HbRadioStatus = NonNullable<VariantProps<typeof radioVariants>['status']>;
