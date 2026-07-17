import { cva, type VariantProps } from 'class-variance-authority';

export const progressTrackVariants = cva('relative w-full overflow-hidden', {
  variants: {
    type: {
      default: 'bg-primary/20',
      success: 'bg-success/20',
      warning: 'bg-warning/20',
      destructive: 'bg-destructive/20',
    },
    size: { xs: 'h-1', sm: 'h-1.5', md: 'h-2', lg: 'h-3', xl: 'h-4' },
    shape: { rounded: 'rounded-full', soft: 'rounded-md', square: 'rounded-none' },
  },
  defaultVariants: { type: 'default', size: 'md', shape: 'rounded' },
});

export const progressBarVariants = cva(
  'flex h-full items-center justify-end overflow-hidden transition-all duration-300 ease-out',
  {
    variants: {
      type: {
        default: 'bg-primary text-primary-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
      shape: { rounded: 'rounded-full', soft: 'rounded-md', square: 'rounded-none' },
    },
    defaultVariants: { type: 'default', shape: 'rounded' },
  },
);

export type HbProgressType = NonNullable<VariantProps<typeof progressTrackVariants>['type']>;
export type HbProgressSize = NonNullable<VariantProps<typeof progressTrackVariants>['size']>;
export type HbProgressShape = NonNullable<VariantProps<typeof progressTrackVariants>['shape']>;
export type HbProgressFormat = 'percent' | 'value' | 'fraction';
export type HbProgressValuePosition = 'outside' | 'inside';
