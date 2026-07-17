import { cva, type VariantProps } from 'class-variance-authority';

export type HbScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';
export type HbScrollAreaType = 'hover' | 'scroll' | 'always' | 'auto';

export const scrollAreaClass = 'relative block overflow-hidden';

export const scrollbarVariants = cva(
  'absolute z-10 flex touch-none select-none opacity-0 transition-opacity duration-150 data-[state=visible]:opacity-100',
  {
    variants: {
      orientation: {
        vertical: 'right-0 top-0 h-full flex-col',
        horizontal: 'bottom-0 left-0 w-full flex-row',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    compoundVariants: [
      { orientation: 'vertical', size: 'sm', class: 'w-1.5 p-px' },
      { orientation: 'vertical', size: 'md', class: 'w-2.5 p-0.5' },
      { orientation: 'vertical', size: 'lg', class: 'w-3.5 p-0.5' },
      { orientation: 'horizontal', size: 'sm', class: 'h-1.5 p-px' },
      { orientation: 'horizontal', size: 'md', class: 'h-2.5 p-0.5' },
      { orientation: 'horizontal', size: 'lg', class: 'h-3.5 p-0.5' },
    ],
    defaultVariants: { orientation: 'vertical', size: 'md' },
  },
);

export const thumbVariants = cva('relative shrink-0 rounded-full transition-colors', {
  variants: {
    variant: {
      default: 'bg-border hover:bg-muted-foreground/50',
      subtle: 'bg-border/60 hover:bg-border',
      solid: 'bg-muted-foreground/60 hover:bg-muted-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
});

export type HbScrollbarVariants = VariantProps<typeof scrollbarVariants>;
export type HbThumbVariants = VariantProps<typeof thumbVariants>;
