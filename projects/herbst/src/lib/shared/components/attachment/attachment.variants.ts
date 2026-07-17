import { cva, type VariantProps } from 'class-variance-authority';

export const attachmentVariants = cva(
  'relative flex w-full rounded-md border bg-card text-card-foreground transition-colors',
  {
    variants: {
      size: {
        xs: 'gap-1.5 p-1.5',
        sm: 'gap-2 p-2',
        md: 'gap-2 p-2.5',
        lg: 'gap-2 p-3',
        xl: 'gap-2.5 p-3.5',
      },
      orientation: {
        horizontal: 'flex-row items-center',
        vertical: 'flex-col gap-0 overflow-hidden p-0',
      },
      state: {
        idle: 'border-border',
        uploading: 'border-border',
        processing: 'border-border',
        error: 'border-destructive/50 bg-destructive/5',
        done: 'border-border',
      },
    },
    defaultVariants: { size: 'md', orientation: 'horizontal', state: 'done' },
  },
);

export const attachmentBodyVariants = cva('flex min-w-0 flex-1', {
  variants: {
    size: { xs: 'gap-2', sm: 'gap-2.5', md: 'gap-3', lg: 'gap-3', xl: 'gap-4' },
    orientation: { horizontal: 'flex-row items-center', vertical: 'flex-col items-start' },
    clickable: { true: 'cursor-pointer', false: '' },
  },
  defaultVariants: { size: 'md', orientation: 'horizontal', clickable: false },
});

export const attachmentMediaVariants = cva(
  'relative flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground',
  {
    variants: {
      size: {
        xs: 'size-8 [&>ng-icon>svg]:size-4',
        sm: 'size-9 [&>ng-icon>svg]:size-4',
        md: 'size-10 [&>ng-icon>svg]:size-5',
        lg: 'size-12 [&>ng-icon>svg]:size-6',
        xl: 'size-14 [&>ng-icon>svg]:size-7',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const attachmentTitleVariants = cva('truncate text-sm font-medium', {
  variants: {
    state: {
      idle: 'text-foreground',
      uploading: 'text-foreground animate-pulse',
      processing: 'text-foreground animate-pulse',
      error: 'text-destructive',
      done: 'text-foreground',
    },
  },
  defaultVariants: { state: 'done' },
});

export const attachmentDescriptionVariants = cva('truncate font-mono text-xs text-muted-foreground');

export type HbAttachmentSize = NonNullable<VariantProps<typeof attachmentVariants>['size']>;
export type HbAttachmentState = NonNullable<VariantProps<typeof attachmentVariants>['state']>;
export type HbAttachmentOrientation = NonNullable<
  VariantProps<typeof attachmentVariants>['orientation']
>;
