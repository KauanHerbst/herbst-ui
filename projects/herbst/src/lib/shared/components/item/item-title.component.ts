import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { itemTitleVariants } from './item.variants';

@Component({
  selector: 'hb-item-title, [hb-item-title]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'item-title'" },
  exportAs: 'hbItemTitle',
})
export class HbItemTitleComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(itemTitleVariants(), this.class()));
}
