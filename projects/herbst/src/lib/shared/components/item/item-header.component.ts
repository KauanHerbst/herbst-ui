import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { itemHeaderVariants } from './item.variants';

@Component({
  selector: 'hb-item-header, [hb-item-header]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'item-header'" },
  exportAs: 'hbItemHeader',
})
export class HbItemHeaderComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(itemHeaderVariants(), this.class()));
}
