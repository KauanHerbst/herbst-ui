import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbPaginationImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-pagination-templates',
  imports: [HbPaginationImports],
  template: `
    <hb-pagination [(hbPage)]="page" [hbPageCount]="12" [hbShowPrevNext]="false">
      <ng-template hbPageTemplate let-value let-active="active">
        <button
          type="button"
          class="size-8 rounded-full text-sm transition-colors"
          [class.bg-primary]="active"
          [class.text-primary-foreground]="active"
          [class.hover:bg-accent]="!active"
          (click)="page.set(value)"
        >
          {{ value }}
        </button>
      </ng-template>

      <ng-template hbEllipsisTemplate let-side>
        <span class="px-1 text-muted-foreground">{{ side === 'left' ? '‹‹' : '››' }}</span>
      </ng-template>
    </hb-pagination>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoPaginationTemplatesComponent {
  protected readonly page = signal(6);
}
