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
      "<svg xmlns='http://www.w3.org/2000/svg' width='640' height='480'>" +
        `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient></defs>` +
        "<rect width='640' height='480' fill='url(#g)'/>" +
        `<text x='32' y='448' font-family='Georgia, serif' font-size='28' fill='#F5F1E6'>${title}</text></svg>`,
    );
  return { title, src };
}

@Component({
  selector: 'hb-demo-gallery-thumbnails',
  imports: [HbGalleryImports],
  template: `
    <hb-gallery
      class="w-full max-w-xl"
      [hbItems]="items"
      hbThumbnailsPosition="left"
      hbShowIndicators
      [hbThumbWidth]="96"
      [hbThumbViewport]="360"
    >
      <ng-template hbGalleryItem let-item>
        <img [src]="item.src" [alt]="item.title" class="aspect-[4/3] w-full object-cover" />
      </ng-template>
      <ng-template hbGalleryThumb let-item>
        <img [src]="item.src" [alt]="item.title" class="aspect-square w-full object-cover" />
      </ng-template>
    </hb-gallery>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoGalleryThumbnailsComponent {
  protected readonly items: Plate[] = [
    plate('Plate I', '#A64B2A', '#6B7A55'),
    plate('Plate II', '#6B7A55', '#3E4C3A'),
    plate('Plate III', '#B98A3E', '#A64B2A'),
    plate('Plate IV', '#3E4C3A', '#6B7A55'),
    plate('Plate V', '#6B7A55', '#B98A3E'),
  ];
}
