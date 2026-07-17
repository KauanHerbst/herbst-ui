import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAccordionImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-accordion-disabled',
  imports: [HbAccordionImports],
  template: `
    <hb-accordion class="w-full max-w-md" hbBordered="card" hbDefaultValue="one">
      <hb-accordion-item hbValue="one" hbTitle="Available section">
        A card-bordered accordion groups its items inside a single framed surface.
      </hb-accordion-item>
      <hb-accordion-item hbValue="two" hbTitle="Disabled section" hbDisabled>
        This item cannot be opened while it is disabled.
      </hb-accordion-item>
      <hb-accordion-item hbValue="three" hbTitle="Another section">
        Disabled items stay visible so the structure of the content is never lost.
      </hb-accordion-item>
    </hb-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAccordionDisabledComponent {}
