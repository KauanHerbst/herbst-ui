import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbFieldImports, HbInputDirective } from '@herbst/ui';

@Component({
  selector: 'hb-demo-field-set',
  imports: [HbFieldImports, HbInputDirective],
  template: `
    <fieldset hb-field-set class="w-full max-w-md">
      <legend hb-field-legend>Photo details</legend>

      <hb-field-group [hbColumns]="2">
        <hb-field>
          <label hb-field-label>City</label>
          <input hb-input placeholder="Freiburg" />
        </hb-field>
        <hb-field>
          <label hb-field-label>Season</label>
          <input hb-input placeholder="Autumn" />
        </hb-field>
      </hb-field-group>

      <hb-field-separator />

      <hb-field>
        <label hb-field-label>Notes</label>
        <input hb-input placeholder="Oak leaves turning amber along the trail…" />
      </hb-field>
    </fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoFieldSetComponent {}
