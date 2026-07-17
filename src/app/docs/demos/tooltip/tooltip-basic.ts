import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbTooltipImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-tooltip-basic',
  imports: [HbTooltipImports, HbButtonComponent],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <button hb-button hbType="secondary" hbTooltip="Add a new photo">Hover me</button>

      <button hb-button hbType="outline" hbTooltip="Save changes" [hbTooltipShortcut]="['⌘', 'S']">
        With shortcut
      </button>

      <span
        hbTooltip="Oak leaves — Black Forest"
        class="cursor-help text-sm underline decoration-dotted underline-offset-4"
      >
        Any element works
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTooltipBasicComponent {}
