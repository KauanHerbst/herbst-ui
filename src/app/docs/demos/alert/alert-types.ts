import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAlertComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-alert-types',
  imports: [HbAlertComponent],
  template: `
    <div class="flex w-full max-w-lg flex-col gap-3">
      <hb-alert hbTitle="Default" hbDescription="A quiet note about the turning season." />
      <hb-alert
        hbType="success"
        hbTitle="Success"
        hbDescription="Your autumn walk was saved to the journal."
      />
      <hb-alert
        hbType="warning"
        hbTitle="Warning"
        hbDescription="Frost is expected tonight — cover the balcony plants."
      />
      <hb-alert
        hbType="destructive"
        hbTitle="Destructive"
        hbDescription="This photo was removed from the album."
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAlertTypesComponent {}
