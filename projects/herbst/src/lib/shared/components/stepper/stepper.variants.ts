import { cva, type VariantProps } from 'class-variance-authority';

export const stepperClass = 'flex w-full';

export const stepListClass = 'flex';

export const stepMarkerVariants = cva(
  'flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors',
  {
    variants: {
      state: {
        inactive: 'border-border bg-background text-muted-foreground',
        active: 'border-primary bg-primary text-primary-foreground',
        completed: 'border-primary bg-primary text-primary-foreground',
      },
    },
    defaultVariants: { state: 'inactive' },
  },
);

export const connectorVariants = cva('shrink-0 rounded-full bg-border transition-colors', {
  variants: {
    orientation: {
      horizontal: 'h-0.5 flex-1',
      vertical: 'w-0.5 flex-1',
    },
    completed: {
      true: 'bg-primary',
      false: '',
    },
  },
  defaultVariants: { orientation: 'horizontal', completed: false },
});

export type HbStepMarkerVariants = VariantProps<typeof stepMarkerVariants>;
export type HbConnectorVariants = VariantProps<typeof connectorVariants>;
