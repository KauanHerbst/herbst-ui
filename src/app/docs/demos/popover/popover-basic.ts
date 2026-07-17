import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbInputDirective, HbPopoverImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-popover-basic',
  imports: [HbPopoverImports, HbButtonComponent, HbInputDirective],
  template: `
    <hb-popover>
      <button hbPopoverTrigger hb-button hbType="outline">Rename photo</button>

      <hb-popover-content [hbWidth]="288">
        <hb-popover-header>
          <h4 hb-popover-title>Rename photo</h4>
          <p hb-popover-description>Update the display name for this photo.</p>
        </hb-popover-header>

        <div class="mt-3 flex items-center gap-2">
          <input hb-input hbFluid value="Oak leaves" />
          <button hb-button hbSize="sm" hbPopoverClose>Save</button>
        </div>
      </hb-popover-content>
    </hb-popover>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoPopoverBasicComponent {}
