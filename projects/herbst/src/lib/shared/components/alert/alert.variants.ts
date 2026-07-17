import { cva, type VariantProps } from 'class-variance-authority';

export const alertVariants = cva(
  'relative flex w-full items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm text-card-foreground',
  {
    variants: {
      hbType: {
        default: '',
        success: 'border-l-2 border-l-success',
        warning: 'border-l-2 border-l-warning',
        destructive: 'border-l-2 border-l-destructive',
      },
    },
    defaultVariants: {
      hbType: 'default',
    },
  },
);

export const alertIconVariants = cva('mt-0.5 shrink-0 self-start [&>svg]:size-4', {
  variants: {
    hbType: {
      default: 'text-muted-foreground',
      success: 'text-success',
      warning: 'text-warning',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    hbType: 'default',
  },
});

export const alertTitleVariants = cva('font-medium tracking-tight', {
  variants: {
    hbType: {
      default: 'text-card-foreground',
      success: 'text-success',
      warning: 'text-warning',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    hbType: 'default',
  },
});

export const alertDescriptionVariants = cva('mt-1 text-sm/relaxed text-muted-foreground');

export type HbAlertType = NonNullable<VariantProps<typeof alertVariants>['hbType']>;
