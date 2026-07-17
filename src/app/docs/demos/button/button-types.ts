import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-button-types',
  imports: [HbButtonComponent],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <button hb-button>Default</button>
      <button hb-button hbType="secondary">Secondary</button>
      <button hb-button hbType="outline">Outline</button>
      <button hb-button hbType="ghost">Ghost</button>
      <button hb-button hbType="success">Success</button>
      <button hb-button hbType="warning">Warning</button>
      <button hb-button hbType="destructive">Destructive</button>
      <button hb-button hbType="link">Link</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoButtonTypesComponent {}
