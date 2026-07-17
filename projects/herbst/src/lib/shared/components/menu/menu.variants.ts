import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const menuVariants = cva(
  cn(
    'z-50 min-w-[8rem] max-h-[var(--cdk-menu-max-height,20rem)] overflow-y-auto overflow-x-hidden',
    'rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none',
  ),
);

export const menuItemVariants = cva(
  cn(
    'relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
    'focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    '[&_ng-icon]:size-4 [&_ng-icon]:shrink-0',
  ),
  {
    variants: {
      variant: {
        default: '',
        destructive:
          'text-destructive focus:bg-destructive/10 focus:text-destructive hover:bg-destructive/10 hover:text-destructive [&_ng-icon]:text-destructive',
        success:
          'text-success focus:bg-success/10 focus:text-success hover:bg-success/10 hover:text-success [&_ng-icon]:text-success',
        warning:
          'text-warning focus:bg-warning/10 focus:text-warning hover:bg-warning/10 hover:text-warning [&_ng-icon]:text-warning',
      },
      inset: { true: 'pl-8', false: '' },
    },
    defaultVariants: { variant: 'default', inset: false },
  },
);

export const menuLabelVariants = cva(
  'px-2 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground',
  {
    variants: { inset: { true: 'pl-8', false: '' } },
    defaultVariants: { inset: false },
  },
);
export const menuSeparatorVariants = cva('-mx-1 my-1 h-px bg-border');
export const menuShortcutVariants = cva('ml-auto font-mono text-xs tracking-widest text-muted-foreground');
export const menuIndicatorVariants = cva(
  'pointer-events-none absolute left-2 flex size-4 items-center justify-center [&_ng-icon]:size-4',
);

export type HbMenuItemVariant = NonNullable<VariantProps<typeof menuItemVariants>['variant']>;
