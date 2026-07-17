import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { footerClass } from './layout.variants';

@Component({
  selector: 'hb-footer',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[style.height.px]': 'hbHeight()',
    '[attr.data-slot]': "'footer'",
  },
  exportAs: 'hbFooter',
})
export class HbFooterComponent {
  readonly hbHeight = input(64, { transform: numberAttribute });
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(footerClass, this.class()));
}
