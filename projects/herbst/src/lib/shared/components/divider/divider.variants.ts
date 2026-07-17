import { cva, type VariantProps } from 'class-variance-authority';

export const dividerVariants = cva('shrink-0 border-border', {
  variants: {
    orientation: {
      horizontal: 'w-full border-t',
      vertical: 'h-full self-stretch border-l',
    },
    variant: { solid: 'border-solid', dashed: 'border-dashed', dotted: 'border-dotted' },
    labeled: { true: 'flex items-center border-0', false: '' },
  },
  compoundVariants: [
    {
      labeled: true,
      orientation: 'horizontal',
      class:
        "w-full before:h-0 before:flex-1 before:border-t before:border-border before:content-[''] after:h-0 after:flex-1 after:border-t after:border-border after:content-['']",
    },
    {
      labeled: true,
      orientation: 'vertical',
      class:
        "min-h-full w-fit flex-col before:w-0 before:flex-1 before:border-l before:border-border before:content-[''] after:w-0 after:flex-1 after:border-l after:border-border after:content-['']",
    },
    { labeled: true, variant: 'dashed', class: 'before:border-dashed after:border-dashed' },
    { labeled: true, variant: 'dotted', class: 'before:border-dotted after:border-dotted' },
  ],
  defaultVariants: { orientation: 'horizontal', variant: 'solid', labeled: false },
});

export type HbDividerOrientation = NonNullable<VariantProps<typeof dividerVariants>['orientation']>;
export type HbDividerVariant = NonNullable<VariantProps<typeof dividerVariants>['variant']>;
