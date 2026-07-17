import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  ViewEncapsulation,
} from '@angular/core';

import { HbSkeletonComponent } from './skeleton.component';
import { type HbSkeletonAnimation, type HbSkeletonSize } from './skeleton.variants';

@Component({
  selector: 'hb-skeleton-text',
  imports: [HbSkeletonComponent],
  template: `
    <div class="flex w-full flex-col" [style.gap]="hbGap()">
      @for (line of lines(); track $index) {
        <hb-skeleton
          hbShape="text"
          [hbSize]="hbSize()"
          [hbAnimation]="hbAnimation()"
          [hbWidth]="$last && !$first ? hbLastWidth() : ''"
        />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.data-slot]': "'skeleton-text'", 'aria-hidden': 'true' },
  exportAs: 'hbSkeletonText',
})
export class HbSkeletonTextComponent {
  readonly hbLines = input(3, { transform: numberAttribute });
  readonly hbLastWidth = input('60%');
  readonly hbSize = input<HbSkeletonSize>('md');
  readonly hbGap = input('0.5rem');
  readonly hbAnimation = input<HbSkeletonAnimation>('pulse');

  protected readonly lines = computed(() => Array.from({ length: Math.max(1, this.hbLines()) }));
}
