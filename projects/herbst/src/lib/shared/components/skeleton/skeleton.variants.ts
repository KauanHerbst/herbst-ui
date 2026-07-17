import { cva, type VariantProps } from 'class-variance-authority';

export const skeletonVariants = cva('block shrink-0 bg-accent', {
  variants: {
    animation: {
      pulse: 'animate-pulse',
      wave: 'hb-skeleton-wave relative overflow-hidden',
      none: '',
    },
    shape: {
      rectangle: 'w-full rounded-md',
      circle: 'aspect-square rounded-full',
      square: 'aspect-square rounded-md',
      text: 'w-full rounded',
    },
  },
  defaultVariants: { animation: 'pulse', shape: 'rectangle' },
});

export type HbSkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type HbSkeletonShape = NonNullable<VariantProps<typeof skeletonVariants>['shape']>;
export type HbSkeletonAnimation = NonNullable<VariantProps<typeof skeletonVariants>['animation']>;
export type HbSkeletonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type HbSkeletonAvatarShape = 'circle' | 'square' | 'rounded';

export const SKELETON_BOX_SIZE: Record<HbSkeletonSize, string> = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-16',
};

export const SKELETON_TEXT_SIZE: Record<HbSkeletonSize, string> = {
  xs: 'h-2',
  sm: 'h-2.5',
  md: 'h-3.5',
  lg: 'h-4',
  xl: 'h-5',
};

export const SKELETON_CONTROL_HEIGHT: Record<HbSkeletonSize, string> = {
  xs: '1.75rem',
  sm: '2rem',
  md: '2.25rem',
  lg: '2.5rem',
  xl: '2.75rem',
};

export const SKELETON_ROUNDED: Record<HbSkeletonRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};
