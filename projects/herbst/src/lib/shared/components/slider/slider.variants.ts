import { cva, type VariantProps } from 'class-variance-authority';

export const sliderRootVariants = cva(
  'relative flex touch-none select-none items-center data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
  {
    variants: {
      orientation: {
        horizontal: 'w-full flex-col',
        vertical: 'h-full min-h-44 w-auto flex-row',
      },
    },
    defaultVariants: { orientation: 'horizontal' },
  },
);

export const sliderTrackVariants = cva(
  'bg-muted relative grow overflow-hidden rounded-full',
  {
    variants: {
      orientation: { horizontal: 'w-full', vertical: 'h-full' },
      size: { xs: '', sm: '', md: '', lg: '', xl: '' },
    },
    compoundVariants: [
      { orientation: 'horizontal', size: 'xs', class: 'h-0.5' },
      { orientation: 'horizontal', size: 'sm', class: 'h-1' },
      { orientation: 'horizontal', size: 'md', class: 'h-1.5' },
      { orientation: 'horizontal', size: 'lg', class: 'h-2' },
      { orientation: 'horizontal', size: 'xl', class: 'h-2.5' },
      { orientation: 'vertical', size: 'xs', class: 'w-0.5' },
      { orientation: 'vertical', size: 'sm', class: 'w-1' },
      { orientation: 'vertical', size: 'md', class: 'w-1.5' },
      { orientation: 'vertical', size: 'lg', class: 'w-2' },
      { orientation: 'vertical', size: 'xl', class: 'w-2.5' },
    ],
    defaultVariants: { orientation: 'horizontal', size: 'md' },
  },
);

export const sliderRangeVariants = cva('bg-primary absolute', {
  variants: {
    orientation: { horizontal: 'h-full', vertical: 'w-full' },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export const sliderThumbVariants = cva(
  'border-primary bg-background ring-ring/50 absolute block shrink-0 cursor-grab rounded-full border-2 shadow-md outline-none transition-[box-shadow] hover:ring-4 focus-visible:ring-4 active:cursor-grabbing data-[disabled=true]:pointer-events-none',
  {
    variants: {
      size: {
        xs: 'size-3',
        sm: 'size-3.5',
        md: 'size-4',
        lg: 'size-5',
        xl: 'size-6',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type HbSliderSize = NonNullable<VariantProps<typeof sliderThumbVariants>['size']>;
export type HbSliderOrientation = NonNullable<VariantProps<typeof sliderRootVariants>['orientation']>;

export interface HbSliderMark {
  value: number;
  label?: string;
}
