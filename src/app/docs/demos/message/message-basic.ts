import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbMessageImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-message-basic',
  imports: [HbMessageImports],
  template: `
    <hb-message hbAlign="start" class="max-w-md">
      <hb-message-avatar hbName="Ana Silva" hbStatus="online" />
      <hb-message-content>
        <hb-message-header>Ana Silva · 10:32</hb-message-header>
        <div class="w-fit rounded-lg rounded-bl-sm bg-muted px-3 py-2 text-sm">
          Walked through the Black Forest this morning — the oaks are turning.
        </div>
        <hb-message-footer>Delivered</hb-message-footer>
      </hb-message-content>
    </hb-message>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMessageBasicComponent {}
