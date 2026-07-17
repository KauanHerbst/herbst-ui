import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const carouselItemVariants = cva('min-w-0 shrink-0 grow-0 basis-full');

export const carouselNavVariants = cva(
  cn(
    'absolute z-10 inline-flex items-center justify-center rounded-full border border-input bg-background text-foreground shadow-xs transition-colors',
    'hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40 [&_ng-icon]:size-4',
  ),
  {
    variants: {
      size: { xs: 'size-6', sm: 'size-7', md: 'size-8', lg: 'size-9', xl: 'size-10' },
    },
    defaultVariants: { size: 'md' },
  },
);

export const carouselDotVariants = cva('rounded-full transition-colors', {
  variants: {
    size: { xs: 'size-1.5', sm: 'size-2', md: 'size-2.5', lg: 'size-3', xl: 'size-3.5' },
    active: { true: 'bg-primary', false: 'bg-muted-foreground/40 hover:bg-muted-foreground/70' },
  },
  defaultVariants: { size: 'md', active: false },
});

export type HbCarouselSize = NonNullable<VariantProps<typeof carouselNavVariants>['size']>;
