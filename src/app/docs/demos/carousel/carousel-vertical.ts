import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCarouselImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-carousel-vertical',
  imports: [HbCarouselImports],
  template: `
    <hb-carousel class="block w-72 max-w-full" hbOrientation="vertical" [hbSpacing]="12" hbDragFree>
      <hb-carousel-content class="[&>div]:h-64">
        @for (n of slides; track n) {
          <hb-carousel-item class="basis-1/3">
            <div
              class="flex h-full items-center justify-center rounded-md bg-muted font-display text-xl"
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
export class HbDemoCarouselVerticalComponent {
  protected readonly slides = [1, 2, 3, 4, 5, 6, 7, 8];
}
