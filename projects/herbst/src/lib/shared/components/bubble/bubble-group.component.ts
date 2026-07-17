import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { type HbBubbleAlign } from './bubble.variants';

@Component({
  selector: 'hb-bubble-group',
  template: `
    @if (hbName() || hbAvatar() || hbTime()) {
      <div class="flex items-center gap-2 px-1 text-xs">
        @if (hbAvatar()) {
          <img [src]="hbAvatar()" alt="" class="size-6 rounded-full object-cover" />
        }
        @if (hbName()) {
          <span class="font-medium">{{ hbName() }}</span>
        }
        @if (hbTime()) {
          <span class="text-muted-foreground">{{ hbTime() }}</span>
        }
      </div>
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'bubble-group'",
    '[attr.data-align]': 'hbAlign()',
  },
  exportAs: 'hbBubbleGroup',
})
export class HbBubbleGroupComponent {
  readonly hbAlign = input<HbBubbleAlign>('start');
  readonly hbName = input('');
  readonly hbAvatar = input('');
  readonly hbTime = input('');
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(
      'flex flex-col gap-1',
      this.hbAlign() === 'end' ? 'items-end' : 'items-start',
      this.class(),
    ),
  );
}
