import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAlertDialogComponent, HbButtonComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-alert-dialog-content',
  imports: [HbAlertDialogComponent, HbButtonComponent],
  template: `
    <hb-alert-dialog
      hbTitle="Herbst terms"
      hbDescription="Please read before sharing a photo."
      hbOkText="I understand"
      hbCancelText=""
      [hbClosable]="false"
    >
      <button hb-button hbAlertDialogTrigger>Open terms</button>

      <div hbAlertDialogContent class="flex flex-col gap-2 leading-relaxed text-muted-foreground">
        <p>Photos you share are added to the shared Herbst autumn album.</p>
        <p>Each photo keeps the date and the city where it was taken.</p>
        <p>With no cancel action and closing disabled, the reader must acknowledge to proceed.</p>
      </div>
    </hb-alert-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAlertDialogContentComponent {}
