import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { sidebarGroupClass } from './sidebar.variants';

@Component({
  selector: 'hb-sidebar-group',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'sidebar-group'" },
  exportAs: 'hbSidebarGroup',
})
export class HbSidebarGroupComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(sidebarGroupClass, this.class()));
}
