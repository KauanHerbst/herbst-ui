import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';

@Component({
  selector: 'hb-message-attachments',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'message-attachments'",
  },
  exportAs: 'hbMessageAttachments',
})
export class HbMessageAttachmentsComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(
      'flex flex-col gap-2 group-data-[align=end]/message:items-end [&>*]:w-full [&>*]:max-w-xs',
      this.class(),
    ),
  );
}
