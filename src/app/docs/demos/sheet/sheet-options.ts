import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbSheetImports } from '@herbst/ui';
import { provideIcons } from '@ng-icons/core';
import { phosphorTrash, phosphorWarning } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-sheet-options',
  imports: [HbSheetImports, HbButtonComponent],
  viewProviders: [provideIcons({ phosphorWarning, phosphorTrash })],
  template: `
    <div class="flex flex-col items-start gap-2">
      <hb-sheet
        hbSide="bottom"
        hbSize="16rem"
        hbIcon="phosphorWarning"
        hbTitle="Delete photo?"
        hbDescription="IMG·019 will be removed from the album. This cannot be undone."
        hbOkText="Delete"
        hbOkType="destructive"
        hbOkIcon="phosphorTrash"
        hbCancelText="Keep"
        hbFooterAlign="between"
        [hbShowClose]="false"
        [hbData]="{ id: 'IMG-019' }"
        (hbOk)="log.set('deleted ' + $any($event).id)"
        (hbCancel)="log.set('kept')"
      >
        <button hbSheetTrigger hb-button hbType="destructive">Delete…</button>
        <div hbSheetContent>
          <p class="text-sm text-muted-foreground">
            Confirm the removal, or keep the photo in place.
          </p>
        </div>
      </hb-sheet>

      <p class="font-mono text-[12px] text-muted-foreground">{{ log() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSheetOptionsComponent {
  protected readonly log = signal('—');
}
