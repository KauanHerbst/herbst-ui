import { booleanAttribute, computed, Directive, input } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { menuActionClass, menuActionHoverClass } from './sidebar.variants';

@Directive({
  selector: '[hbSidebarMenuAction]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'sidebar-menu-action'",
  },
  exportAs: 'hbSidebarMenuAction',
})
export class HbSidebarMenuActionDirective {
  readonly hbShowOnHover = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(menuActionClass, this.hbShowOnHover() && menuActionHoverClass, this.class()),
  );
}
