import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  ViewEncapsulation,
} from '@angular/core';

import { HbSkeletonComponent } from './skeleton.component';
import { type HbSkeletonAnimation } from './skeleton.variants';

@Component({
  selector: 'hb-skeleton-list',
  imports: [HbSkeletonComponent],
  template: `
    <div class="flex w-full flex-col gap-4">
      @for (item of items(); track $index) {
        <div class="flex items-center gap-3">
          @if (hbAvatar()) {
            <hb-skeleton hbShape="circle" hbSize="md" [hbAnimation]="hbAnimation()" />
          }
          <div class="flex flex-1 flex-col gap-2">
            <hb-skeleton hbShape="text" hbSize="md" hbWidth="40%" [hbAnimation]="hbAnimation()" />
            @if (hbLines() > 1) {
              <hb-skeleton hbShape="text" hbSize="sm" hbWidth="70%" [hbAnimation]="hbAnimation()" />
            }
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block w-full', '[attr.data-slot]': "'skeleton-list'", 'aria-hidden': 'true' },
  exportAs: 'hbSkeletonList',
})
export class HbSkeletonListComponent {
  readonly hbItems = input(5, { transform: numberAttribute });
  readonly hbAvatar = input(true, { transform: booleanAttribute });
  readonly hbLines = input(2, { transform: numberAttribute });
  readonly hbAnimation = input<HbSkeletonAnimation>('pulse');

  protected readonly items = computed(() => Array.from({ length: Math.max(1, this.hbItems()) }));
}
