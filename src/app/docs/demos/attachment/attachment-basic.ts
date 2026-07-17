import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { provideIcons } from '@ng-icons/core';
import { phosphorFilePdf } from '@ng-icons/phosphor-icons/regular';

import { HbAttachmentImports, HbButtonComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-attachment-basic',
  imports: [HbAttachmentImports, HbButtonComponent],
  providers: [provideIcons({ phosphorFilePdf })],
  template: `
    @if (!removed()) {
      <hb-attachment
        class="max-w-sm"
        hbIcon="phosphorFilePdf"
        hbName="autumn-walk.pdf"
        hbDescription="248 KB · PDF"
        hbRemovable
        (hbRemove)="removed.set(true)"
      />
    } @else {
      <button hb-button hbType="outline" hbSize="sm" (click)="removed.set(false)">Restore</button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAttachmentBasicComponent {
  protected readonly removed = signal(false);
}
