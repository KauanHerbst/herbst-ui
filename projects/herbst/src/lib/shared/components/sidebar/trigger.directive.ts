import { Directive, inject, input } from '@angular/core';

import { HB_SIDEBAR, HB_SIDEBAR_LAYOUT, type HbSidebarContext } from './sidebar.token';

@Directive({
  selector: '[hbSidebarTrigger]',
  host: {
    '[attr.data-slot]': "'sidebar-trigger'",
    '[attr.aria-expanded]': 'resolve()?.open() ?? null',
    '(click)': 'onClick($event)',
  },
  exportAs: 'hbSidebarTrigger',
})
export class HbSidebarTriggerDirective {
  readonly target = input<string>();

  private readonly local = inject(HB_SIDEBAR, { optional: true });
  private readonly layout = inject(HB_SIDEBAR_LAYOUT, { optional: true });

  protected resolve(): HbSidebarContext | undefined {
    const id = this.target();
    if (id) return this.layout?.get(id);
    return this.local ?? this.layout?.first();
  }

  protected onClick(event: Event): void {
    const sidebar = this.resolve();
    if (!sidebar) return;
    sidebar.markTrigger();
    sidebar.toggle(event);
  }
}
