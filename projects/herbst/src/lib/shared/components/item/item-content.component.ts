import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { itemContentVariants } from './item.variants';

@Component({
  selector: 'hb-item-content, [hb-item-content]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'item-content'" },
  exportAs: 'hbItemContent',
})
export class HbItemContentComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(itemContentVariants(), this.class()));
}
