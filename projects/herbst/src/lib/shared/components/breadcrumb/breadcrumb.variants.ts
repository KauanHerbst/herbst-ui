import { cva, type VariantProps } from 'class-variance-authority';

export const breadcrumbVariants = cva('text-muted-foreground', {
  variants: {
    size: { xs: 'text-xs', sm: 'text-[0.8125rem]', md: 'text-sm', lg: 'text-base', xl: 'text-lg' },
  },
  defaultVariants: { size: 'md' },
});

export const breadcrumbListVariants = cva('flex items-center gap-1.5 break-words sm:gap-2.5', {
  variants: {
    align: { start: 'justify-start', center: 'justify-center', end: 'justify-end' },
    wrap: { wrap: 'flex-wrap', nowrap: 'flex-nowrap' },
  },
  defaultVariants: { align: 'start', wrap: 'wrap' },
});

export const breadcrumbItemVariants = cva('inline-flex items-center gap-1.5');

export const breadcrumbLinkVariants = cva(
  'inline-flex items-center gap-1.5 transition-colors [&>ng-icon>svg]:size-[1em]',
  {
    variants: {
      current: {
        true: 'font-normal text-foreground',
        false: 'cursor-pointer hover:text-foreground',
      },
    },
    defaultVariants: { current: false },
  },
);

export const breadcrumbSeparatorVariants = cva(
  'inline-flex items-center text-muted-foreground [&>ng-icon>svg]:size-3.5',
);

export const breadcrumbEllipsisVariants = cva(
  'inline-flex items-center justify-center text-muted-foreground [&>ng-icon>svg]:size-4',
);

export type HbBreadcrumbSize = NonNullable<VariantProps<typeof breadcrumbVariants>['size']>;
export type HbBreadcrumbAlign = NonNullable<VariantProps<typeof breadcrumbListVariants>['align']>;
export type HbBreadcrumbWrap = NonNullable<VariantProps<typeof breadcrumbListVariants>['wrap']>;
