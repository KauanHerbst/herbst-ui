import { cva, type VariantProps } from 'class-variance-authority';

export const sheetPanelVariants = cva(
  'flex h-full w-full flex-col overflow-hidden bg-background text-foreground shadow-lg outline-none',
  {
    variants: {
      side: {
        right: 'border-l border-border',
        left: 'border-r border-border',
        top: 'border-b border-border',
        bottom: 'border-t border-border',
      },
    },
    defaultVariants: { side: 'right' },
  },
);

export const sheetHeaderVariants = cva('flex shrink-0 items-start gap-3 p-6 pb-4');
export const sheetTitleVariants = cva('text-lg leading-none font-semibold tracking-tight');
export const sheetDescriptionVariants = cva('mt-1.5 text-sm text-muted-foreground');
export const sheetBodyVariants = cva('min-h-0 flex-1 overflow-y-auto px-6 pb-4 text-sm text-foreground');

export const sheetFooterVariants = cva(
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

export type HbSheetSide = NonNullable<VariantProps<typeof sheetPanelVariants>['side']>;
export type HbSheetFooterAlign = NonNullable<VariantProps<typeof sheetFooterVariants>['align']>;
export type HbSheetOkType = 'default' | 'destructive' | 'warning' | 'success';
