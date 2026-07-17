import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';

@Component({
  selector: 'hb-message-scroller-content',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'log',
    'aria-live': 'polite',
    'aria-relevant': 'additions',
    '[class]': 'classes()',
    '[attr.data-slot]': "'message-scroller-content'",
  },
  exportAs: 'hbMessageScrollerContent',
})
export class HbMessageScrollerContentComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn('flex flex-col gap-4 p-4', this.class()),
  );
}
