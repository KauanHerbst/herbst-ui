import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbPaginationImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-pagination-basic',
  imports: [HbPaginationImports],
  template: `
    <div class="flex flex-col items-start gap-2">
      <hb-pagination [(hbPage)]="page" [hbTotal]="248" [hbPageSize]="10" />
      <p class="font-mono text-[12px] text-muted-foreground">Page {{ page() }} of 25</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoPaginationBasicComponent {
  protected readonly page = signal(1);
}
