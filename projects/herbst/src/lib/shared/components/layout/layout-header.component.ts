import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { headerClass } from './layout.variants';

@Component({
  selector: 'hb-header',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[style.height.px]': 'hbHeight()',
    '[attr.data-slot]': "'header'",
  },
  exportAs: 'hbHeader',
})
export class HbHeaderComponent {
  readonly hbHeight = input(64, { transform: numberAttribute });
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(headerClass, this.class()));
}
