import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const kbdVariants = cva(
  cn(
    'pointer-events-none inline-flex w-fit select-none items-center justify-center rounded-sm bg-muted font-mono font-medium text-muted-foreground',
    '[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10',
  ),
  {
    variants: {
      size: {
        xs: "h-4 min-w-4 gap-0.5 px-1 text-[10px] [&_svg:not([class*='size-'])]:size-2.5",
        sm: "h-[1.125rem] min-w-[1.125rem] gap-1 px-1 text-[11px] [&_svg:not([class*='size-'])]:size-3",
        md: "h-5 min-w-5 gap-1 px-1 text-xs [&_svg:not([class*='size-'])]:size-3",
        lg: "h-6 min-w-6 gap-1 px-1.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        xl: "h-7 min-w-7 gap-1.5 rounded-md px-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const kbdGroupVariants = cva('inline-flex items-center gap-1');

export type HbKbdSize = NonNullable<VariantProps<typeof kbdVariants>['size']>;
