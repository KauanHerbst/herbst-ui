import { cva, type VariantProps } from 'class-variance-authority';

export const resizableGroupVariants = cva('flex', {
  variants: {
    orientation: { horizontal: 'w-full flex-row', vertical: 'h-full flex-col' },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export const resizableHandleVariants = cva(
  'relative flex shrink-0 items-center justify-center bg-border outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
  {
    variants: {
      orientation: {
        horizontal:
          'w-px cursor-col-resize after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2',
        vertical:
          'h-px w-full cursor-row-resize after:absolute after:inset-x-0 after:top-1/2 after:h-1 after:-translate-y-1/2',
      },
      disabled: { true: 'cursor-default opacity-50', false: '' },
    },
    defaultVariants: { orientation: 'horizontal', disabled: false },
  },
);

export const resizableGripVariants = cva(
  'z-10 flex items-center justify-center rounded-xs border bg-border text-muted-foreground [&_ng-icon]:text-[0.625rem]',
  {
    variants: {
      orientation: { horizontal: 'h-4 w-3', vertical: 'h-3 w-4 [&_ng-icon]:rotate-90' },
    },
    defaultVariants: { orientation: 'horizontal' },
  },
);

export const resizablePanelVariants = cva('relative overflow-hidden');

export type HbResizableOrientation = NonNullable<
  VariantProps<typeof resizableGroupVariants>['orientation']
>;
