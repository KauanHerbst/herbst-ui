import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { sidebarGroupLabelClass } from './sidebar.variants';

@Component({
  selector: 'hb-sidebar-group-label',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'sidebar-group-label'" },
  exportAs: 'hbSidebarGroupLabel',
})
export class HbSidebarGroupLabelComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(sidebarGroupLabelClass, this.class()));
}
