import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbSwitchImports } from '@herbst/ui';
import { provideIcons } from '@ng-icons/core';
import { phosphorCheck, phosphorX } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-switch-basic',
  imports: [HbSwitchImports],
  viewProviders: [provideIcons({ phosphorCheck, phosphorX })],
  template: `
    <div class="flex flex-col items-start gap-3">
      <hb-switch [(hbChecked)]="notify" hbCheckedIcon="phosphorCheck" hbUncheckedIcon="phosphorX">
        Email notifications
      </hb-switch>

      <hb-switch [hbChecked]="true" hbLabelPosition="start">Label at the start</hb-switch>

      <p class="font-mono text-[12px] text-muted-foreground">notify: {{ notify() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSwitchBasicComponent {
  protected readonly notify = signal(true);
}
