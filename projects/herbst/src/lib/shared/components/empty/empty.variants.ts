import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const emptyVariants = cva(
  cn(
    'flex w-full min-w-0 flex-col items-center justify-center gap-6 rounded-lg text-center text-balance',
  ),
  {
    variants: {
      size: {
        xs: 'gap-3 p-4',
        sm: 'gap-4 p-6',
        md: 'gap-6 p-8',
        lg: 'gap-8 p-12',
        xl: 'gap-10 p-16',
      },
      variant: {
        default: '',
        outline: 'border border-dashed border-border',
      },
      background: {
        none: '',
        muted: 'bg-muted/30',
      },
    },
    defaultVariants: { size: 'md', variant: 'default', background: 'none' },
  },
);

export const emptyHeaderVariants = cva('flex max-w-md flex-col items-center gap-2 text-center');

export const emptyMediaVariants = cva(
  cn('mb-2 flex shrink-0 items-center justify-center text-foreground'),
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: cn(
          'size-10 rounded-lg bg-muted text-foreground',
          "[&_ng-icon]:text-[1.5rem] [&_svg:not([class*='size-'])]:size-6",
        ),
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export const emptyTitleVariants = cva('text-lg font-medium tracking-tight');
export const emptyDescriptionVariants = cva(
  cn(
    'text-sm/relaxed text-muted-foreground',
    '[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
  ),
);

export const emptyContentVariants = cva(
  'flex w-full max-w-sm min-w-0 flex-col items-center justify-center gap-2 text-sm text-balance',
);

export type HbEmptySize = NonNullable<VariantProps<typeof emptyVariants>['size']>;
export type HbEmptyVariant = NonNullable<VariantProps<typeof emptyVariants>['variant']>;
export type HbEmptyBackground = NonNullable<VariantProps<typeof emptyVariants>['background']>;
export type HbEmptyMediaVariant = NonNullable<VariantProps<typeof emptyMediaVariants>['variant']>;
