import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const inputGroupVariants = cva(
  cn(
    'group/input-group relative flex w-full flex-wrap items-center rounded-md border border-input bg-background shadow-xs',
    'outline-none transition-[color,box-shadow]',
    'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
    'has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-destructive/20',
    'has-[:disabled]:opacity-50',
    '[&_[data-slot=input]]:min-w-0 [&_[data-slot=input]]:flex-1 [&_[data-slot=input]]:border-0',
    '[&_[data-slot=input]]:bg-transparent [&_[data-slot=input]]:shadow-none',
    '[&_[data-slot=input]]:outline-none [&_[data-slot=input]]:focus-visible:ring-0',
  ),
);

export const inputGroupAddonVariants = cva(
  'flex shrink-0 items-center gap-2 text-sm text-muted-foreground [&>ng-icon>svg]:size-4',
  {
    variants: {
      align: {
        'inline-start': 'order-first pl-3',
        'inline-end': 'order-last pr-3',
        'block-start': 'order-first w-full px-3 pt-2',
        'block-end': 'order-last w-full px-3 pb-2',
      },
    },
    defaultVariants: { align: 'inline-start' },
  },
);

export const inputGroupTextVariants = cva('text-sm text-muted-foreground');

export type HbInputGroupAlign = NonNullable<VariantProps<typeof inputGroupAddonVariants>['align']>;
