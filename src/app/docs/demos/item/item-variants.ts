import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbItemImports } from '@herbst/ui';

const plate =
  'data:image/svg+xml,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='#6B7A55'/><stop offset='1' stop-color='#3E4C3A'/>" +
      '</linearGradient></defs>' +
      "<rect width='80' height='80' fill='url(#g)'/></svg>",
  );

@Component({
  selector: 'hb-demo-item-variants',
  imports: [HbItemImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-3">
      <hb-item hbVariant="muted" hbSize="sm">
        <hb-item-content>
          <hb-item-title>Muted · small</hb-item-title>
          <hb-item-description>A subdued background for secondary rows.</hb-item-description>
        </hb-item-content>
      </hb-item>

      <hb-item hbVariant="outline" hbSize="lg">
        <hb-item-media hbVariant="image">
          <img [src]="plate" alt="Autumn forest" />
        </hb-item-media>
        <hb-item-content>
          <hb-item-title>Outline · large</hb-item-title>
          <hb-item-description>Image media, roomier padding.</hb-item-description>
        </hb-item-content>
      </hb-item>

      <hb-item hbVariant="default" hbSize="xs">
        <hb-item-content>
          <hb-item-title>Default · extra small</hb-item-title>
        </hb-item-content>
      </hb-item>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoItemVariantsComponent {
  protected readonly plate = plate;
}
