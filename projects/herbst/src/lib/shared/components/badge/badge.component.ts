import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import {
  badgeVariants,
  type HbBadgeShape,
  type HbBadgeSize,
  type HbBadgeType,
} from './badge.variants';

@Component({
  selector: 'hb-badge, [hb-badge]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'badge'",
  },
  exportAs: 'hbBadge',
})
export class HbBadgeComponent {
  readonly hbType = input<HbBadgeType>('default');
  readonly hbShape = input<HbBadgeShape>('pill');
  readonly hbSize = input<HbBadgeSize>('md');
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(
      badgeVariants({ type: this.hbType(), shape: this.hbShape(), size: this.hbSize() }),
      this.class(),
    ),
  );
}
