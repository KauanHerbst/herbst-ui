import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbGalleryImports } from '@herbst/ui';

interface Plate {
  title: string;
  src: string;
}

function plate(title: string, from: string, to: string): Plate {
  const src =
    'data:image/svg+xml,' +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'>" +
        `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient></defs>` +
        "<rect width='800' height='400' fill='url(#g)'/>" +
        `<text x='40' y='368' font-family='Georgia, serif' font-size='30' fill='#F5F1E6'>${title}</text></svg>`,
    );
  return { title, src };
}

@Component({
  selector: 'hb-demo-gallery-autoplay',
  imports: [HbGalleryImports],
  template: `
    <hb-gallery
      class="w-full max-w-lg"
      [hbItems]="items"
      [hbShowThumbnails]="false"
      hbShowIndicators
      [hbShowItemNavigators]="false"
      hbLoop
      hbAutoplay
      [hbDelay]="2500"
    >
      <ng-template hbGalleryItem let-item>
        <img [src]="item.src" [alt]="item.title" class="aspect-[2/1] w-full object-cover" />
      </ng-template>
    </hb-gallery>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoGalleryAutoplayComponent {
  protected readonly items: Plate[] = [
    plate('Oak leaves', '#A64B2A', '#6B7A55'),
    plate('Misty forest', '#6B7A55', '#3E4C3A'),
    plate('Falling leaves', '#B98A3E', '#A64B2A'),
  ];
}
