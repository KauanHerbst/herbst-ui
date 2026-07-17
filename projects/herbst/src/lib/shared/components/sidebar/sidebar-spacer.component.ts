import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { sidebarSpacerClass } from './sidebar.variants';

@Component({
  selector: 'hb-sidebar-spacer',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'sidebar-spacer'" },
  exportAs: 'hbSidebarSpacer',
})
export class HbSidebarSpacerComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(sidebarSpacerClass, this.class()));
}
