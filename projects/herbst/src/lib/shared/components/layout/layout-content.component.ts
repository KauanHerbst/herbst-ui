import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { contentClass } from './layout.variants';

@Component({
  selector: 'hb-content',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'content'" },
  exportAs: 'hbContent',
})
export class HbContentComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(contentClass, this.class()));
}
