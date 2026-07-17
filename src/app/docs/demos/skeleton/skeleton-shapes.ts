import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbSkeletonImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-skeleton-shapes',
  imports: [HbSkeletonImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-4">
      <div class="flex items-center gap-3">
        <hb-skeleton hbShape="circle" hbSize="lg" />
        <div class="flex flex-1 flex-col gap-2">
          <hb-skeleton hbShape="text" hbSize="lg" hbWidth="70%" />
          <hb-skeleton hbShape="text" />
        </div>
      </div>

      <hb-skeleton hbHeight="6rem" hbRounded="lg" />

      <div class="flex items-center gap-3">
        <hb-skeleton hbShape="square" hbSize="md" hbAnimation="wave" />
        <hb-skeleton hbShape="square" hbSize="md" hbAnimation="none" />
        <hb-skeleton hbWidth="8rem" hbHeight="2rem" hbRounded="full" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSkeletonShapesComponent {}
