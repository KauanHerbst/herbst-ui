import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCarouselImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-carousel-multiple',
  imports: [HbCarouselImports],
  template: `
    <hb-carousel class="block w-[34rem] max-w-full" [hbSpacing]="12" hbAlign="center" hbLoop>
      <hb-carousel-content>
        @for (n of slides; track n) {
          <hb-carousel-item class="basis-1/2 md:basis-1/3">
            <div
              class="flex h-32 items-center justify-center rounded-md bg-muted font-display text-2xl"
            >
              {{ n }}
            </div>
          </hb-carousel-item>
        }
      </hb-carousel-content>
      <hb-carousel-previous />
      <hb-carousel-next />
    </hb-carousel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCarouselMultipleComponent {
  protected readonly slides = [1, 2, 3, 4, 5, 6, 7, 8];
}
