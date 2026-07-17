import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbTooltipImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-tooltip-advanced',
  imports: [HbTooltipImports, HbButtonComponent],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <button
        hb-button
        hbType="secondary"
        hbTooltip=""
        hbTooltipTrigger="click"
        [hbTooltipContent]="rich"
        [hbTooltipContentContext]="{ city: 'Freiburg' }"
        hbTooltipArrow
      >
        Click · rich content
      </button>

      <button
        hb-button
        hbType="outline"
        hbTooltip="Snappy: 0ms open, instant close"
        [hbTooltipDelay]="{ open: 0, close: 0 }"
      >
        Custom delay
      </button>

      <button hb-button hbType="ghost" hbTooltip="You won't see this" hbTooltipDisabled>
        Disabled tooltip
      </button>

      <button
        hb-button
        hbTooltip="Controlled by the button"
        hbTooltipTrigger="manual"
        [hbTooltipOpen]="open()"
        (hbTooltipOpenChange)="open.set($event)"
        (click)="open.set(!open())"
      >
        Toggle: {{ open() ? 'open' : 'closed' }}
      </button>
    </div>

    <ng-template #rich let-ctx>
      <div class="flex flex-col gap-0.5">
        <span class="font-semibold">Oak leaves</span>
        <span class="opacity-80">Taken in {{ ctx.city }}</span>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTooltipAdvancedComponent {
  protected readonly open = signal(false);
}
