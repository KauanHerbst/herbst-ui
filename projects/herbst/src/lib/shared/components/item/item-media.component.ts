import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { itemMediaVariants, type HbItemMediaVariant } from './item.variants';

@Component({
  selector: 'hb-item-media, [hb-item-media]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'item-media'",
    '[attr.data-variant]': 'hbVariant()',
  },
  exportAs: 'hbItemMedia',
})
export class HbItemMediaComponent {
  readonly hbVariant = input<HbItemMediaVariant>('default');
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn(itemMediaVariants({ variant: this.hbVariant() }), this.class()),
  );
}
