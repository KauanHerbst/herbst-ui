import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const fieldVariants = cva('group/field flex w-full gap-2 data-[invalid=true]:text-destructive', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal:
        'flex-row items-center [&>[data-slot=field-label]]:flex-auto has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[data-slot=checkbox]]:mt-0.5',
      responsive:
        'flex-col @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>[data-slot=field-label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:items-start',
    },
  },
  defaultVariants: { orientation: 'vertical' },
});

export const fieldLabelVariants = cva(
  cn(
    'flex select-none items-center gap-1 text-sm font-medium leading-none text-foreground',
    'group-data-[invalid=true]/field:text-destructive peer-disabled:opacity-50',
  ),
);

export const fieldTitleVariants = cva('flex items-center gap-1 text-sm font-medium leading-none');
export const fieldDescriptionVariants = cva('text-sm leading-normal text-muted-foreground');
export const fieldErrorVariants = cva('text-sm font-medium text-destructive');
export const fieldContentVariants = cva('flex flex-1 flex-col gap-1.5');

export const fieldGroupVariants = cva('@container/field-group flex w-full flex-col gap-6', {
  variants: {
    columns: {
      1: '',
      2: 'grid grid-cols-1 gap-4 @md/field-group:grid-cols-2',
      3: 'grid grid-cols-1 gap-4 @md/field-group:grid-cols-3',
    },
  },
  defaultVariants: { columns: 1 },
});

export const fieldSetVariants = cva('flex flex-col gap-4');
export const fieldLegendVariants = cva('mb-1 font-medium', {
  variants: { variant: { legend: 'text-base', label: 'text-sm' } },
  defaultVariants: { variant: 'legend' },
});
export const fieldSeparatorVariants = cva('my-1 h-px w-full bg-border');

export type HbFieldOrientation = NonNullable<VariantProps<typeof fieldVariants>['orientation']>;
export type HbFieldColumns = NonNullable<VariantProps<typeof fieldGroupVariants>['columns']>;
export type HbFieldLegendVariant = NonNullable<VariantProps<typeof fieldLegendVariants>['variant']>;
