import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAlertDialogComponent, HbButtonComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-alert-dialog-basic',
  imports: [HbAlertDialogComponent, HbButtonComponent],
  template: `
    <hb-alert-dialog
      hbTitle="Save this photo?"
      hbDescription="Your photo of falling leaves will be added to the Herbst album."
      hbOkText="Save"
    >
      <button hb-button hbType="outline" hbAlertDialogTrigger>Add photo</button>
    </hb-alert-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAlertDialogBasicComponent {}
