import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbBubbleImports } from '@herbst/ui';

const avatar =
  'data:image/svg+xml,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>" +
      "<rect width='64' height='64' fill='#A64B2A'/></svg>",
  );

@Component({
  selector: 'hb-demo-bubble-conversation',
  imports: [HbBubbleImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-4">
      <hb-bubble-group hbName="Kauan" [hbAvatar]="avatar" hbTime="10:24">
        <hb-bubble>Walked through the Black Forest this morning.</hb-bubble>
        <hb-bubble>The oaks are finally turning.</hb-bubble>
      </hb-bubble-group>

      <hb-bubble-group hbAlign="end" hbName="You" hbTime="10:26">
        <hb-bubble hbVariant="default" hbAlign="end">Nice — did you take photos?</hb-bubble>
      </hb-bubble-group>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBubbleConversationComponent {
  protected readonly avatar = avatar;
}
