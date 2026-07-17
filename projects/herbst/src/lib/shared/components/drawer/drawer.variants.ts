import { cva, type VariantProps } from 'class-variance-authority';

export const drawerPanelVariants = cva(
  'pointer-events-auto flex h-full w-full flex-col overflow-hidden bg-background text-foreground shadow-lg outline-none',
  {
    variants: {
      side: {
        right: 'border-l border-border rounded-l-xl',
        left: 'border-r border-border rounded-r-xl',
        top: 'border-b border-border rounded-b-xl',
        bottom: 'border-t border-border rounded-t-xl',
      },
      fullScreen: {
        true: 'rounded-none border-0',
        false: '',
      },
    },
    defaultVariants: { side: 'bottom', fullScreen: false },
  },
);

export const drawerHandleVariants = cva('shrink-0 cursor-grab rounded-full bg-muted', {
  variants: {
    side: {
      top: 'mx-auto mt-2 mb-4 h-1.5 w-12',
      bottom: 'mx-auto mt-4 mb-2 h-1.5 w-12',
      left: 'my-auto mr-2 ml-4 h-12 w-1.5',
      right: 'my-auto mr-4 ml-2 h-12 w-1.5',
    },
  },
  defaultVariants: { side: 'bottom' },
});

export const drawerHeaderVariants = cva('flex shrink-0 items-start gap-3 p-6 pb-4');
export const drawerTitleVariants = cva('text-lg leading-none font-semibold tracking-tight');
export const drawerDescriptionVariants = cva('mt-1.5 text-sm text-muted-foreground');
export const drawerBodyVariants = cva(
  'min-h-0 flex-1 overflow-y-auto px-6 pb-4 text-sm text-foreground',
);

export const drawerFooterVariants = cva(
  'flex shrink-0 flex-wrap items-center gap-2 border-t border-border p-6 pt-4',
  {
    variants: {
      align: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
      },
    },
    defaultVariants: { align: 'end' },
  },
);

export type HbDrawerSide = NonNullable<VariantProps<typeof drawerPanelVariants>['side']>;
export type HbDrawerFooterAlign = NonNullable<VariantProps<typeof drawerFooterVariants>['align']>;
export type HbDrawerOkType = 'default' | 'destructive' | 'warning' | 'success';
export type HbDrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto' | 'full';

export const DRAWER_SIZE_REM: Record<Exclude<HbDrawerSize, 'auto' | 'full'>, string> = {
  xs: '16rem',
  sm: '20rem',
  md: '24rem',
  lg: '32rem',
  xl: '42rem',
};
