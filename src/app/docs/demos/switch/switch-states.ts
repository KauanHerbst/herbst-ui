import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbSwitchImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-switch-states',
  imports: [HbSwitchImports],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-4">
        <hb-switch hbSize="xs" [hbChecked]="true" />
        <hb-switch hbSize="sm" [hbChecked]="true" />
        <hb-switch hbSize="md" [hbChecked]="true" />
        <hb-switch hbSize="lg" [hbChecked]="true" />
        <hb-switch hbSize="xl" [hbChecked]="true" />
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <hb-switch hbStatus="success" [hbChecked]="true">Success</hb-switch>
        <hb-switch hbStatus="warning" [hbChecked]="true">Warning</hb-switch>
        <hb-switch hbStatus="error" hbInvalid [hbChecked]="true">Error</hb-switch>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <hb-switch [hbChecked]="true" hbDisabled>Disabled on</hb-switch>
        <hb-switch hbDisabled>Disabled off</hb-switch>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSwitchStatesComponent {}
