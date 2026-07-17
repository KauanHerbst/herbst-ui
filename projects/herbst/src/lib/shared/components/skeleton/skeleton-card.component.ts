import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  numberAttribute,
  ViewEncapsulation,
} from '@angular/core';

import { HbSkeletonButtonComponent } from './skeleton-button.component';
import { HbSkeletonTextComponent } from './skeleton-text.component';
import { HbSkeletonComponent } from './skeleton.component';
import { type HbSkeletonAnimation } from './skeleton.variants';

@Component({
  selector: 'hb-skeleton-card',
  imports: [HbSkeletonComponent, HbSkeletonTextComponent, HbSkeletonButtonComponent],
  template: `
    <div class="flex w-full flex-col gap-4 rounded-lg border border-border p-4">
      @if (hbMedia()) {
        <hb-skeleton
          hbShape="rectangle"
          [hbHeight]="hbMediaHeight()"
          hbRounded="lg"
          [hbAnimation]="hbAnimation()"
        />
      }
      <hb-skeleton hbShape="text" hbSize="lg" hbWidth="50%" [hbAnimation]="hbAnimation()" />
      <hb-skeleton-text [hbLines]="hbLines()" [hbAnimation]="hbAnimation()" />
      @if (hbFooter()) {
        <div class="flex gap-2 pt-1">
          <hb-skeleton-button hbWidth="6rem" [hbAnimation]="hbAnimation()" />
          <hb-skeleton-button hbWidth="6rem" [hbAnimation]="hbAnimation()" />
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block w-full', '[attr.data-slot]': "'skeleton-card'", 'aria-hidden': 'true' },
  exportAs: 'hbSkeletonCard',
})
export class HbSkeletonCardComponent {
  readonly hbMedia = input(true, { transform: booleanAttribute });
  readonly hbMediaHeight = input('10rem');
  readonly hbLines = input(3, { transform: numberAttribute });
  readonly hbFooter = input(false, { transform: booleanAttribute });
  readonly hbAnimation = input<HbSkeletonAnimation>('pulse');
}
