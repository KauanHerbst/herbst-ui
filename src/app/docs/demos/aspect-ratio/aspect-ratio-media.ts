import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAspectRatioComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-aspect-ratio-media',
  imports: [HbAspectRatioComponent],
  template: `
    <div hb-aspect-ratio [hbRatio]="16 / 9" class="max-w-md rounded-md border border-border">
      <img [src]="image" alt="Autumn forest" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAspectRatioMediaComponent {
  protected readonly image =
    'data:image/svg+xml,' +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>" +
        "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
        "<stop offset='0' stop-color='#A64B2A'/><stop offset='1' stop-color='#6B7A55'/>" +
        '</linearGradient></defs>' +
        "<rect width='240' height='240' fill='url(#g)'/></svg>",
    );
}
