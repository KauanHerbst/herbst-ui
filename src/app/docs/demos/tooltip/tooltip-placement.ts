import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbTooltipImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-tooltip-placement',
  imports: [HbTooltipImports, HbButtonComponent],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <button
        hb-button
        hbType="secondary"
        hbTooltip="On top"
        hbTooltipPosition="top"
        hbTooltipArrow
      >
        Top · arrow
      </button>

      <button hb-button hbType="secondary" hbTooltip="To the right" hbTooltipPosition="right">
        Right
      </button>

      <button hb-button hbType="secondary" hbTooltip="Below" hbTooltipPosition="bottom">
        Bottom
      </button>

      <button hb-button hbType="secondary" hbTooltip="To the left" hbTooltipPosition="left">
        Left
      </button>

      <button
        hb-button
        hbType="outline"
        hbTooltip="Aligned to the start with more offset"
        hbTooltipPosition="bottom"
        hbTooltipAlign="start"
        [hbTooltipOffset]="12"
        hbTooltipArrow
      >
        Align start · offset 12
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTooltipPlacementComponent {}
