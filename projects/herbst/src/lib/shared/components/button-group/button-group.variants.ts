import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const buttonGroupVariants = cva(
  cn(
    'flex w-fit items-stretch',
    '[&>*]:relative [&>*:focus-within]:z-10 [&>*:hover]:z-10',
    'has-[>[data-slot=button-group]]:gap-2',
  ),
  {
    variants: {
      orientation: {
        horizontal: cn(
          'flex-row',
          '[&>*:not([data-slot=button-group]):not(:first-child)]:-ml-px',
          '[&>*:not([data-slot=button-group]):not(:first-child)]:rounded-l-none',
          '[&>*:not([data-slot=button-group]):not(:last-child)]:rounded-r-none',
          '[&>hb-select:not(:first-child)>button]:rounded-l-none',
          '[&>hb-select:not(:last-child)>button]:rounded-r-none',
          '[&>hb-combobox:not(:first-child)>div]:rounded-l-none',
          '[&>hb-combobox:not(:last-child)>div]:rounded-r-none',
        ),
        vertical: cn(
          'flex-col',
          '[&>*:not([data-slot=button-group]):not(:first-child)]:-mt-px',
          '[&>*:not([data-slot=button-group]):not(:first-child)]:rounded-t-none',
          '[&>*:not([data-slot=button-group]):not(:last-child)]:rounded-b-none',
          '[&>hb-select:not(:first-child)>button]:rounded-t-none',
          '[&>hb-select:not(:last-child)>button]:rounded-b-none',
          '[&>hb-combobox:not(:first-child)>div]:rounded-t-none',
          '[&>hb-combobox:not(:last-child)>div]:rounded-b-none',
        ),
      },
    },
    defaultVariants: { orientation: 'horizontal' },
  },
);

export const buttonGroupSeparatorVariants = cva('shrink-0 self-stretch bg-border', {
  variants: {
    orientation: {
      vertical: 'w-px',
      horizontal: 'h-px w-full',
    },
  },
  defaultVariants: { orientation: 'vertical' },
});

export const buttonGroupTextVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-input',
    'bg-muted px-3 text-sm font-medium text-muted-foreground [&>ng-icon>svg]:size-4',
  ),
);

export type HbButtonGroupSeparatorOrientation = NonNullable<
  VariantProps<typeof buttonGroupSeparatorVariants>['orientation']
>;
