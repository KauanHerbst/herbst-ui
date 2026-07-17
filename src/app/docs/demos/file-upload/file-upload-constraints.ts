import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbFileUploadImports, type HbUploadError } from '@herbst/ui';

@Component({
  selector: 'hb-demo-file-upload-constraints',
  imports: [HbFileUploadImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-2">
      <hb-file-upload
        hbMultiple
        hbAccept="image/*"
        [hbMaxFileSize]="1048576"
        [hbFileLimit]="2"
        hbDropLabel="Images only · up to 1 MB · max 2 files"
        (hbUploadError)="onError($event)"
      />

      <p class="font-mono text-[12px] text-muted-foreground">{{ error() || 'No errors yet.' }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoFileUploadConstraintsComponent {
  protected readonly error = signal('');

  protected onError(event: HbUploadError): void {
    this.error.set(event.reason + ' — ' + event.message);
  }
}
