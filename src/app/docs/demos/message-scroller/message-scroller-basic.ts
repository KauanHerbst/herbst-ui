import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbMessageScrollerImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-message-scroller-basic',
  imports: [HbMessageScrollerImports, HbButtonComponent],
  template: `
    <div class="flex w-full max-w-md flex-col gap-2">
      <hb-message-scroller hbAutoScroll class="h-64 rounded-md border border-border">
        <hb-message-scroller-viewport>
          <hb-message-scroller-content class="flex flex-col gap-2 p-3">
            @for (line of lines(); track $index) {
              <hb-message-scroller-item [hbMessageId]="'m-' + $index">
                <div class="w-fit rounded-lg bg-muted px-3 py-2 text-sm">{{ line }}</div>
              </hb-message-scroller-item>
            }
          </hb-message-scroller-content>
        </hb-message-scroller-viewport>

        <hb-message-scroller-button />
      </hb-message-scroller>

      <button hb-button hbSize="sm" class="self-start" (click)="send()">Send message</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMessageScrollerBasicComponent {
  protected readonly lines = signal(
    Array.from(
      { length: 8 },
      (_, i) => `Autumn note #${i + 1} — leaves, weather, and city recorded.`,
    ),
  );

  protected send(): void {
    this.lines.update((list) => [...list, `New note #${list.length + 1} just added.`]);
  }
}
