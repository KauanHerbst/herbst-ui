import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { menuLabelVariants } from './menu.variants';

@Component({
  selector: 'hb-menu-label, [hb-menu-label]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'menu-label'" },
  exportAs: 'hbMenuLabel',
})
export class HbMenuLabelComponent {
  readonly hbInset = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn(menuLabelVariants({ inset: this.hbInset() }), this.class()),
  );
}
