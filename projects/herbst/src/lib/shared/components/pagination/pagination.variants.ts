import { cva, type VariantProps } from 'class-variance-authority';

export const paginationVariants = cva('mx-auto flex w-full justify-center');
export const paginationListVariants = cva('flex flex-row flex-wrap items-center gap-1');

export const paginationEllipsisVariants = cva(
  'flex items-center justify-center text-muted-foreground',
  {
    variants: {
      size: { xs: 'size-7', sm: 'size-8', md: 'size-9', lg: 'size-10', xl: 'size-11' },
    },
    defaultVariants: { size: 'md' },
  },
);

export const paginationNumberVariants = cva('px-2 tabular-nums', {
  variants: {
    size: { xs: 'min-w-7', sm: 'min-w-8', md: 'min-w-9', lg: 'min-w-10', xl: 'min-w-11' },
  },
  defaultVariants: { size: 'md' },
});

export type HbPaginationSize = NonNullable<VariantProps<typeof paginationEllipsisVariants>['size']>;
