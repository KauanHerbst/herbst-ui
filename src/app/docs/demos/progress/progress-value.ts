import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbProgressImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-progress-value',
  imports: [HbProgressImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-4">
      <hb-progress [hbValue]="64" hbSize="xl" hbShowValue hbValuePosition="inside" />

      <hb-progress
        [hbValue]="7"
        [hbMax]="10"
        hbSize="lg"
        hbType="success"
        hbShowValue
        hbValuePosition="inside"
        hbFormat="fraction"
        hbBarClass="bg-gradient-to-r from-success to-primary"
      />

      <hb-progress [hbValue]="42" hbLabel="Photos" hbShowValue>
        <ng-template hbValueTemplate let-value="value" let-max="max">
          {{ value }} of {{ max }} photos
        </ng-template>
      </hb-progress>

      <hb-progress hbIndeterminate hbLabel="Uploading photos" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoProgressValueComponent {}
