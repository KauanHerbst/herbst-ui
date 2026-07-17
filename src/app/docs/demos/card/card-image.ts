import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCardImports } from '@herbst/ui';

const plate =
  'data:image/svg+xml,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='#A64B2A'/><stop offset='1' stop-color='#6B7A55'/>" +
      '</linearGradient></defs>' +
      "<rect width='320' height='320' fill='url(#g)'/></svg>",
  );

@Component({
  selector: 'hb-demo-card-image',
  imports: [HbCardImports],
  template: `
    <div class="flex flex-wrap items-start gap-4">
      <hb-card class="max-w-xs">
        <hb-card-image [hbSrc]="plate" hbAlt="Autumn forest" [hbRatio]="16 / 9" />
        <hb-card-header>
          <hb-card-title>Autumn 2026</hb-card-title>
          <hb-card-description>Image on top, 16 / 9</hb-card-description>
        </hb-card-header>
      </hb-card>

      <hb-card class="max-w-xs">
        <hb-card-content>Image below the content, fixed height.</hb-card-content>
        <hb-card-image
          [hbSrc]="plate"
          hbAlt="Autumn forest"
          hbPosition="bottom"
          [hbHeight]="120"
          hbFit="cover"
        />
      </hb-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCardImageComponent {
  protected readonly plate = plate;
}
