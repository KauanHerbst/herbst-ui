import { booleanAttribute, computed, Directive, input } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { menuSubButtonVariants, type HbMenuSubButtonVariants } from './sidebar.variants';

@Directive({
  selector: '[hbSidebarMenuSubButton]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'sidebar-menu-sub-button'",
    '[attr.data-active]': 'hbActive()',
    role: 'menuitem',
  },
  exportAs: 'hbSidebarMenuSubButton',
})
export class HbSidebarMenuSubButtonDirective {
  readonly hbActive = input(false, { transform: booleanAttribute });
  readonly hbSize = input<NonNullable<HbMenuSubButtonVariants['size']>>('md');
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(menuSubButtonVariants({ size: this.hbSize() }), this.class()),
  );
}
