import { cva, type VariantProps } from 'class-variance-authority';

export type HbTimelineLayout = 'vertical' | 'horizontal';
export type HbTimelineAlign = 'left' | 'right' | 'top' | 'bottom' | 'alternate';

export const timelineMarkerVariants = cva(
  'flex shrink-0 items-center justify-center rounded-full [&_ng-icon]:text-current',
  {
    variants: {
      color: {
        default: '',
        primary: '',
        success: '',
        warning: '',
        destructive: '',
        muted: '',
      },
      variant: {
        solid: '',
        soft: '',
        outline: 'border-2 bg-background',
      },
    },
    compoundVariants: [
      { variant: 'solid', color: 'default', class: 'bg-foreground text-background' },
      { variant: 'solid', color: 'primary', class: 'bg-primary text-primary-foreground' },
      { variant: 'solid', color: 'success', class: 'bg-success text-success-foreground' },
      { variant: 'solid', color: 'warning', class: 'bg-warning text-warning-foreground' },
      { variant: 'solid', color: 'destructive', class: 'bg-destructive text-destructive-foreground' },
      { variant: 'solid', color: 'muted', class: 'bg-muted text-muted-foreground' },
      { variant: 'soft', color: 'default', class: 'bg-muted text-foreground' },
      { variant: 'soft', color: 'primary', class: 'bg-primary/15 text-primary' },
      { variant: 'soft', color: 'success', class: 'bg-success/15 text-success' },
      { variant: 'soft', color: 'warning', class: 'bg-warning/15 text-warning' },
      { variant: 'soft', color: 'destructive', class: 'bg-destructive/15 text-destructive' },
      { variant: 'soft', color: 'muted', class: 'bg-muted text-muted-foreground' },
      { variant: 'outline', color: 'default', class: 'border-foreground text-foreground' },
      { variant: 'outline', color: 'primary', class: 'border-primary text-primary' },
      { variant: 'outline', color: 'success', class: 'border-success text-success' },
      { variant: 'outline', color: 'warning', class: 'border-warning text-warning' },
      { variant: 'outline', color: 'destructive', class: 'border-destructive text-destructive' },
      { variant: 'outline', color: 'muted', class: 'border-muted-foreground text-muted-foreground' },
    ],
    defaultVariants: { color: 'primary', variant: 'solid' },
  },
);

export type HbTimelineColor = NonNullable<VariantProps<typeof timelineMarkerVariants>['color']>;
export type HbTimelineMarkerVariant = NonNullable<VariantProps<typeof timelineMarkerVariants>['variant']>;
