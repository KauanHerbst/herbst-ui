import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbFileUploadImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-file-upload-basic',
  imports: [HbFileUploadImports],
  template: `
    <hb-file-upload class="block" hbMode="basic" hbChooseLabel="Attach a file" hbAccept=".pdf,.csv" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoFileUploadBasicComponent {}
