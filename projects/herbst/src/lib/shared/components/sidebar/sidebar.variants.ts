import { cva, type VariantProps } from 'class-variance-authority';

export const sidebarLayoutClass = 'relative flex w-full overflow-hidden';

export const sidebarInnerClass =
  'flex h-full w-full flex-col overflow-hidden bg-card text-card-foreground';

export const sidebarHeaderClass = 'flex flex-col gap-2 p-2';
export const sidebarContentClass = 'flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2';
export const sidebarFooterClass = 'flex flex-col gap-2 p-2';
export const sidebarSpacerClass = 'flex-1';

export const sidebarGroupClass = 'relative flex w-full flex-col p-2';
export const sidebarGroupLabelClass =
  'flex h-8 shrink-0 items-center px-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground group-data-[collapsed]/sb:hidden';
export const sidebarGroupContentClass = 'w-full text-sm';
export const sidebarGroupActionClass =
  'absolute right-3 top-3.5 flex size-5 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground group-data-[collapsed]/sb:hidden';

export const sidebarMenuClass = 'flex w-full flex-col gap-1';
export const sidebarMenuItemClass = 'group/menu-item relative';
export const sidebarMenuSubClass =
  'ml-3.5 flex flex-col gap-1 border-l border-border px-2.5 py-0.5 group-data-[collapsed]/sb:hidden';

export const menuButtonVariants = cva(
  'flex w-full items-center gap-2 overflow-hidden rounded-md px-2 text-left outline-none ring-ring transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-accent data-[active=true]:font-medium data-[active=true]:text-accent-foreground [&>ng-icon]:shrink-0 group-data-[collapsed]/sb:justify-center group-data-[collapsed]/sb:px-0 group-data-[collapsed]/sb:[&>span]:hidden',
  {
    variants: {
      size: {
        sm: 'h-7 text-xs',
        md: 'h-8 text-sm',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const menuSubButtonVariants = cva(
  'flex w-full items-center gap-2 overflow-hidden rounded-md px-2 text-left text-muted-foreground outline-none ring-ring transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-accent data-[active=true]:font-medium data-[active=true]:text-accent-foreground',
  {
    variants: {
      size: {
        sm: 'h-6 text-xs',
        md: 'h-7 text-sm',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const menuActionClass =
  'absolute right-1.5 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground group-data-[collapsed]/sb:hidden';

export const menuActionHoverClass =
  'opacity-0 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100';

export const sidebarBackdropClass = 'absolute inset-0 z-20 bg-black/50';
export const sidebarRailClass =
  'absolute inset-y-0 z-30 hidden w-4 -translate-x-1/2 cursor-col-resize sm:flex';

export type HbMenuButtonVariants = VariantProps<typeof menuButtonVariants>;
export type HbMenuSubButtonVariants = VariantProps<typeof menuSubButtonVariants>;
