import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbSkeletonImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-skeleton-layouts',
  imports: [HbSkeletonImports],
  template: `
    <div class="flex w-full max-w-lg flex-col gap-8">
      <hb-skeleton-list [hbItems]="3" [hbLines]="2" hbAvatar hbAnimation="wave" />

      <hb-skeleton-form [hbFields]="2" hbButton />

      <hb-skeleton-table [hbRows]="4" [hbColumns]="3" hbHeader />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSkeletonLayoutsComponent {}
