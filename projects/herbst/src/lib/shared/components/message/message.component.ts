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
  selector: 'hb-message',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'message'",
    '[attr.data-align]': 'hbAlign()',
  },
  exportAs: 'hbMessage',
})
export class HbMessageComponent {
  readonly hbAlign = input<HbMessageAlign>('start');
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(
      'group/message flex w-full items-end gap-2 data-[align=end]:flex-row-reverse',
      this.class(),
    ),
  );
}
