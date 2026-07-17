import { cva } from 'class-variance-authority';

import { cn } from '../../utils';

export const calendarVariants = cva(
  'inline-flex w-fit gap-3 rounded-lg border border-border bg-card p-3 text-card-foreground',
);

export const calendarDayVariants = cva(
  cn(
    'relative inline-flex size-9 items-center justify-center rounded-md text-sm font-normal',
    'outline-none transition-colors',
    'hover:bg-accent hover:text-accent-foreground',
    'focus-visible:ring-[3px] focus-visible:ring-ring/50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-40',
  ),
  {
    variants: {
      selected: {
        true: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
        false: '',
      },
      today: { true: 'ring-1 ring-ring', false: '' },
      outside: { true: 'text-muted-foreground opacity-50', false: '' },
      inRange: { true: 'rounded-none bg-accent text-accent-foreground hover:bg-accent', false: '' },
    },
    defaultVariants: { selected: false, today: false, outside: false, inRange: false },
  },
);

export const calendarSelectVariants = cva(
  cn(
    'h-7 cursor-pointer rounded-md border border-input bg-background px-2 text-sm outline-none',
    'focus-visible:ring-[3px] focus-visible:ring-ring/50',
  ),
);

export const calendarWeekdayVariants = cva(
  'inline-flex size-9 items-center justify-center text-[0.8rem] font-normal text-muted-foreground',
);

export type HbCalendarMode = 'single' | 'range' | 'multiple';
