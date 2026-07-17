import { cva } from 'class-variance-authority';

import { cn } from '../../utils';

export const codeBlockVariants = cva(
  cn(
    'group/code relative block overflow-hidden rounded-md border border-border bg-card',
    'font-mono text-[0.8125rem] text-foreground shadow-xs',
  ),
);

export const codeBlockHeaderVariants = cva(
  cn(
    'flex h-9 items-center gap-2 border-b border-border bg-muted/40 pr-1.5 pl-3',
    'font-mono text-[0.6875rem] tracking-[0.06em] text-muted-foreground uppercase',
  ),
);

export type HbCodeLanguage =
  | 'ts'
  | 'angular-ts'
  | 'angular-html'
  | 'typescript'
  | 'javascript'
  | 'js'
  | 'html'
  | 'css'
  | 'scss'
  | 'json'
  | 'bash'
  | 'shell'
  | 'markdown'
  | 'yaml'
  | 'text'
  | (string & {});
