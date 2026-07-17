import { cva } from 'class-variance-authority';

export const orgChartNodeVariants = cva(
  'relative inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-xs transition-colors outline-none',
  {
    variants: {
      selectable: {
        true: 'cursor-pointer hover:bg-accent/50 focus-visible:ring-[3px] focus-visible:ring-ring/50',
        false: '',
      },
      selected: {
        true: 'border-primary bg-primary/10 ring-1 ring-primary',
        false: '',
      },
    },
    defaultVariants: { selectable: false, selected: false },
  },
);
