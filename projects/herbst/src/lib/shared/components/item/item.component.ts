import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { itemVariants, type HbItemSize, type HbItemVariant } from './item.variants';

@Component({
  selector: 'hb-item, a[hb-item], button[hb-item], [hb-item]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'item'",
    '[attr.data-variant]': 'hbVariant()',
    '[attr.data-size]': 'hbSize()',
  },
  exportAs: 'hbItem',
})
export class HbItemComponent {
  readonly hbVariant = input<HbItemVariant>('default');
  readonly hbSize = input<HbItemSize>('md');
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn(itemVariants({ variant: this.hbVariant(), size: this.hbSize() }), this.class()),
  );
}
