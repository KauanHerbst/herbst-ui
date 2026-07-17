import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbProgressImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-progress-basic',
  imports: [HbProgressImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-4">
      <hb-progress [hbValue]="30" hbLabel="Digitising" hbShowValue />
      <hb-progress
        [hbValue]="72"
        [hbMax]="120"
        hbLabel="Cataloguing"
        hbShowValue
        hbFormat="fraction"
      />
      <hb-progress [hbValue]="100" hbLabel="Complete" hbShowValue hbType="success" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoProgressBasicComponent {}
