import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const tableVariants = cva('w-full caption-bottom border-collapse text-foreground', {
  variants: {
    size: {
      xs: 'text-xs [&_th]:h-8 [&_th]:px-2 [&_td]:px-2 [&_td]:py-1.5',
      sm: 'text-xs [&_th]:h-9 [&_th]:px-2 [&_td]:px-2 [&_td]:py-2',
      md: 'text-sm [&_th]:h-10 [&_th]:px-2 [&_td]:px-2 [&_td]:py-2',
      lg: 'text-sm [&_th]:h-11 [&_th]:px-3 [&_td]:px-3 [&_td]:py-3',
      xl: 'text-base [&_th]:h-12 [&_th]:px-4 [&_td]:px-4 [&_td]:py-4',
    },
    gridlines: {
      true: 'border border-border [&_th]:border [&_th]:border-border [&_td]:border [&_td]:border-border',
      false: '',
    },
    striped: {
      true: '[&_tbody_tr:nth-child(even)]:bg-muted/40',
      false: '',
    },
    hoverable: {
      true: '[&_tbody_tr:hover]:bg-muted/50',
      false: '',
    },
  },
  defaultVariants: { size: 'md', gridlines: false, striped: false, hoverable: true },
});

export const tableSelectedRowClass =
  '[&_tbody_tr[data-selected=true]]:bg-accent [&_tbody_tr[data-selected=true]]:hover:bg-accent';

export const tableStickyHeaderClass =
  '[&_thead_th]:bg-background [&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10';

export const tableWrapperVariants = cva('relative w-full rounded-md', {
  variants: {
    scrollable: { true: 'overflow-auto', false: 'overflow-x-auto' },
    bordered: { true: 'border border-border', false: '' },
  },
  defaultVariants: { scrollable: false, bordered: false },
});

export const tableHeadVariants = cva(
  'text-left align-middle font-medium text-muted-foreground whitespace-nowrap [&:has([role=checkbox])]:pr-0',
  {
    variants: {
      sortable: { true: 'cursor-pointer select-none hover:text-foreground', false: '' },
    },
    defaultVariants: { sortable: false },
  },
);

export const tableCellClass = 'align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0';

export const tableRowClass = 'border-b border-border transition-colors';

export const tableRowInteractiveClass =
  'cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset';

export const tableHeaderGroupClass = '[&_tr]:border-b [&_tr]:border-border';
export const tableBodyClass = '[&_tr:last-child]:border-0';
export const tableFooterClass = cn(
  'border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0',
);
export const tableCaptionClass = 'text-muted-foreground mt-4 text-sm';

export type HbTableSize = NonNullable<VariantProps<typeof tableVariants>['size']>;
export type HbTableSelectionMode = 'none' | 'single' | 'multiple';
export type HbTableSortMode = 'single' | 'multiple';
