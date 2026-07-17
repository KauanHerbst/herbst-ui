import { cva, type VariantProps } from 'class-variance-authority';

export const attachmentGroupVariants = cva('flex gap-3', {
  variants: {
    orientation: {
      horizontal:
        'hb-scrollbar-none flex-row overflow-x-auto [&>*]:w-64 [&>*]:shrink-0',
      vertical: 'flex-col',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

export type HbAttachmentGroupOrientation = NonNullable<
  VariantProps<typeof attachmentGroupVariants>['orientation']
>;
