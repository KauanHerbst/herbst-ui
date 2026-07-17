import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { menuShortcutVariants } from './menu.variants';

@Component({
  selector: 'hb-menu-shortcut, [hb-menu-shortcut]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'menu-shortcut'" },
  exportAs: 'hbMenuShortcut',
})
export class HbMenuShortcutComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(menuShortcutVariants(), this.class()));
}
