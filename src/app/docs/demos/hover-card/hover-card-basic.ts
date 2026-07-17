import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAvatarImports, HbButtonComponent, HbHoverCardImports } from '@herbst/ui';

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
  selector: 'hb-demo-hover-card-basic',
  imports: [HbHoverCardImports, HbButtonComponent, HbAvatarImports],
  template: `
    <hb-hover-card>
      <button hbHoverCardTrigger hb-button hbType="link">&#64;a.herbst</button>

      <hb-hover-card-content>
        <div class="flex gap-3">
          <hb-avatar [hbSrc]="portrait" hbAlt="A. Herbst" hbFallback="AH" hbSize="lg" />
          <div class="space-y-1">
            <p class="text-sm font-medium">A. Herbst</p>
            <p class="text-sm text-muted-foreground">
              Wanders German forests in autumn. Shares falling-leaf photos from the Black Forest.
            </p>
            <p class="pt-1 text-xs text-muted-foreground">Joined November 2026</p>
          </div>
        </div>
      </hb-hover-card-content>
    </hb-hover-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoHoverCardBasicComponent {
  protected readonly portrait = portrait;
}
