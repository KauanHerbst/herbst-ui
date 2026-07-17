import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbScrollAreaImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-scroll-area-controls',
  imports: [HbScrollAreaImports, HbButtonComponent],
  template: `
    <div class="flex w-full max-w-xs flex-col gap-2">
      <div class="flex gap-2">
        <button hb-button hbType="outline" hbSize="sm" (click)="ref.scrollToTop()">Top</button>
        <button hb-button hbType="outline" hbSize="sm" (click)="ref.scrollToBottom()">
          Bottom
        </button>
      </div>

      <hb-scroll-area
        #ref="hbScrollArea"
        hbType="scroll"
        [hbHideDelay]="1000"
        (hbReachEnd)="log.set('reached ' + $event)"
        class="h-56 rounded-md border border-border"
      >
        <div class="flex flex-col gap-2 p-4">
          @for (n of items; track n) {
            <div class="rounded-md border border-border px-3 py-2 text-sm">Entry {{ n }}</div>
          }
        </div>
      </hb-scroll-area>

      <p class="font-mono text-[12px] text-muted-foreground">
        {{ log() }} · atBottom: {{ ref.atBottom() }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoScrollAreaControlsComponent {
  protected readonly items = Array.from({ length: 24 }, (_, i) => i + 1);
  protected readonly log = signal('idle');
}
