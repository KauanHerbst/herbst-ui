import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';

@Component({
  selector: 'hb-sidebar-aside',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'sidebar-aside'", role: 'complementary' },
  exportAs: 'hbSidebarAside',
})
export class HbSidebarAsideComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn('flex h-full min-w-0 flex-col', this.class()));
}
