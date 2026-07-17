import { cva, type VariantProps } from 'class-variance-authority';

export const markerVariants = cva(
  'inline-flex items-center gap-2 text-sm text-muted-foreground outline-none ' +
    '[&:where(a,button)]:cursor-pointer [&:where(a,button)]:rounded-sm [&:where(a,button)]:transition-colors ' +
    '[&:where(a,button)]:hover:text-foreground ' +
    '[&:where(a,button)]:focus-visible:ring-2 [&:where(a,button)]:focus-visible:ring-ring [&:where(a,button)]:focus-visible:ring-offset-2 [&:where(a,button)]:focus-visible:ring-offset-background',
  {
    variants: {
      variant: {
        default: '',
        border: 'w-full border-b border-border pb-2',
        separator: 'flex w-full items-center gap-3 text-xs',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export const markerIconVariants = cva(
  'inline-flex shrink-0 items-center justify-center text-current [&_svg]:pointer-events-none [&_svg]:size-4',
);

export const markerContentVariants = cva('min-w-0');

export const markerLineVariants = cva('h-px flex-1 bg-border');

export type HbMarkerVariant = NonNullable<VariantProps<typeof markerVariants>['variant']>;
