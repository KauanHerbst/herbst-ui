import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbSkeletonImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-skeleton-presets',
  imports: [HbSkeletonImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-6">
      <hb-skeleton-avatar hbSize="lg" hbText />

      <hb-skeleton-text [hbLines]="4" hbLastWidth="40%" />

      <div class="flex items-center gap-2">
        <hb-skeleton-button hbWidth="6rem" />
        <hb-skeleton-input />
      </div>

      <hb-skeleton-card [hbLines]="2" hbMediaHeight="8rem" hbFooter />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSkeletonPresetsComponent {}
