import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCheckboxImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-checkbox-basic',
  imports: [HbCheckboxImports],
  template: `
    <div class="flex flex-col gap-3">
      <hb-checkbox>Unchecked</hb-checkbox>
      <hb-checkbox [hbChecked]="true">Checked</hb-checkbox>
      <hb-checkbox [hbIndeterminate]="true">Indeterminate</hb-checkbox>
      <hb-checkbox hbDisabled>Disabled</hb-checkbox>
      <hb-checkbox [hbChecked]="true" hbDisabled>Disabled &amp; checked</hb-checkbox>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCheckboxBasicComponent {}
