import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbBadgeImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-badge-shapes',
  imports: [HbBadgeImports],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <span hb-badge hbShape="rounded">rounded</span>
      <span hb-badge hbShape="pill">pill</span>
      <span hb-badge hbShape="square">square</span>
      <span hb-badge hbShape="circle" hbType="destructive">3</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBadgeShapesComponent {}
