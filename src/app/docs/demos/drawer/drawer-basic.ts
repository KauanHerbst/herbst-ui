import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbDrawerImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-drawer-basic',
  imports: [HbDrawerImports, HbButtonComponent],
  template: `
    <hb-drawer
      hbTitle="Save photo"
      hbDescription="Review the details before adding it to the Herbst album."
      hbOkText="Save"
    >
      <button hb-button hbType="outline" hbDrawerTrigger>Open drawer</button>

      <div hbDrawerContent class="text-sm leading-relaxed text-muted-foreground">
        Oak leaves along the river — Freiburg, taken Nov 3, 2026.
      </div>
    </hb-drawer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoDrawerBasicComponent {}
