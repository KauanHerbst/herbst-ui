import { cva } from 'class-variance-authority';

import { cn } from '../../utils';

export const popoverContentVariants = cva(
  cn(
    'z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none',
    'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  ),
);

export const popoverHeaderVariants = cva('flex flex-col gap-1 text-sm');
export const popoverTitleVariants = cva('font-medium');
export const popoverDescriptionVariants = cva('text-sm text-muted-foreground');
