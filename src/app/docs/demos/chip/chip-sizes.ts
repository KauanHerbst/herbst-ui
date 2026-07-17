import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbChipComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-chip-sizes',
  imports: [HbChipComponent],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <span hb-chip hbType="outline" hbSize="xs">xs</span>
      <span hb-chip hbType="outline" hbSize="sm">sm</span>
      <span hb-chip hbType="outline" hbSize="md">md</span>
      <span hb-chip hbType="outline" hbSize="lg">lg</span>
      <span hb-chip hbType="outline" hbSize="xl">xl</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoChipSizesComponent {}
