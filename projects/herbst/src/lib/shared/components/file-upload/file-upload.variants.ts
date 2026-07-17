import { cva, type VariantProps } from 'class-variance-authority';

export const fileUploadClass = 'flex flex-col gap-4 text-sm';

export const dropzoneVariants = cva(
  'flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors',
  {
    variants: {
      dragover: {
        true: 'border-primary bg-primary/5',
        false: 'border-border',
      },
      disabled: {
        true: 'pointer-events-none opacity-60',
        false: '',
      },
    },
    defaultVariants: { dragover: false, disabled: false },
  },
);

export const uploadItemClass =
  'flex items-center gap-3 rounded-md border border-border p-2 data-[status=error]:border-destructive/50';

export type HbDropzoneVariants = VariantProps<typeof dropzoneVariants>;
