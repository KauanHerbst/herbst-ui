import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAvatarImports } from '@herbst/ui';

const portrait =
  'data:image/svg+xml,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='#A64B2A'/><stop offset='1' stop-color='#6B7A55'/>" +
      '</linearGradient></defs>' +
      "<rect width='80' height='80' fill='url(#g)'/></svg>",
  );

@Component({
  selector: 'hb-demo-avatar-basic',
  imports: [HbAvatarImports],
  template: `
    <div class="flex items-center gap-4">
      <hb-avatar [hbSrc]="portrait" hbAlt="Kauan Herbst" hbFallback="KH" hbPriority hbSize="lg" />
      <hb-avatar hbFallback="NA" hbSize="lg" />
      <hb-avatar hbFallback="Q" hbShape="square" hbSize="lg" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAvatarBasicComponent {
  protected readonly portrait = portrait;
}
