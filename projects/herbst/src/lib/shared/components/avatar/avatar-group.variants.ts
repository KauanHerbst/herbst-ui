import { cva } from 'class-variance-authority';

export const avatarGroupVariants = cva(
  'flex items-center [&>*]:ring-2 [&>*]:ring-background',
  {
    variants: {
      orientation: { horizontal: 'flex-row', vertical: 'flex-col' },
      spacing: { sm: '', md: '', lg: '' },
    },
    compoundVariants: [
      { orientation: 'horizontal', spacing: 'sm', class: '[&>*:not(:first-child)]:-ml-2' },
      { orientation: 'horizontal', spacing: 'md', class: '[&>*:not(:first-child)]:-ml-3' },
      { orientation: 'horizontal', spacing: 'lg', class: '[&>*:not(:first-child)]:-ml-4' },
      { orientation: 'vertical', spacing: 'sm', class: '[&>*:not(:first-child)]:-mt-2' },
      { orientation: 'vertical', spacing: 'md', class: '[&>*:not(:first-child)]:-mt-3' },
      { orientation: 'vertical', spacing: 'lg', class: '[&>*:not(:first-child)]:-mt-4' },
    ],
    defaultVariants: { orientation: 'horizontal', spacing: 'md' },
  },
);

export const avatarGroupChipVariants = cva(
  'relative inline-flex shrink-0 cursor-pointer items-center justify-center bg-muted font-medium text-muted-foreground',
  {
    variants: {
      size: {
        xs: 'size-6 text-[0.625rem]',
        sm: 'size-8 text-xs',
        md: 'size-10 text-sm',
        lg: 'size-14 text-lg',
        xl: 'size-20 text-2xl',
      },
      shape: { circle: 'rounded-full', square: 'rounded-md' },
    },
    defaultVariants: { size: 'md', shape: 'circle' },
  },
);
