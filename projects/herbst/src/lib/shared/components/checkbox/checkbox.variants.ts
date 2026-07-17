import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const checkboxVariants = cva(
  cn(
    'inline-grid shrink-0 place-content-center border border-input bg-background text-primary-foreground shadow-xs transition-shadow',
    'peer-focus-visible:border-ring peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
    'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20',
  ),
  {
    variants: {
      size: {
        xs: 'size-3.5 [&_ng-icon]:size-2.5',
        sm: 'size-4 [&_ng-icon]:size-3',
        md: 'size-5 [&_ng-icon]:size-3.5',
        lg: 'size-6 [&_ng-icon]:size-4',
        xl: 'size-7 [&_ng-icon]:size-5',
      },
      shape: {
        square: 'rounded-[4px]',
        rounded: 'rounded-md',
        circle: 'rounded-full',
      },
      status: {
        default:
          'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary',
        error:
          'border-destructive data-[state=checked]:border-destructive data-[state=checked]:bg-destructive data-[state=indeterminate]:border-destructive data-[state=indeterminate]:bg-destructive peer-focus-visible:ring-destructive/30',
        success:
          'border-success data-[state=checked]:border-success data-[state=checked]:bg-success data-[state=indeterminate]:border-success data-[state=indeterminate]:bg-success peer-focus-visible:ring-success/30',
        warning:
          'border-warning data-[state=checked]:border-warning data-[state=checked]:bg-warning data-[state=indeterminate]:border-warning data-[state=indeterminate]:bg-warning peer-focus-visible:ring-warning/30',
      },
    },
    defaultVariants: { size: 'md', shape: 'square', status: 'default' },
  },
);

export type HbCheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>['size']>;
export type HbCheckboxShape = NonNullable<VariantProps<typeof checkboxVariants>['shape']>;
export type HbCheckboxStatus = NonNullable<VariantProps<typeof checkboxVariants>['status']>;
