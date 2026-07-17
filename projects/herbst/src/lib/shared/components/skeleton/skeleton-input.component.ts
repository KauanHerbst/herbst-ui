import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { HbSkeletonComponent } from './skeleton.component';
import {
  SKELETON_CONTROL_HEIGHT,
  type HbSkeletonAnimation,
  type HbSkeletonSize,
} from './skeleton.variants';

@Component({
  selector: 'hb-skeleton-input',
  imports: [HbSkeletonComponent],
  template: `
    <hb-skeleton
      hbShape="rectangle"
      [hbWidth]="hbWidth()"
      [hbHeight]="height()"
      hbRounded="md"
      [hbAnimation]="hbAnimation()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block w-full', '[attr.data-slot]': "'skeleton-input'", 'aria-hidden': 'true' },
  exportAs: 'hbSkeletonInput',
})
export class HbSkeletonInputComponent {
  readonly hbSize = input<HbSkeletonSize>('md');
  readonly hbWidth = input('100%');
  readonly hbAnimation = input<HbSkeletonAnimation>('pulse');

  protected readonly height = computed(() => SKELETON_CONTROL_HEIGHT[this.hbSize()]);
}
