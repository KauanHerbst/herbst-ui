import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { sidebarContentClass } from './sidebar.variants';

@Component({
  selector: 'hb-sidebar-content',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'sidebar-content'" },
  exportAs: 'hbSidebarContent',
})
export class HbSidebarContentComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(sidebarContentClass, this.class()));
}
