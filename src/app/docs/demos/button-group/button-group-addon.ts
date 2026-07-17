import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbButtonGroupImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-button-group-addon',
  imports: [HbButtonGroupImports, HbButtonComponent],
  template: `
    <hb-button-group>
      <hb-button-group-text>Sort</hb-button-group-text>
      <button hb-button hbType="outline">Name</button>
      <button hb-button hbType="outline">Date</button>
      <hb-button-group-separator />
      <button hb-button hbType="outline">Size</button>
    </hb-button-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoButtonGroupAddonComponent {}
