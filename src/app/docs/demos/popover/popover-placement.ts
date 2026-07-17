import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbPopoverImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-popover-placement',
  imports: [HbPopoverImports, HbButtonComponent],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <hb-popover hbSide="top" hbAlign="start" [hbSideOffset]="8">
        <button hbPopoverTrigger hb-button hbType="outline">Top · start</button>
        <hb-popover-content [hbWidth]="220">
          <p class="text-sm">Opens above, aligned to the start edge, 8px away.</p>
        </hb-popover-content>
      </hb-popover>

      <hb-popover hbSide="right" hbAlign="center">
        <button hbPopoverTrigger hb-button hbType="outline">Right · center</button>
        <hb-popover-content class="bg-primary text-primary-foreground">
          <p class="text-sm">A custom class recolours the panel.</p>
        </hb-popover-content>
      </hb-popover>

      <hb-popover hbSide="bottom" hbAlign="end">
        <button hbPopoverTrigger hb-button hbType="outline">Bottom · end</button>
        <hb-popover-content hbWidth="16rem">
          <p class="text-sm">Aligned to the end, width set to 16rem.</p>
        </hb-popover-content>
      </hb-popover>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoPopoverPlacementComponent {}
