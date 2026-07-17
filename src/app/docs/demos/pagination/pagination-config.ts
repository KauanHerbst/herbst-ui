import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbPaginationImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-pagination-config',
  imports: [HbPaginationImports],
  template: `
    <div class="flex flex-col gap-5">
      <hb-pagination
        [(hbPage)]="page"
        [hbPageCount]="20"
        hbShowFirstLast
        [hbSiblings]="2"
        [hbBoundaries]="1"
        hbSize="sm"
      />

      <hb-pagination
        [(hbPage)]="page"
        [hbPageCount]="20"
        hbPreviousLabel="Previous"
        hbNextLabel="Next"
        hbSize="lg"
      />

      <hb-pagination [hbPage]="3" [hbPageCount]="20" hbDisabled />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoPaginationConfigComponent {
  protected readonly page = signal(8);
}
