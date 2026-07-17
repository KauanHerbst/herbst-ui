import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbProgressImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-progress-status',
  imports: [HbProgressImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-4">
      <hb-progress [hbValue]="92" hbLabel="Digitised" hbShowValue hbType="success" hbSize="lg" />
      <hb-progress [hbValue]="58" hbLabel="In review" hbShowValue hbType="warning" hbShape="soft" />
      <hb-progress [hbValue]="14" hbLabel="Errors" hbShowValue hbType="destructive" hbSize="sm" />
      <hb-progress
        [hbValue]="70"
        [hbMax]="100"
        hbLabel="Storage"
        hbShowValue
        hbFormat="value"
        hbSize="xl"
        hbShape="square"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoProgressStatusComponent {}
