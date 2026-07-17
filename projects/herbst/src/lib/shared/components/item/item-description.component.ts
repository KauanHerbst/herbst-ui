import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { itemDescriptionVariants } from './item.variants';

@Component({
  selector: 'hb-item-description, [hb-item-description]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'item-description'" },
  exportAs: 'hbItemDescription',
})
export class HbItemDescriptionComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(itemDescriptionVariants(), this.class()));
}
