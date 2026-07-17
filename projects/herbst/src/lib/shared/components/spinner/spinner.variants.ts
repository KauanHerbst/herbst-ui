import { cva, type VariantProps } from 'class-variance-authority';

export const spinnerVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center text-current',
  {
    variants: {
      size: {
        xs: 'size-3 [&_svg]:size-3',
        sm: 'size-4 [&_svg]:size-4',
        md: 'size-5 [&_svg]:size-5',
        lg: 'size-6 [&_svg]:size-6',
        xl: 'size-8 [&_svg]:size-8',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type HbSpinnerSize = NonNullable<VariantProps<typeof spinnerVariants>['size']>;
export type HbSpinnerVariant = 'icon' | 'bars';
