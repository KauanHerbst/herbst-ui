import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAlertComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-alert-icon',
  imports: [HbAlertComponent],
  template: `
    <div class="flex w-full max-w-lg flex-col gap-3">
      <hb-alert
        hbType="success"
        hbIcon="phosphorWarning"
        hbTitle="Overridden icon"
        hbDescription="Any registered icon name passed to hbIcon replaces the default for the type."
      />
      <hb-alert
        hbIcon="none"
        hbTitle="No icon"
        hbDescription="Set hbIcon to none to drop the leading mark and align the text flush left."
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAlertIconComponent {}
