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
  selector: 'hb-skeleton-table',
  imports: [HbSkeletonComponent],
  template: `
    <div class="w-full overflow-hidden rounded-lg border border-border">
      @if (hbHeader()) {
        <div class="flex gap-4 border-b border-border bg-muted/40 p-3">
          @for (col of cols(); track $index) {
            <hb-skeleton hbShape="text" hbSize="md" class="flex-1" [hbAnimation]="hbAnimation()" />
          }
        </div>
      }
      @for (row of rows(); track $index) {
        <div class="flex gap-4 border-b border-border p-3 last:border-b-0">
          @for (col of cols(); track $index) {
            <hb-skeleton hbShape="text" hbSize="md" class="flex-1" [hbAnimation]="hbAnimation()" />
          }
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block w-full', '[attr.data-slot]': "'skeleton-table'", 'aria-hidden': 'true' },
  exportAs: 'hbSkeletonTable',
})
export class HbSkeletonTableComponent {
  readonly hbRows = input(5, { transform: numberAttribute });
  readonly hbColumns = input(4, { transform: numberAttribute });
  readonly hbHeader = input(true, { transform: booleanAttribute });
  readonly hbAnimation = input<HbSkeletonAnimation>('pulse');

  protected readonly rows = computed(() => Array.from({ length: Math.max(1, this.hbRows()) }));
  protected readonly cols = computed(() => Array.from({ length: Math.max(1, this.hbColumns()) }));
}
