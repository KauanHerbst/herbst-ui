import { cva, type VariantProps } from 'class-variance-authority';

export const bubbleVariants = cva(
  'relative w-fit max-w-[min(32rem,85%)] rounded-xl px-3.5 py-2 text-sm leading-relaxed break-words',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        muted: 'bg-muted/60 text-muted-foreground',
        tinted: 'bg-primary/10 text-foreground',
        outline: 'border border-border bg-background text-foreground',
        ghost: 'bg-transparent px-0 py-0 text-foreground',
        destructive: 'border border-destructive/30 bg-destructive/10 text-destructive',
      },
      align: {
        start: 'rounded-bl-sm',
        end: 'rounded-br-sm',
      },
    },
    compoundVariants: [
      { variant: 'ghost', align: 'start', class: 'rounded-none' },
      { variant: 'ghost', align: 'end', class: 'rounded-none' },
    ],
    defaultVariants: { variant: 'secondary', align: 'start' },
  },
);

export type HbBubbleVariant = NonNullable<VariantProps<typeof bubbleVariants>['variant']>;
export type HbBubbleAlign = NonNullable<VariantProps<typeof bubbleVariants>['align']>;

export interface HbBubbleReaction {
  emoji: string;
  count?: number;
  reacted?: boolean;
}
