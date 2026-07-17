import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbSpinnerImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-spinner-sizes',
  imports: [HbSpinnerImports],
  template: `
    <div class="flex items-center gap-4">
      <hb-spinner hbSize="xs" />
      <hb-spinner hbSize="sm" />
      <hb-spinner hbSize="md" />
      <hb-spinner hbSize="lg" />
      <hb-spinner hbSize="xl" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSpinnerSizesComponent {}
