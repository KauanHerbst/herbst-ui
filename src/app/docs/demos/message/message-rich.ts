import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbMessageImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDownloadSimple, phosphorFilePdf } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-message-rich',
  imports: [HbMessageImports, HbButtonComponent, NgIcon],
  viewProviders: [provideIcons({ phosphorFilePdf, phosphorDownloadSimple })],
  template: `
    <hb-message hbAlign="start" class="max-w-md">
      <hb-message-avatar hbName="Herbst Bot" hbShape="square" [hbSize]="40" />
      <hb-message-content>
        <hb-message-header>Herbst Bot · shared a file</hb-message-header>

        <div class="w-fit rounded-lg rounded-bl-sm bg-muted px-3 py-2 text-sm">
          Here is the photo from the Black Forest trip.
        </div>

        <hb-message-attachments>
          <div class="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
            <ng-icon name="phosphorFilePdf" class="text-muted-foreground" />
            <span>black-forest.pdf</span>
            <button hb-button hbType="ghost" hbSize="icon" aria-label="Download">
              <ng-icon name="phosphorDownloadSimple" />
            </button>
          </div>
        </hb-message-attachments>

        <hb-message-footer>Just now · unread</hb-message-footer>
      </hb-message-content>
    </hb-message>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMessageRichComponent {}
