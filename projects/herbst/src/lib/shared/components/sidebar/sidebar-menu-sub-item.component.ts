import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';

@Component({
  selector: 'hb-sidebar-menu-sub-item',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'sidebar-menu-sub-item'",
    role: 'none',
  },
  exportAs: 'hbSidebarMenuSubItem',
})
export class HbSidebarMenuSubItemComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn('relative', this.class()));
}
