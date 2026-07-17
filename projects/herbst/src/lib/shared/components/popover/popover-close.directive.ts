import { Directive, inject } from '@angular/core';

import { HbPopoverComponent } from './popover.component';

@Directive({
  selector: '[hbPopoverClose]',
  host: {
    '[attr.data-slot]': "'popover-close'",
    '(click)': 'popover.close()',
  },
  exportAs: 'hbPopoverClose',
})
export class HbPopoverCloseDirective {
  protected readonly popover = inject(HbPopoverComponent);
}
