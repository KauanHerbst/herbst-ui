import { Directive, inject } from '@angular/core';

import { HbInplaceComponent } from './inplace.component';

@Directive({
  selector: '[hbInplaceCloser]',
  host: {
    '[attr.data-slot]': "'inplace-closer'",
    '(click)': 'onClick()',
  },
  exportAs: 'hbInplaceCloser',
})
export class HbInplaceCloserDirective {
  private readonly inplace = inject(HbInplaceComponent);

  protected onClick(): void {
    this.inplace.deactivate();
  }
}
