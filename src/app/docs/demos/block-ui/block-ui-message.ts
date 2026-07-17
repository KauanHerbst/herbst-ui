import { ChangeDetectionStrategy, Component } from '@angular/core';

import { provideIcons } from '@ng-icons/core';
import { phosphorLock } from '@ng-icons/phosphor-icons/regular';

import { HbBlockUiComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-block-ui-message',
  imports: [HbBlockUiComponent],
  providers: [provideIcons({ phosphorLock })],
  template: `
    <hb-block-ui
      [hbBlocked]="true"
      hbIcon="phosphorLock"
      class="w-full max-w-sm rounded-lg border border-border"
    >
      <span hbBlockUiContent class="text-sm font-medium text-foreground">Archived — read only</span>

      <div class="flex flex-col gap-1 p-6">
        <h3 class="font-medium">October in the Black Forest</h3>
        <p class="text-sm text-muted-foreground">
          This photo was archived and can no longer be edited.
        </p>
      </div>
    </hb-block-ui>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBlockUiMessageComponent {}
