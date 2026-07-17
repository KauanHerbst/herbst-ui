import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbFieldImports, HbInputDirective } from '@herbst/ui';

@Component({
  selector: 'hb-demo-field-basic',
  imports: [HbFieldImports, HbInputDirective],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-6">
      <hb-field>
        <label hb-field-label hbRequired>Photo title</label>
        <input hb-input placeholder="Autumn in the Black Forest" />
        <hb-field-description>A short title for your photo.</hb-field-description>
      </hb-field>

      <hb-field hbInvalid>
        <label hb-field-label hbRequired>City</label>
        <input hb-input aria-invalid="true" placeholder="Freiburg" />
        <hb-field-error [hbErrors]="['A city is required.']" />
      </hb-field>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoFieldBasicComponent {}
