import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { sidebarHeaderClass } from './sidebar.variants';

@Component({
  selector: 'hb-sidebar-header',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'sidebar-header'" },
  exportAs: 'hbSidebarHeader',
})
export class HbSidebarHeaderComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(sidebarHeaderClass, this.class()));
}
