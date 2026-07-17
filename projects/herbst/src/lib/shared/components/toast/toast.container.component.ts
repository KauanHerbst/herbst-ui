import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

import { HbToastComponent } from './toast.component';
import type { HbToastRef } from './toast.types';

@Component({
  selector: 'hb-toast-container',
  imports: [HbToastComponent],
  template: `
    @for (ref of toasts(); track ref.id) {
      <hb-toast [ref]="ref" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClass()',
    '[style.gap]': 'gap()',
    '[attr.data-slot]': "'toast-container'",
    'aria-live': 'polite',
  },
  exportAs: 'hbToastContainer',
})
export class HbToastContainerComponent {
  readonly toasts = input<HbToastRef[]>([]);
  readonly gap = input<string>('0.75rem');
  readonly hostClass = input<string>('pointer-events-none flex flex-col');
}
