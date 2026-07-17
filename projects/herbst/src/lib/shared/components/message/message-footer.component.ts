import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';

@Component({
  selector: 'hb-message-footer',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'message-footer'",
  },
  exportAs: 'hbMessageFooter',
})
export class HbMessageFooterComponent {
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(
      'flex items-center gap-2 px-1 text-xs text-muted-foreground group-data-[align=end]/message:flex-row-reverse',
      this.class(),
    ),
  );
}
