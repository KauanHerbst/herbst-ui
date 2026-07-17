import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const commandVariants = cva(
  cn(
    'flex w-full flex-col overflow-hidden rounded-md border border-border bg-popover text-popover-foreground',
  ),
);

export const commandInputVariants = cva(
  cn(
    'flex w-full bg-transparent outline-none placeholder:text-muted-foreground',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ),
  {
    variants: {
      size: { xs: 'h-8 text-xs', sm: 'h-9 text-sm', md: 'h-10 text-sm', lg: 'h-11 text-base', xl: 'h-12 text-base' },
    },
    defaultVariants: { size: 'md' },
  },
);

export const commandItemVariants = cva(
  cn(
    'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 outline-none',
    'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground',
    'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
    '[&_ng-icon]:size-4 [&_ng-icon]:shrink-0 [&_ng-icon]:text-muted-foreground',
  ),
  {
    variants: {
      size: { xs: 'py-1 text-xs', sm: 'py-1.5 text-sm', md: 'py-1.5 text-sm', lg: 'py-2 text-base', xl: 'py-2.5 text-base' },
    },
    defaultVariants: { size: 'md' },
  },
);

export const commandGroupHeadingVariants = cva(
  'px-2 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground',
);
export const commandSeparatorVariants = cva('-mx-1 my-1 h-px bg-border');
export const commandShortcutVariants = cva('ml-auto font-mono text-xs tracking-widest text-muted-foreground');
export const commandEmptyVariants = cva('py-6 text-center text-sm text-muted-foreground');
export const commandFooterVariants = cva(
  'flex items-center gap-2 border-t border-border px-3 py-2 text-xs text-muted-foreground',
);

export type HbCommandSize = NonNullable<VariantProps<typeof commandInputVariants>['size']>;
