import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbBadgeImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-badge-sizes',
  imports: [HbBadgeImports],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <span hb-badge hbType="secondary" hbSize="xs">xs</span>
      <span hb-badge hbType="secondary" hbSize="sm">sm</span>
      <span hb-badge hbType="secondary" hbSize="md">md</span>
      <span hb-badge hbType="secondary" hbSize="lg">lg</span>
      <span hb-badge hbType="secondary" hbSize="xl">xl</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBadgeSizesComponent {}
