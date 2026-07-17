import { cva, type VariantProps } from 'class-variance-authority';

export const toggleVariants = cva(
  'inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted hover:text-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_ng-icon]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-transparent shadow-xs hover:bg-accent',
      },
      size: {
        xs: 'h-7 min-w-7 gap-1.5 px-1.5 text-xs [&_ng-icon]:text-sm',
        sm: 'h-8 min-w-8 px-2 text-xs [&_ng-icon]:text-base',
        md: 'h-9 min-w-9 px-2.5 text-sm [&_ng-icon]:text-lg',
        lg: 'h-10 min-w-10 px-3 text-sm [&_ng-icon]:text-xl',
        xl: 'h-11 min-w-11 px-4 text-base [&_ng-icon]:text-2xl',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
);

export type HbToggleVariant = NonNullable<VariantProps<typeof toggleVariants>['variant']>;
export type HbToggleSize = NonNullable<VariantProps<typeof toggleVariants>['size']>;
export type HbToggleGroupType = 'single' | 'multiple';

export const toggleGroupConnectedClass =
  '[&>[data-slot=toggle]]:rounded-none [&>[data-slot=toggle]:first-child]:rounded-l-md [&>[data-slot=toggle]:last-child]:rounded-r-md [&>[data-slot=toggle]]:focus-visible:z-10';

export const toggleGroupConnectedOutlineClass =
  '[&>[data-slot=toggle]:not(:first-child)]:-ml-px';
