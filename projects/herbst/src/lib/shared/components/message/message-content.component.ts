import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';

@Component({
  selector: 'hb-message-content',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'message-content'",
  },
  exportAs: 'hbMessageContent',
})
export class HbMessageContentComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(
      'flex min-w-0 flex-col gap-1 group-data-[align=end]/message:items-end',
      this.class(),
    ),
  );
}
