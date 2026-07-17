import { cva } from 'class-variance-authority';

export const treeRowVariants = cva(
  'group/row flex h-8 w-full items-center gap-1.5 rounded-md pr-2 text-sm outline-none transition-colors select-none focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
  {
    variants: {
      selectable: {
        true: 'cursor-pointer hover:bg-accent/50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
        false: '',
      },
    },
    defaultVariants: { selectable: true },
  },
);

export const treeToggleClass =
  'inline-flex size-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-transform hover:bg-muted hover:text-foreground data-[expanded=true]:rotate-90';
