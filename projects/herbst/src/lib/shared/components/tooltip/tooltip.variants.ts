import { cva } from 'class-variance-authority';

export const tooltipContentVariants = cva(
  'pointer-events-none relative z-50 inline-flex w-fit max-w-xs items-center gap-1.5 text-balance rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-md',
);

export const TOOLTIP_ARROW_SIDE: Record<'top' | 'right' | 'bottom' | 'left', string> = {
  top: 'bottom-[-3px] left-1/2 -translate-x-1/2',
  bottom: 'top-[-3px] left-1/2 -translate-x-1/2',
  left: 'right-[-3px] top-1/2 -translate-y-1/2',
  right: 'left-[-3px] top-1/2 -translate-y-1/2',
};

export type HbTooltipSide = 'top' | 'right' | 'bottom' | 'left';
export type HbTooltipAlign = 'start' | 'center' | 'end';
export type HbTooltipTrigger = 'hover' | 'click' | 'manual';
export type HbTooltipDelay = number | { open?: number; close?: number };
