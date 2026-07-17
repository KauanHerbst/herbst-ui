import { ChangeDetectionStrategy, Component } from '@angular/core';

import { provideIcons } from '@ng-icons/core';
import { phosphorWarning } from '@ng-icons/phosphor-icons/regular';

import { HbAlertDialogComponent, HbButtonComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-alert-dialog-confirm',
  imports: [HbAlertDialogComponent, HbButtonComponent],
  providers: [provideIcons({ phosphorWarning })],
  template: `
    <hb-alert-dialog
      hbIcon="phosphorWarning"
      hbTitle="Delete this photo?"
      hbDescription="Your autumn walk photo will be removed from the album. This cannot be undone."
      hbOkType="destructive"
      hbOkText="Delete"
      hbCancelText="Keep it"
    >
      <button hb-button hbType="destructive" hbAlertDialogTrigger>Delete</button>
    </hb-alert-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAlertDialogConfirmComponent {}
