import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAccordionImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-accordion-multiple',
  imports: [HbAccordionImports],
  template: `
    <hb-accordion class="w-full max-w-md" hbType="multiple" [hbDefaultValue]="['leaves', 'light']">
      <hb-accordion-item hbValue="leaves" hbTitle="Falling leaves">
        Amber and rust drifting over cobblestone — the palette the theme is built from.
      </hb-accordion-item>
      <hb-accordion-item hbValue="light" hbTitle="Low, warm light">
        Long shadows and a quiet haze; the same restraint the components keep.
      </hb-accordion-item>
      <hb-accordion-item hbValue="mist" hbTitle="October mist">
        A cool paper backdrop that lets a single ember of colour do the work.
      </hb-accordion-item>
    </hb-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAccordionMultipleComponent {}
