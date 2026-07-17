import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { sidebarBackdropClass } from './sidebar.variants';

@Component({
  selector: 'hb-sidebar-backdrop',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'sidebar-backdrop'" },
  exportAs: 'hbSidebarBackdrop',
})
export class HbSidebarBackdropComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(sidebarBackdropClass, this.class()));
}
