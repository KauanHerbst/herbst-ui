import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbHoverCardImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-hover-card-placement',
  imports: [HbHoverCardImports, HbButtonComponent],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <hb-hover-card hbSide="top" hbAlign="start" [hbSideOffset]="8">
        <button hbHoverCardTrigger hb-button hbType="outline">Top · start</button>
        <hb-hover-card-content [hbWidth]="220">
          <p class="text-sm">Opens above the trigger, aligned to its start edge, 8px away.</p>
        </hb-hover-card-content>
      </hb-hover-card>

      <hb-hover-card hbSide="right" hbAlign="center">
        <button hbHoverCardTrigger hb-button hbType="outline">Right · center</button>
        <hb-hover-card-content class="bg-primary text-primary-foreground">
          <p class="text-sm">A custom class recolours the panel.</p>
        </hb-hover-card-content>
      </hb-hover-card>

      <hb-hover-card hbSide="bottom" hbAlign="end" [hbSideOffset]="0">
        <button hbHoverCardTrigger hb-button hbType="outline">Bottom · end</button>
        <hb-hover-card-content hbWidth="16rem">
          <p class="text-sm">Flush to the trigger, aligned to its end, width set to 16rem.</p>
        </hb-hover-card-content>
      </hb-hover-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoHoverCardPlacementComponent {}
