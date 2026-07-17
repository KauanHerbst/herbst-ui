import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAccordionImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-accordion-non-collapsible',
  imports: [HbAccordionImports],
  template: `
    <hb-accordion class="w-full max-w-md" [hbCollapsible]="false" hbDefaultValue="first">
      <hb-accordion-item hbValue="first" hbTitle="Always one open">
        With hbCollapsible set to false the open item cannot be closed — you can only move to
        another one.
      </hb-accordion-item>
      <hb-accordion-item hbValue="second" hbTitle="Never empty">
        Selecting a header opens it and keeps exactly one section visible at all times.
      </hb-accordion-item>
      <hb-accordion-item hbValue="third" hbTitle="Guided reading">
        Useful when you always want to keep the reader on a single active section.
      </hb-accordion-item>
    </hb-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAccordionNonCollapsibleComponent {}
