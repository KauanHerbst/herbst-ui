import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbMessageScrollerImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-message-scroller-controls',
  imports: [HbMessageScrollerImports, HbButtonComponent],
  template: `
    <div class="flex w-full max-w-md flex-col gap-2">
      <div class="flex flex-wrap gap-2">
        <button hb-button hbType="outline" hbSize="sm" (click)="ref.scrollToStart()">Top</button>
        <button hb-button hbType="outline" hbSize="sm" (click)="ref.scrollToMessage('m-9')">
          Jump to #10
        </button>
        <button hb-button hbType="outline" hbSize="sm" (click)="ref.scrollToEnd()">Latest</button>
      </div>

      <hb-message-scroller
        #ref="hbMessageScroller"
        hbDefaultScrollPosition="start"
        [hbScrollPreviousItemPeek]="16"
        class="h-64 rounded-md border border-border"
      >
        <hb-message-scroller-viewport>
          <hb-message-scroller-content class="flex flex-col gap-2 p-3">
            @for (i of indexes; track i) {
              <hb-message-scroller-item [hbMessageId]="'m-' + i" [hbScrollAnchor]="i === 9">
                <div class="w-fit rounded-lg bg-muted px-3 py-2 text-sm">
                  Message #{{ i + 1 }}{{ i === 9 ? ' · anchor' : '' }}
                </div>
              </hb-message-scroller-item>
            }
          </hb-message-scroller-content>
        </hb-message-scroller-viewport>

        <hb-message-scroller-button />
      </hb-message-scroller>

      <p class="font-mono text-[12px] text-muted-foreground">atBottom: {{ ref.atBottom() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMessageScrollerControlsComponent {
  protected readonly indexes = Array.from({ length: 16 }, (_, i) => i);
}
