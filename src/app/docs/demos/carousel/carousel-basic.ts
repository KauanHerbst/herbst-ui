import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbCarouselImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-carousel-basic',
  imports: [HbCarouselImports],
  template: `
    <div class="flex flex-col gap-2">
      <hb-carousel class="block w-96 max-w-full" hbSize="lg" (hbSelect)="current.set($event)">
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
        <hb-carousel-previous />
        <hb-carousel-next />
        <hb-carousel-dots />
      </hb-carousel>

      <p class="font-mono text-[12px] text-muted-foreground">
        Slide {{ current() + 1 }} / {{ slides.length }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCarouselBasicComponent {
  protected readonly slides = [1, 2, 3, 4, 5];
  protected readonly current = signal(0);
}
