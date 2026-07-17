import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { cn } from '../../utils';
import { commandShortcutVariants } from './command.variants';

@Component({
  selector: 'hb-command-shortcut, [hb-command-shortcut]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes', '[attr.data-slot]': "'command-shortcut'" },
  exportAs: 'hbCommandShortcut',
})
export class HbCommandShortcutComponent {
  protected readonly classes = cn(commandShortcutVariants());
}
