import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { layoutSidebarGroupClass } from './layout.variants';

@Component({
  selector: 'hb-layout-sidebar-group',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'layout-sidebar-group'" },
  exportAs: 'hbLayoutSidebarGroup',
})
export class HbLayoutSidebarGroupComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(layoutSidebarGroupClass, this.class()));
}
