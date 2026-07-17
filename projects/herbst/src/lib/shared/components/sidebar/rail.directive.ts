import { computed, Directive, inject, input } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HB_SIDEBAR } from './sidebar.token';
import { sidebarRailClass } from './sidebar.variants';

@Directive({
  selector: '[hbSidebarRail]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'sidebar-rail'",
    'aria-label': 'Toggle Sidebar',
    tabindex: '-1',
    '(click)': 'onClick($event)',
  },
  exportAs: 'hbSidebarRail',
})
export class HbSidebarRailDirective {
  readonly class = input<ClassValue>('');

  private readonly sidebar = inject(HB_SIDEBAR, { optional: true });

  protected readonly classes = computed(() =>
    cn(sidebarRailClass, this.sidebar?.side() === 'right' ? 'left-0' : 'right-0', this.class()),
  );

  protected onClick(event: Event): void {
    this.sidebar?.markTrigger();
    this.sidebar?.toggle(event);
  }
}
