import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const switchTrackVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent px-0.5 outline-none transition-colors data-[state=unchecked]:bg-input',
  {
    variants: {
      size: {
        xs: 'h-4 w-7',
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-13',
        xl: 'h-8 w-15',
      },
      status: {
        default: 'data-[state=checked]:bg-primary',
        error: 'data-[state=checked]:bg-destructive',
        success: 'data-[state=checked]:bg-success',
        warning: 'data-[state=checked]:bg-warning',
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

export const switchThumbVariants = cva(
  'pointer-events-none grid place-content-center rounded-full bg-background text-foreground shadow-sm ring-0 transition-transform data-[state=unchecked]:translate-x-0',
  {
    variants: {
      size: {
        xs: 'size-3 [&_svg]:size-2 data-[state=checked]:translate-x-3',
        sm: 'size-4 [&_svg]:size-2.5 data-[state=checked]:translate-x-4',
        md: 'size-5 [&_svg]:size-3 data-[state=checked]:translate-x-5',
        lg: 'size-6 [&_svg]:size-3.5 data-[state=checked]:translate-x-6',
        xl: 'size-7 [&_svg]:size-4 data-[state=checked]:translate-x-7',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const switchCardVariants = cva(
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

export type HbSwitchSize = NonNullable<VariantProps<typeof switchThumbVariants>['size']>;
export type HbSwitchStatus = NonNullable<VariantProps<typeof switchTrackVariants>['status']>;
export type HbSwitchLabelPosition = 'start' | 'end';
