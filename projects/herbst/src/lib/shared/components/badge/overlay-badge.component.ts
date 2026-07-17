import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbBadgeComponent } from './badge.component';
import {
  overlayBadgePositionVariants,
  type HbBadgePosition,
  type HbBadgeSize,
  type HbBadgeType,
} from './badge.variants';

@Component({
  selector: 'hb-overlay-badge',
  imports: [HbBadgeComponent],
  template: `
    <ng-content />
    <span
      hb-badge
      [hbType]="hbType()"
      hbShape="pill"
      [hbSize]="hbSize()"
      [class]="badgeClasses()"
      aria-live="polite"
    >
      @if (!isDot()) {
        {{ hbValue() }}
      }
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'overlay-badge'",
  },
  exportAs: 'hbOverlayBadge',
})
export class HbOverlayBadgeComponent {
  readonly hbValue = input<string | number | null>(null);
  readonly hbType = input<HbBadgeType>('destructive');
  readonly hbPosition = input<HbBadgePosition>('top-right');
  readonly hbDot = input(false, { transform: booleanAttribute });
  readonly hbSize = input<HbBadgeSize>('sm');
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => cn('relative inline-flex w-fit', this.class()));

  protected readonly isDot = computed(() => {
    const value = this.hbValue();
    return this.hbDot() || value == null || value === '';
  });

  protected readonly badgeClasses = computed(() =>
    cn(
      overlayBadgePositionVariants({ position: this.hbPosition() }),
      'ring-2 ring-background',
      this.isDot() ? 'size-2.5 min-w-0 p-0' : '',
    ),
  );
}
