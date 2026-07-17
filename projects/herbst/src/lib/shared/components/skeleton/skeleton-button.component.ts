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
  selector: 'hb-skeleton-button',
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
  host: { class: 'inline-flex', '[attr.data-slot]': "'skeleton-button'", 'aria-hidden': 'true' },
  exportAs: 'hbSkeletonButton',
})
export class HbSkeletonButtonComponent {
  readonly hbSize = input<HbSkeletonSize>('md');
  readonly hbWidth = input('5rem');
  readonly hbAnimation = input<HbSkeletonAnimation>('pulse');

  protected readonly height = computed(() => SKELETON_CONTROL_HEIGHT[this.hbSize()]);
}
