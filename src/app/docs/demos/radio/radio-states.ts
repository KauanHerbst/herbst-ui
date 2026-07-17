import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbRadioImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-radio-states',
  imports: [HbRadioImports],
  template: `
    <div class="flex flex-col gap-6">
      <hb-radio-group hbOrientation="horizontal" [hbValue]="'md'">
        <hb-radio [hbValue]="'xs'" hbSize="xs">xs</hb-radio>
        <hb-radio [hbValue]="'sm'" hbSize="sm">sm</hb-radio>
        <hb-radio [hbValue]="'md'" hbSize="md">md</hb-radio>
        <hb-radio [hbValue]="'lg'" hbSize="lg">lg</hb-radio>
        <hb-radio [hbValue]="'xl'" hbSize="xl">xl</hb-radio>
      </hb-radio-group>

      <hb-radio-group hbOrientation="horizontal" [hbValue]="'ok'" hbStatus="success">
        <hb-radio [hbValue]="'ok'">Approved</hb-radio>
        <hb-radio [hbValue]="'wait'">Pending</hb-radio>
      </hb-radio-group>

      <hb-radio-group hbOrientation="horizontal" [hbValue]="'bad'" hbStatus="error" hbInvalid>
        <hb-radio [hbValue]="'bad'">Rejected</hb-radio>
        <hb-radio [hbValue]="'redo'">Re-collect</hb-radio>
      </hb-radio-group>

      <hb-radio-group hbOrientation="horizontal" [hbValue]="'locked'" hbDisabled>
        <hb-radio [hbValue]="'locked'">Disabled selected</hb-radio>
        <hb-radio [hbValue]="'other'">Disabled</hb-radio>
      </hb-radio-group>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoRadioStatesComponent {}
