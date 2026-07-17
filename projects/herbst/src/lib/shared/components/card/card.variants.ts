import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const cardVariants = cva(
  cn(
    'flex w-full flex-col overflow-hidden border border-border bg-card text-card-foreground shadow-xs',
  ),
  {
    variants: {
      size: {
        xs: 'gap-3 py-3 rounded-md',
        sm: 'gap-4 py-4 rounded-md',
        md: 'gap-6 py-6 rounded-lg',
        lg: 'gap-8 py-8 rounded-lg',
        xl: 'gap-10 py-10 rounded-xl',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const cardHeaderVariants = cva(
  'grid auto-rows-min items-start has-[[data-slot=card-action]]:grid-cols-[1fr_auto]',
  {
    variants: {
      size: {
        xs: 'gap-1 px-3',
        sm: 'gap-1.5 px-4',
        md: 'gap-1.5 px-6',
        lg: 'gap-2 px-8',
        xl: 'gap-2 px-10',
      },
      border: { true: 'border-b border-border', false: '' },
    },
    compoundVariants: [
      { border: true, size: 'xs', class: 'pb-3' },
      { border: true, size: 'sm', class: 'pb-4' },
      { border: true, size: 'md', class: 'pb-6' },
      { border: true, size: 'lg', class: 'pb-8' },
      { border: true, size: 'xl', class: 'pb-10' },
    ],
    defaultVariants: { size: 'md', border: false },
  },
);

export const cardContentVariants = cva('', {
  variants: {
    size: { xs: 'px-3', sm: 'px-4', md: 'px-6', lg: 'px-8', xl: 'px-10' },
  },
  defaultVariants: { size: 'md' },
});

export const cardFooterVariants = cva('flex items-center', {
  variants: {
    size: { xs: 'px-3', sm: 'px-4', md: 'px-6', lg: 'px-8', xl: 'px-10' },
    border: { true: 'border-t border-border', false: '' },
  },
  compoundVariants: [
    { border: true, size: 'xs', class: 'pt-3' },
    { border: true, size: 'sm', class: 'pt-4' },
    { border: true, size: 'md', class: 'pt-6' },
    { border: true, size: 'lg', class: 'pt-8' },
    { border: true, size: 'xl', class: 'pt-10' },
  ],
  defaultVariants: { size: 'md', border: false },
});

export const cardTitleVariants = cva('font-semibold leading-none');
export const cardDescriptionVariants = cva('text-sm text-muted-foreground');
export const cardActionVariants = cva(
  'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
);
export const cardImageVariants = cva('block w-full', {
  variants: {
    fit: { cover: 'object-cover', contain: 'object-contain' },
  },
  defaultVariants: { fit: 'cover' },
});

export type HbCardSize = NonNullable<VariantProps<typeof cardVariants>['size']>;
export type HbCardImageFit = NonNullable<VariantProps<typeof cardImageVariants>['fit']>;
