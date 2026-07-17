import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { sidebarGroupContentClass } from './sidebar.variants';

@Component({
  selector: 'hb-sidebar-group-content',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'sidebar-group-content'" },
  exportAs: 'hbSidebarGroupContent',
})
export class HbSidebarGroupContentComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(sidebarGroupContentClass, this.class()));
}
