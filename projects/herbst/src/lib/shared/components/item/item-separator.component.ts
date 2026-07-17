import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { itemSeparatorVariants } from './item.variants';

@Component({
  selector: 'hb-item-separator, [hb-item-separator]',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    role: 'separator',
    'aria-orientation': 'horizontal',
    '[attr.data-slot]': "'item-separator'",
  },
  exportAs: 'hbItemSeparator',
})
export class HbItemSeparatorComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(itemSeparatorVariants(), this.class()));
}
