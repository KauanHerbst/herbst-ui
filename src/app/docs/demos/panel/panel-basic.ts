import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbPanelImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-panel-basic',
  imports: [HbPanelImports],
  template: `
    <hb-panel class="w-full max-w-md" hbHeader="Photo details" hbToggleable>
      <p class="text-sm text-muted-foreground">
        Oak leaves along the trail — taken in Freiburg, November 2026. A cool, misty morning.
      </p>
    </hb-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoPanelBasicComponent {}
