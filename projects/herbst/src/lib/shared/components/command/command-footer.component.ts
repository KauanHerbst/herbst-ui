import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { cn } from '../../utils';
import { commandFooterVariants } from './command.variants';

@Component({
  selector: 'hb-command-footer, [hb-command-footer]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes', '[attr.data-slot]': "'command-footer'" },
  exportAs: 'hbCommandFooter',
})
export class HbCommandFooterComponent {
  protected readonly classes = cn(commandFooterVariants());
}
