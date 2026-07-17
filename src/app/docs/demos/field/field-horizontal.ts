import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCheckboxImports, HbFieldImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-field-horizontal',
  imports: [HbFieldImports, HbCheckboxImports],
  template: `
    <hb-field hbOrientation="horizontal" class="max-w-sm">
      <hb-field-content>
        <label hb-field-label>Email notifications</label>
        <hb-field-description>Receive a note when a new photo is shared.</hb-field-description>
      </hb-field-content>
      <hb-checkbox [hbChecked]="true" />
    </hb-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoFieldHorizontalComponent {}
