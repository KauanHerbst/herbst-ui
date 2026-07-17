import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbSwitchImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-switch-cards',
  imports: [HbSwitchImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-3">
      <hb-switch-card [(hbChecked)]="auto">
        <p class="font-medium">Auto-upload</p>
        <p class="text-sm text-muted-foreground">Upload new photos as they arrive.</p>
      </hb-switch-card>

      <hb-switch-card [hbChecked]="true" hbStatus="success">
        <p class="font-medium">Nightly backups</p>
        <p class="text-sm text-muted-foreground">Snapshot the collection to cold storage.</p>
      </hb-switch-card>

      <hb-switch-card [hbIndicator]="false" hbDisabled>
        <p class="font-medium">Legacy sync</p>
        <p class="text-sm text-muted-foreground">Disabled, and without the indicator.</p>
      </hb-switch-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSwitchCardsComponent {
  protected readonly auto = signal(true);
}
