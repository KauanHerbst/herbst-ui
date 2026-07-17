export type HbLayoutDirection = 'horizontal' | 'vertical' | 'auto';

export const layoutClass = 'flex min-h-0 w-full';
export const headerClass =
  'flex shrink-0 items-center gap-2 border-b border-border bg-card px-4 text-card-foreground';
export const footerClass =
  'flex shrink-0 items-center gap-2 border-t border-border bg-card px-4 text-sm text-muted-foreground';
export const contentClass = 'flex min-h-0 min-w-0 flex-1 flex-col overflow-auto bg-background p-4';

export const sidebarClass =
  'relative flex shrink-0 flex-col overflow-hidden border-r border-border bg-card text-card-foreground transition-[width] duration-200 ease-out';
export const sidebarBodyClass = 'flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2';
export const sidebarTriggerClass =
  'flex h-10 shrink-0 items-center justify-center border-t border-border text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground';

export const layoutSidebarGroupClass = 'flex flex-col gap-1 py-1';
export const layoutSidebarGroupLabelClass =
  'px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground';
