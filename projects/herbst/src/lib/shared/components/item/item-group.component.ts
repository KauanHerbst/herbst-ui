import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { itemGroupVariants } from './item.variants';

@Component({
  selector: 'hb-item-group, [hb-item-group]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', role: 'list', '[attr.data-slot]': "'item-group'" },
  exportAs: 'hbItemGroup',
})
export class HbItemGroupComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(itemGroupVariants(), this.class()));
}
