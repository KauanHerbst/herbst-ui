import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbChipComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-chip-types',
  imports: [HbChipComponent],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <span hb-chip>Default</span>
      <span hb-chip hbType="secondary">Secondary</span>
      <span hb-chip hbType="outline">Outline</span>
      <span hb-chip hbType="success">Success</span>
      <span hb-chip hbType="warning">Warning</span>
      <span hb-chip hbType="destructive">Destructive</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoChipTypesComponent {}
