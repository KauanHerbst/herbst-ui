import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAccordionImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-accordion-basic',
  imports: [HbAccordionImports],
  template: `
    <hb-accordion class="w-full max-w-md" hbDefaultValue="item-1">
      <hb-accordion-item hbValue="item-1" hbTitle="What is Herbst UI?">
        A copy-paste component collection for Angular, tuned to the light of a German autumn.
      </hb-accordion-item>
      <hb-accordion-item hbValue="item-2" hbTitle="Is the code really mine?">
        Yes. Components live inside your project, so every token, class, and line is yours to edit.
      </hb-accordion-item>
      <hb-accordion-item hbValue="item-3" hbTitle="Does it support dark mode?">
        Every component reads semantic CSS variables that turn with the .dark class.
      </hb-accordion-item>
    </hb-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAccordionBasicComponent {}
