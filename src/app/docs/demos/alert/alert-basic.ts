import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAlertComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-alert-basic',
  imports: [HbAlertComponent],
  template: `
    <hb-alert
      class="max-w-lg"
      hbTitle="Photo saved"
      hbDescription="Your photo of falling leaves was added to the Herbst album."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAlertBasicComponent {}
