import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { menuSeparatorVariants } from './menu.variants';

@Component({
  selector: 'hb-menu-separator, [hb-menu-separator]',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', role: 'separator', '[attr.data-slot]': "'menu-separator'" },
  exportAs: 'hbMenuSeparator',
})
export class HbMenuSeparatorComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(menuSeparatorVariants(), this.class()));
}
