import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAlertDialogComponent, HbButtonComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-alert-dialog-placement',
  imports: [HbAlertDialogComponent, HbButtonComponent],
  template: `
    <div class="flex flex-wrap gap-3">
      <hb-alert-dialog
        hbTitle="Corner toast"
        hbDescription="A compact dialog anchored to the top-right corner."
        hbPosition="top-right"
        hbWidth="22rem"
      >
        <button hb-button hbType="outline" hbAlertDialogTrigger>top-right</button>
      </hb-alert-dialog>

      <hb-alert-dialog
        hbTitle="Wide, split footer"
        hbDescription="A wider centered dialog with the footer actions pushed apart."
        hbWidth="40rem"
        hbFooterAlign="between"
        hbCancelText="Back"
        hbOkText="Continue"
      >
        <button hb-button hbType="outline" hbAlertDialogTrigger>wide · between</button>
      </hb-alert-dialog>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAlertDialogPlacementComponent {}
