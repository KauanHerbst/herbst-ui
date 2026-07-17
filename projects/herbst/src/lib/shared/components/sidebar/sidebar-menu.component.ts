import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { sidebarMenuClass } from './sidebar.variants';

@Component({
  selector: 'hb-sidebar-menu',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'sidebar-menu'", role: 'menu' },
  exportAs: 'hbSidebarMenu',
})
export class HbSidebarMenuComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(sidebarMenuClass, this.class()));
}
