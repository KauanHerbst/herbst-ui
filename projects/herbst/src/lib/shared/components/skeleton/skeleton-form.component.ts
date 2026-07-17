import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  ViewEncapsulation,
} from '@angular/core';

import { HbSkeletonButtonComponent } from './skeleton-button.component';
import { HbSkeletonInputComponent } from './skeleton-input.component';
import { HbSkeletonComponent } from './skeleton.component';
import { type HbSkeletonAnimation } from './skeleton.variants';

@Component({
  selector: 'hb-skeleton-form',
  imports: [HbSkeletonComponent, HbSkeletonInputComponent, HbSkeletonButtonComponent],
  template: `
    <div class="flex w-full flex-col gap-5">
      @for (field of fields(); track $index) {
        <div class="flex flex-col gap-2">
          <hb-skeleton hbShape="text" hbSize="sm" hbWidth="30%" [hbAnimation]="hbAnimation()" />
          <hb-skeleton-input [hbAnimation]="hbAnimation()" />
        </div>
      }
      @if (hbButton()) {
        <hb-skeleton-button hbWidth="7rem" [hbAnimation]="hbAnimation()" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block w-full', '[attr.data-slot]': "'skeleton-form'", 'aria-hidden': 'true' },
  exportAs: 'hbSkeletonForm',
})
export class HbSkeletonFormComponent {
  readonly hbFields = input(3, { transform: numberAttribute });
  readonly hbButton = input(true, { transform: booleanAttribute });
  readonly hbAnimation = input<HbSkeletonAnimation>('pulse');

  protected readonly fields = computed(() => Array.from({ length: Math.max(1, this.hbFields()) }));
}
