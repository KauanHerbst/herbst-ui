import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDownloadSimple } from '@ng-icons/phosphor-icons/regular';

import { HbAttachmentImports, HbButtonComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-attachment-interactive',
  imports: [HbAttachmentImports, HbButtonComponent, NgIcon],
  providers: [provideIcons({ phosphorDownloadSimple })],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-3">
      <hb-attachment
        hbClickable
        hbName="falling-leaves.jpg"
        hbDescription="Click to preview"
        (hbClick)="opened.set(opened() + 1)"
      >
        <button hb-button hbType="ghost" hbSize="icon" hbAttachmentAction aria-label="Download">
          <ng-icon name="phosphorDownloadSimple" />
        </button>
      </hb-attachment>

      <hb-attachment hbDisabled hbName="archived.zip" hbDescription="Disabled — no interaction" />

      <p class="font-mono text-[12px] text-muted-foreground">Opened {{ opened() }}×</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAttachmentInteractiveComponent {
  protected readonly opened = signal(0);
}
