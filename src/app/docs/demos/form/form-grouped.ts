import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbFieldImports, HbFormComponent, HbInputDirective } from '@herbst/ui';

@Component({
  selector: 'hb-demo-form-grouped',
  imports: [HbFormComponent, HbFieldImports, HbInputDirective, HbButtonComponent],
  template: `
    <form hb-form class="w-full max-w-md" (submit)="$event.preventDefault()">
      <fieldset hb-field-set>
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

        <hb-field hbInvalid>
          <label hb-field-label hbRequired>Caption</label>
          <input hb-input aria-invalid="true" placeholder="A few words about the photo…" />
          <hb-field-error [hbErrors]="['A caption is required.']" />
        </hb-field>
      </fieldset>

      <button hb-button type="submit">Save photo</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoFormGroupedComponent {}
