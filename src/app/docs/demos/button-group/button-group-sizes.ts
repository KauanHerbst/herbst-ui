import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbButtonGroupImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-button-group-sizes',
  imports: [HbButtonGroupImports, HbButtonComponent],
  template: `
    <div class="flex flex-col items-start gap-3">
      <hb-button-group hbSize="sm">
        <button hb-button hbType="outline">Day</button>
        <button hb-button hbType="outline">Week</button>
        <button hb-button hbType="outline">Month</button>
      </hb-button-group>

      <hb-button-group hbSize="lg">
        <button hb-button hbType="outline">Day</button>
        <button hb-button hbType="outline">Week</button>
        <button hb-button hbType="outline">Month</button>
      </hb-button-group>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoButtonGroupSizesComponent {}
