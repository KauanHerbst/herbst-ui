import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HB_SIDEBAR_MENU_ITEM, type HbSidebarMenuItemContext } from './sidebar.token';
import { sidebarMenuItemClass } from './sidebar.variants';

@Component({
  selector: 'hb-sidebar-menu-item',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: HB_SIDEBAR_MENU_ITEM, useExisting: forwardRef(() => HbSidebarMenuItemComponent) },
  ],
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'sidebar-menu-item'",
    '[attr.data-state]': 'collapsibleItem() ? (open() ? "open" : "closed") : null',
    role: 'none',
  },
  exportAs: 'hbSidebarMenuItem',
})
export class HbSidebarMenuItemComponent implements HbSidebarMenuItemContext {
  readonly hbCollapsible = input(false, { transform: booleanAttribute });
  readonly hbOpen = model(false);
  readonly hbDefaultOpen = input<boolean | undefined>(undefined);
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  readonly collapsibleItem = this.hbCollapsible;
  readonly open = this.hbOpen.asReadonly();
  readonly disabled = this.hbDisabled;

  protected readonly classes = computed(() => cn(sidebarMenuItemClass, this.class()));

  constructor() {
    afterNextRender(() => {
      const initial = this.hbDefaultOpen();
      if (initial !== undefined) this.hbOpen.set(initial);
    });
  }

  toggle(): void {
    if (this.hbDisabled()) return;
    this.hbOpen.set(!this.hbOpen());
  }
}
