import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { layoutSidebarGroupLabelClass } from './layout.variants';

@Component({
  selector: 'hb-layout-sidebar-group-label',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'layout-sidebar-group-label'" },
  exportAs: 'hbLayoutSidebarGroupLabel',
})
export class HbLayoutSidebarGroupLabelComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(layoutSidebarGroupLabelClass, this.class()));
}
