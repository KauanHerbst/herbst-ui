export type HbPanelToggler = 'icon' | 'header';
export type HbPanelIconPos = 'start' | 'end';

export const panelClass =
  'flex flex-col overflow-hidden rounded-md border border-border bg-card text-card-foreground';
export const panelHeaderClass = 'flex items-center gap-2 px-4 py-3 text-sm font-medium';
export const panelContentClass = 'px-4 py-3 text-sm';
export const panelFooterClass = 'border-t border-border px-4 py-3 text-sm text-muted-foreground';
