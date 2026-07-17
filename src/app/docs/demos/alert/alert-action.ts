import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAlertComponent, HbButtonComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-alert-action',
  imports: [HbAlertComponent, HbButtonComponent],
  template: `
    <hb-alert
      class="max-w-lg"
      hbType="warning"
      hbTitle="Photo removed"
      hbDescription="Your photo of falling leaves was moved to the trash."
    >
      <button hb-button hbType="outline" hbSize="sm" hbAlertAction class="self-center">Undo</button>
    </hb-alert>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAlertActionComponent {}
