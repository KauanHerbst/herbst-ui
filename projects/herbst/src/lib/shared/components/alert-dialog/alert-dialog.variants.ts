import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const alertDialogPanelVariants = cva(
  cn(
    'flex max-h-[85vh] w-full flex-col overflow-hidden rounded-xl border border-border',
    'bg-background text-foreground shadow-lg',
  ),
);

export const alertDialogHeaderVariants = cva('flex shrink-0 items-start gap-3 p-6 pb-4');

export const alertDialogTitleVariants = cva('text-lg leading-none font-semibold tracking-tight');

export const alertDialogDescriptionVariants = cva('mt-1.5 text-sm text-muted-foreground');

export const alertDialogBodyVariants = cva('min-h-0 overflow-y-auto px-6 pb-4 text-sm text-foreground');

export const alertDialogFooterVariants = cva(
  'flex shrink-0 flex-col-reverse gap-2 border-t border-border bg-muted px-6 py-4 sm:flex-row',
  {
    variants: {
      align: {
        start: 'sm:justify-start',
        center: 'sm:justify-center',
        end: 'sm:justify-end',
        between: 'sm:justify-between',
      },
    },
    defaultVariants: {
      align: 'end',
    },
  },
);

export type HbAlertDialogOkType = 'default' | 'destructive' | 'warning' | 'success';

export type HbAlertDialogPosition =
  | 'center'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export type HbAlertDialogFooterAlign = NonNullable<
  VariantProps<typeof alertDialogFooterVariants>['align']
>;
