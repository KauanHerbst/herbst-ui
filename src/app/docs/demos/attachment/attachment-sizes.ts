import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAttachmentImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-attachment-sizes',
  imports: [HbAttachmentImports],
  template: `
    <hb-attachment-group hbOrientation="vertical" class="w-full max-w-sm">
      <hb-attachment hbSize="xs" hbName="xs.pdf" hbDescription="extra small" />
      <hb-attachment hbSize="sm" hbName="sm.pdf" hbDescription="small" />
      <hb-attachment hbSize="md" hbName="md.pdf" hbDescription="medium" />
      <hb-attachment hbSize="lg" hbName="lg.pdf" hbDescription="large" />
      <hb-attachment hbSize="xl" hbName="xl.pdf" hbDescription="extra large" />
    </hb-attachment-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAttachmentSizesComponent {}
