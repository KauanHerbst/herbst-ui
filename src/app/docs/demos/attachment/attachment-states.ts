import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAttachmentImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-attachment-states',
  imports: [HbAttachmentImports],
  template: `
    <hb-attachment-group hbOrientation="vertical" class="w-full max-w-sm">
      <hb-attachment
        hbState="uploading"
        [hbProgress]="40"
        hbName="oak-leaves.tiff"
        hbDescription="Uploading… 40%"
      />
      <hb-attachment
        hbState="processing"
        [hbProgress]="80"
        hbName="forest-path.png"
        hbDescription="Processing… 80%"
      />
      <hb-attachment hbState="error" hbName="foggy-morning.raw" hbDescription="Upload failed" />
      <hb-attachment hbState="done" hbName="chestnuts.jpg" hbDescription="1.2 MB · JPEG" />
    </hb-attachment-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAttachmentStatesComponent {}
