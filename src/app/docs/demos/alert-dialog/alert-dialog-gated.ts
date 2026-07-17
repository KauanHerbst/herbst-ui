import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbAlertDialogComponent, HbButtonComponent, HbCheckboxImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-alert-dialog-gated',
  imports: [HbAlertDialogComponent, HbButtonComponent, HbCheckboxImports],
  template: `
    <div class="flex flex-col items-start gap-3">
      <hb-alert-dialog
        hbTitle="Confirm cataloguing"
        hbDescription="Tick the box to enable the confirm action."
        hbOkText="Catalogue"
        [hbOkDisabled]="!agreed()"
        [hbData]="{ id: 'HB·003' }"
        (hbOk)="onOk($event)"
        (hbCancel)="onCancel()"
      >
        <button hb-button hbAlertDialogTrigger>Review photo</button>

        <div hbAlertDialogContent>
          <hb-checkbox [hbChecked]="agreed()" (hbCheckedChange)="agreed.set($event)">
            I understand the photo will be shared publicly.
          </hb-checkbox>
        </div>
      </hb-alert-dialog>

      <p class="font-mono text-[12px] text-muted-foreground">{{ result() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAlertDialogGatedComponent {
  protected readonly agreed = signal(false);
  protected readonly result = signal('No action yet.');

  protected onOk(data: object | undefined): void {
    this.result.set('Uploaded ' + (data as { id: string }).id + '.');
    this.agreed.set(false);
  }

  protected onCancel(): void {
    this.result.set('Cancelled.');
    this.agreed.set(false);
  }
}
