import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbGalleryImports } from '@herbst/ui';

interface Plate {
  title: string;
  src: string;
}

function plate(title: string, from: string, to: string): Plate {
  const src =
    'data:image/svg+xml,' +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'>" +
        `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/></linearGradient></defs>` +
        "<rect width='640' height='400' fill='url(#g)'/>" +
        `<text x='32' y='368' font-family='Georgia, serif' font-size='28' fill='#F5F1E6'>${title}</text></svg>`,
    );
  return { title, src };
}

@Component({
  selector: 'hb-demo-gallery-basic',
  imports: [HbGalleryImports],
  template: `
    <div class="flex w-full max-w-lg flex-col gap-2">
      <hb-gallery class="w-full" [hbItems]="items" (hbSelect)="current.set($event)">
        <ng-template hbGalleryItem let-item let-index="index">
          <img [src]="item.src" [alt]="item.title" class="aspect-[16/10] w-full object-cover" />
        </ng-template>
        <ng-template hbGalleryThumb let-item>
          <img [src]="item.src" [alt]="item.title" class="aspect-square size-full object-cover" />
        </ng-template>
      </hb-gallery>

      <p class="font-mono text-[12px] text-muted-foreground">
        {{ items[current()].title }} · {{ current() + 1 }}/{{ items.length }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoGalleryBasicComponent {
  protected readonly current = signal(0);
  protected readonly items: Plate[] = [
    plate('Oak leaves', '#A64B2A', '#6B7A55'),
    plate('Foggy morning', '#6B7A55', '#3E4C3A'),
    plate('Forest path', '#B98A3E', '#A64B2A'),
    plate('Chestnuts', '#3E4C3A', '#6B7A55'),
  ];
}
