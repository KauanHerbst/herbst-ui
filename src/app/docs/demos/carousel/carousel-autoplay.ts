import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCarouselImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-carousel-autoplay',
  imports: [HbCarouselImports],
  template: `
    <hb-carousel class="block w-96 max-w-full" hbAutoplay [hbDelay]="2000" hbLoop>
      <hb-carousel-content>
        @for (n of slides; track n) {
          <hb-carousel-item>
            <div
              class="flex h-40 items-center justify-center rounded-md bg-muted font-display text-4xl"
            >
              {{ n }}
            </div>
          </hb-carousel-item>
        }
      </hb-carousel-content>
      <hb-carousel-dots />
    </hb-carousel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCarouselAutoplayComponent {
  protected readonly slides = [1, 2, 3, 4];
}
