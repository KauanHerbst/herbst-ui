import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const accordionVariants = cva('block w-full', {
  variants: {
    bordered: {
      none: '',
      divider: '',
      card: 'rounded-lg border border-border overflow-hidden',
    },
  },
  defaultVariants: {
    bordered: 'divider',
  },
});

export const accordionItemVariants = cva(
  'block border-l-2 border-l-transparent pl-3 data-[state=open]:border-l-primary',
  {
    variants: {
      bordered: {
        none: '',
        divider: 'border-b border-border last:border-b-0',
        card: 'border-b border-border last:border-b-0 pr-4',
      },
    },
    defaultVariants: {
      bordered: 'divider',
    },
  },
);

export const accordionTriggerVariants = cva(
  cn(
    'flex w-full flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium',
    'text-foreground/85 outline-none transition-colors cursor-pointer rounded-md',
    'hover:text-foreground',
    'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&>ng-icon]:size-4 [&>ng-icon]:shrink-0 [&>ng-icon]:text-muted-foreground',
    'hover:[&>ng-icon]:text-foreground [&>ng-icon]:transition-transform [&>ng-icon]:duration-200',
  ),
);

export const accordionContentVariants = cva(
  cn(
    'grid text-sm text-muted-foreground transition-all duration-200',
    'data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]',
    'data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
  ),
);

export type HbAccordionBordered = NonNullable<
  VariantProps<typeof accordionVariants>['bordered']
>;
