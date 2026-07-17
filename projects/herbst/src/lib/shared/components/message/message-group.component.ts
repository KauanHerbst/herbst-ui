import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { type HbMessageAlign } from './message.variants';

@Component({
  selector: 'hb-message-group',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'message-group'",
    '[attr.data-align]': 'hbAlign()',
  },
  exportAs: 'hbMessageGroup',
})
export class HbMessageGroupComponent {
  readonly hbAlign = input<HbMessageAlign>('start');
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(
      'flex flex-col gap-0.5 data-[align=end]:items-end',
      '[&>[data-slot=message]:not(:last-child)_[data-slot=message-avatar]]:invisible',
      this.class(),
    ),
  );
}
