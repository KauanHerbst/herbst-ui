import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbAvatarComponent, type HbAvatarShape, type HbAvatarSize, type HbAvatarStatus } from '../avatar';

@Component({
  selector: 'hb-message-avatar',
  imports: [HbAvatarComponent],
  template: `
    @if (hbSrc() || hbName()) {
      <hb-avatar
        [hbSrc]="hbSrc()"
        [hbAlt]="hbName()"
        [hbFallback]="initials()"
        [hbSize]="hbSize()"
        [hbShape]="hbShape()"
        [hbStatus]="hbStatus()"
      />
    } @else {
      <ng-content />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'message-avatar'",
  },
  exportAs: 'hbMessageAvatar',
})
export class HbMessageAvatarComponent {
  readonly hbSrc = input('');
  readonly hbName = input('');
  readonly hbSize = input<HbAvatarSize | number>('sm');
  readonly hbShape = input<HbAvatarShape>('circle');
  readonly hbStatus = input<HbAvatarStatus | undefined>(undefined);
  readonly class = input<ClassValue>('');

  protected readonly initials = computed(() => {
    const name = this.hbName().trim();
    if (!name) return '';
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0] ?? '')
      .join('')
      .toUpperCase();
  });

  protected readonly classes = computed(() =>
    cn(
      'shrink-0 self-end group-has-[[data-slot=message-footer]]/message:mb-6',
      this.class(),
    ),
  );
}
