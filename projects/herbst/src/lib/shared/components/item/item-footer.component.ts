import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { itemFooterVariants } from './item.variants';

@Component({
  selector: 'hb-item-footer, [hb-item-footer]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'item-footer'" },
  exportAs: 'hbItemFooter',
})
export class HbItemFooterComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(itemFooterVariants(), this.class()));
}
