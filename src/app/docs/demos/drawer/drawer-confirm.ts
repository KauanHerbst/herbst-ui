import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { provideIcons } from '@ng-icons/core';
import { phosphorWarning } from '@ng-icons/phosphor-icons/regular';

import { HbButtonComponent, HbDrawerImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-drawer-confirm',
  imports: [HbDrawerImports, HbButtonComponent],
  providers: [provideIcons({ phosphorWarning })],
  template: `
    <div class="flex flex-col items-start gap-3">
      <hb-drawer
        hbSide="bottom"
        hbIcon="phosphorWarning"
        hbTitle="Delete photo?"
        hbDescription="Your autumn walk photo will be removed from the album."
        hbOkType="destructive"
        hbOkText="Delete"
        hbCancelText="Keep it"
        hbFooterAlign="between"
        [hbData]="{ id: 'IMG·041' }"
        (hbOk)="onOk($event)"
        (hbCancel)="result.set('Kept')"
      >
        <button hb-button hbType="destructive" hbDrawerTrigger>Delete</button>
        <div hbDrawerContent class="text-sm text-muted-foreground">
          This action cannot be undone.
        </div>
      </hb-drawer>

      <p class="font-mono text-[12px] text-muted-foreground">{{ result() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoDrawerConfirmComponent {
  protected readonly result = signal('No action yet.');

  protected onOk(data: object | undefined): void {
    this.result.set('Deleted ' + (data as { id: string }).id);
  }
}
