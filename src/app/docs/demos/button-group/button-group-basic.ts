import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbButtonGroupImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-button-group-basic',
  imports: [HbButtonGroupImports, HbButtonComponent],
  template: `
    <hb-button-group>
      <button hb-button hbType="outline">Day</button>
      <button hb-button hbType="outline">Week</button>
      <button hb-button hbType="outline">Month</button>
    </hb-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoButtonGroupBasicComponent {}
