import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { cn } from '../../utils';
import { commandSeparatorVariants } from './command.variants';

@Component({
  selector: 'hb-command-separator, [hb-command-separator]',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes', role: 'separator', '[attr.data-slot]': "'command-separator'" },
  exportAs: 'hbCommandSeparator',
})
export class HbCommandSeparatorComponent {
  protected readonly classes = cn(commandSeparatorVariants());
}
