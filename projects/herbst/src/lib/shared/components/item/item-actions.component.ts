import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { itemActionsVariants } from './item.variants';

@Component({
  selector: 'hb-item-actions, [hb-item-actions]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'item-actions'" },
  exportAs: 'hbItemActions',
})
export class HbItemActionsComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(itemActionsVariants(), this.class()));
}
