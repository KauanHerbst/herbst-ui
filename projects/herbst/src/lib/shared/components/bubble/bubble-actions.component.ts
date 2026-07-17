import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';

@Component({
  selector: 'hb-bubble-actions',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'bubble-actions'" },
  exportAs: 'hbBubbleActions',
})
export class HbBubbleActionsComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn('mt-2 flex flex-wrap items-center gap-1.5', this.class()),
  );
}
