import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAlertComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-alert-minimal',
  imports: [HbAlertComponent],
  template: `
    <div class="flex w-full max-w-lg flex-col gap-3">
      <hb-alert hbType="success" hbTitle="Title only — a short confirmation with no body text." />
      <hb-alert
        hbIcon="none"
        hbDescription="Description only, icon removed — a quiet inline note without a heading."
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAlertMinimalComponent {}
