import { booleanAttribute, computed, Directive, inject, input } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HB_SIDEBAR_MENU_ITEM } from './sidebar.token';
import { menuButtonVariants } from './sidebar.variants';

@Directive({
  selector: '[hbSidebarMenuButton]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'sidebar-menu-button'",
    '[attr.data-active]': 'hbActive()',
    '[attr.aria-disabled]': 'disabled() || null',
    '(click)': 'onClick()',
    role: 'menuitem',
  },
  exportAs: 'hbSidebarMenuButton',
})
export class HbSidebarMenuButtonDirective {
  readonly hbActive = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  private readonly item = inject(HB_SIDEBAR_MENU_ITEM, { optional: true });

  protected readonly disabled = computed(() => !!this.item?.disabled());
  protected readonly classes = computed(() => cn(menuButtonVariants(), this.class()));

  protected onClick(): void {
    if (this.item?.collapsibleItem()) this.item.toggle();
  }
}
