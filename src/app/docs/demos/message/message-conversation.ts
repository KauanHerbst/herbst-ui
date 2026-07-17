import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbMessageImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorArrowRight } from '@ng-icons/phosphor-icons/regular';

const portrait =
  'data:image/svg+xml,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='#A64B2A'/><stop offset='1' stop-color='#6B7A55'/>" +
      '</linearGradient></defs>' +
      "<rect width='64' height='64' fill='url(#g)'/></svg>",
  );

@Component({
  selector: 'hb-demo-message-conversation',
  imports: [HbMessageImports, HbButtonComponent, NgIcon],
  viewProviders: [provideIcons({ phosphorArrowRight })],
  template: `
    <hb-message-group class="flex w-full max-w-md flex-col gap-4">
      <hb-message hbAlign="start">
        <hb-message-avatar [hbSrc]="portrait" hbName="Ana Silva" hbStatus="online" />
        <hb-message-content>
          <div class="w-fit rounded-lg rounded-bl-sm bg-muted px-3 py-2 text-sm">
            Where did you take it?
          </div>
        </hb-message-content>
      </hb-message>

      <hb-message hbAlign="end">
        <hb-message-avatar hbName="You" />
        <hb-message-content>
          <div
            class="w-fit rounded-lg rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground"
          >
            In the Black Forest, near Freiburg.
          </div>
          <hb-message-footer>
            10:27
            <hb-message-actions>
              <button hb-button hbType="ghost" hbSize="icon" aria-label="Forward">
                <ng-icon name="phosphorArrowRight" />
              </button>
            </hb-message-actions>
          </hb-message-footer>
        </hb-message-content>
      </hb-message>
    </hb-message-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMessageConversationComponent {
  protected readonly portrait = portrait;
}
