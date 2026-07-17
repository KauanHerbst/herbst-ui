import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { sidebarFooterClass } from './sidebar.variants';

@Component({
  selector: 'hb-sidebar-footer',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'sidebar-footer'" },
  exportAs: 'hbSidebarFooter',
})
export class HbSidebarFooterComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(sidebarFooterClass, this.class()));
}
