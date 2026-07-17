import { cva, type VariantProps } from 'class-variance-authority';

export const blockUiOverlayVariants = cva(
  'flex items-center justify-center gap-3 bg-background/60 backdrop-blur-sm',
  {
    variants: {
      fullScreen: {
        true: 'fixed inset-0 z-50',
        false: 'absolute inset-0 z-10 rounded-[inherit]',
      },
    },
    defaultVariants: { fullScreen: false },
  },
);

export type HbBlockUiFullScreen = NonNullable<
  VariantProps<typeof blockUiOverlayVariants>['fullScreen']
>;
