import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';

@Component({
  selector: 'hb-sidebar-panel',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'sidebar-panel'" },
  exportAs: 'hbSidebarPanel',
})
export class HbSidebarPanelComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn('flex min-h-0 flex-1 flex-col', this.class()));
}
