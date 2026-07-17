import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';

import { cn } from '../../utils';
import { commandEmptyVariants } from './command.variants';
import { HB_COMMAND } from './command.token';

@Component({
  selector: 'hb-command-empty',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes',
    '[style.display]': "command.hasVisibleItems() ? 'none' : null",
    '[attr.data-slot]': "'command-empty'",
  },
  exportAs: 'hbCommandEmpty',
})
export class HbCommandEmptyComponent {
  protected readonly command = inject(HB_COMMAND);
  protected readonly classes = cn(commandEmptyVariants());
}
