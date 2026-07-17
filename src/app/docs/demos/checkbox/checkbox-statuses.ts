import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCheckboxImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-checkbox-statuses',
  imports: [HbCheckboxImports],
  template: `
    <div class="flex flex-col gap-3">
      <hb-checkbox [hbChecked]="true">Default</hb-checkbox>
      <hb-checkbox [hbChecked]="true" hbStatus="success">Success</hb-checkbox>
      <hb-checkbox [hbChecked]="true" hbStatus="warning">Warning</hb-checkbox>
      <hb-checkbox [hbChecked]="true" hbStatus="error">Error</hb-checkbox>
      <hb-checkbox [hbInvalid]="true">Invalid (aria-invalid)</hb-checkbox>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCheckboxStatusesComponent {}
