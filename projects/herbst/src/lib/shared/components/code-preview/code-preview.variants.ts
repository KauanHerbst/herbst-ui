import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const codePreviewVariants = cva(
  cn('block overflow-hidden rounded-md border border-border bg-card shadow-xs'),
);

export const codePreviewSurfaceVariants = cva(
  cn('flex min-h-[9rem] flex-wrap items-center gap-4 p-6'),
  {
    variants: {
      align: {
        center: 'justify-center',
        start: 'justify-start',
      },
    },
    defaultVariants: { align: 'center' },
  },
);

export const codePreviewToolbarVariants = cva(
  cn('flex items-center justify-between gap-2 border-t border-border bg-muted/40 px-2 py-1'),
);

export type HbCodePreviewAlign = NonNullable<
  VariantProps<typeof codePreviewSurfaceVariants>['align']
>;
