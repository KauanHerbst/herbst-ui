import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const itemVariants = cva(
  cn(
    'group/item flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors duration-100',
    'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
    '[&:where(a,button)]:cursor-pointer [&:where(a,button)]:hover:bg-accent/50',
  ),
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border-border',
        muted: 'bg-muted/50',
      },
      size: {
        xs: 'gap-2 px-3 py-2',
        sm: 'gap-2.5 px-4 py-3',
        md: 'gap-4 p-4',
        lg: 'gap-5 p-5',
        xl: 'gap-6 p-6',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
);

export const itemMediaVariants = cva(
  cn(
    'flex shrink-0 items-center justify-center gap-2 [&_svg]:pointer-events-none',
    'group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start',
  ),
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        icon: "size-8 rounded-sm border border-border bg-muted [&_svg:not([class*='size-'])]:size-4",
        image: 'size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export const itemContentVariants = cva(
  'flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none',
);
export const itemTitleVariants = cva('flex w-fit items-center gap-2 text-sm font-medium leading-snug');
export const itemDescriptionVariants = cva(
  cn(
    'line-clamp-2 text-sm font-normal leading-normal text-balance text-muted-foreground',
    '[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
  ),
);
export const itemActionsVariants = cva('flex items-center gap-2');
export const itemHeaderVariants = cva('flex basis-full items-center justify-between gap-2');
export const itemFooterVariants = cva('flex basis-full items-center justify-between gap-2');
export const itemGroupVariants = cva('group/item-group flex flex-col');
export const itemSeparatorVariants = cva('my-0 h-px w-full shrink-0 bg-border');

export type HbItemVariant = NonNullable<VariantProps<typeof itemVariants>['variant']>;
export type HbItemSize = NonNullable<VariantProps<typeof itemVariants>['size']>;
export type HbItemMediaVariant = NonNullable<VariantProps<typeof itemMediaVariants>['variant']>;
