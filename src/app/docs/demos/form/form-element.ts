import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbFieldImports, HbFormComponent, HbInputDirective } from '@herbst/ui';

@Component({
  selector: 'hb-demo-form-element',
  imports: [HbFormComponent, HbFieldImports, HbInputDirective, HbButtonComponent],
  template: `
    <hb-form class="w-full max-w-sm gap-3">
      <hb-field hbOrientation="horizontal">
        <label hb-field-label>Album</label>
        <input hb-input placeholder="Herbst" />
      </hb-field>

      <hb-field hbOrientation="horizontal">
        <label hb-field-label>City</label>
        <input hb-input placeholder="Freiburg" />
      </hb-field>

      <button hb-button hbType="outline" class="self-start">Locate</button>
    </hb-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoFormElementComponent {}
