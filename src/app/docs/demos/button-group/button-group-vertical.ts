import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbButtonGroupImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-button-group-vertical',
  imports: [HbButtonGroupImports, HbButtonComponent],
  template: `
    <hb-button-group hbOrientation="vertical">
      <button hb-button hbType="outline">Press</button>
      <button hb-button hbType="outline">Catalogue</button>
      <button hb-button hbType="outline">Archive</button>
    </hb-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoButtonGroupVerticalComponent {}
