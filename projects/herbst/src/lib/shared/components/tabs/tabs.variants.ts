import { cva, type VariantProps } from 'class-variance-authority';

export type HbTabsPosition = 'top' | 'bottom' | 'left' | 'right';
export type HbTabsVariant = 'line' | 'pills' | 'underline';
export type HbTabsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type HbTabsAlign = 'start' | 'center' | 'end' | 'stretch';
export type HbTabsActivationMode = 'automatic' | 'manual';
export type HbTabsOrientation = 'horizontal' | 'vertical';

export const tabsRootVariants = cva('flex', {
  variants: {
    position: {
      top: 'flex-col',
      bottom: 'flex-col-reverse',
      left: 'flex-row',
      right: 'flex-row-reverse',
    },
  },
  defaultVariants: { position: 'top' },
});

export const tabListVariants = cva('relative flex', {
  variants: {
    orientation: { horizontal: 'flex-row items-stretch', vertical: 'flex-col items-stretch' },
    variant: {
      line: '',
      pills: 'gap-1 rounded-lg bg-muted p-1',
      underline: '',
    },
    align: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      stretch: '[&>[role=tab]]:flex-1',
    },
  },
  defaultVariants: { orientation: 'horizontal', variant: 'line', align: 'start' },
});

export const tabTriggerVariants = cva(
  'relative z-10 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 text-muted-foreground data-[state=active]:text-foreground [&_ng-icon]:shrink-0',
  {
    variants: {
      size: {
        xs: 'h-7 gap-1.5 px-2 text-xs [&_ng-icon]:text-sm',
        sm: 'h-8 px-2.5 text-xs [&_ng-icon]:text-base',
        md: 'h-9 px-3 text-sm [&_ng-icon]:text-lg',
        lg: 'h-10 px-4 text-sm [&_ng-icon]:text-xl',
        xl: 'h-11 px-5 text-base [&_ng-icon]:text-2xl',
      },
      variant: {
        line: 'rounded-md',
        pills: 'rounded-md',
        underline: '',
      },
    },
    defaultVariants: { size: 'md', variant: 'line' },
  },
);

export type HbTabsSizeVar = NonNullable<VariantProps<typeof tabTriggerVariants>['size']>;
