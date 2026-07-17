import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { HbSkeletonComponent } from './skeleton.component';
import {
  type HbSkeletonAnimation,
  type HbSkeletonAvatarShape,
  type HbSkeletonRounded,
  type HbSkeletonShape,
  type HbSkeletonSize,
} from './skeleton.variants';

@Component({
  selector: 'hb-skeleton-avatar',
  imports: [HbSkeletonComponent],
  template: `
    <div class="flex items-center gap-3">
      <hb-skeleton
        [hbShape]="boxShape()"
        [hbSize]="hbSize()"
        [hbRounded]="rounded()"
        [hbAnimation]="hbAnimation()"
      />
      @if (hbText()) {
        <div class="flex flex-1 flex-col gap-2">
          <hb-skeleton hbShape="text" hbSize="md" hbWidth="40%" [hbAnimation]="hbAnimation()" />
          <hb-skeleton hbShape="text" hbSize="sm" hbWidth="60%" [hbAnimation]="hbAnimation()" />
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.data-slot]': "'skeleton-avatar'", 'aria-hidden': 'true' },
  exportAs: 'hbSkeletonAvatar',
})
export class HbSkeletonAvatarComponent {
  readonly hbSize = input<HbSkeletonSize>('md');
  readonly hbShape = input<HbSkeletonAvatarShape>('circle');
  readonly hbText = input(false, { transform: booleanAttribute });
  readonly hbAnimation = input<HbSkeletonAnimation>('pulse');

  protected readonly boxShape = computed<HbSkeletonShape>(() =>
    this.hbShape() === 'circle' ? 'circle' : 'square',
  );
  protected readonly rounded = computed<HbSkeletonRounded | undefined>(() =>
    this.hbShape() === 'rounded' ? 'lg' : undefined,
  );
}
