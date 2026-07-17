import { cva, type VariantProps } from 'class-variance-authority';

export const segmentedVariants = cva(
  'inline-flex w-fit items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
  {
    variants: {
      size: { xs: 'h-7 gap-0.5', sm: 'h-8 gap-0.5', md: 'h-9 gap-1', lg: 'h-10 gap-1', xl: 'h-11 gap-1' },
    },
    defaultVariants: { size: 'md' },
  },
);

export const segmentedItemVariants = cva(
  'inline-flex h-full items-center justify-center gap-1.5 whitespace-nowrap rounded-sm font-medium ring-offset-background outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_ng-icon]:text-[1.15em]',
  {
    variants: {
      size: {
        xs: 'px-2 text-xs',
        sm: 'px-2.5 text-xs',
        md: 'px-3 text-sm',
        lg: 'px-4 text-sm',
        xl: 'px-5 text-base',
      },
      active: {
        true: 'bg-background text-foreground shadow-sm',
        false: 'hover:bg-background/50 hover:text-foreground',
      },
    },
    defaultVariants: { size: 'md', active: false },
  },
);

export type HbSegmentedSize = NonNullable<VariantProps<typeof segmentedVariants>['size']>;
