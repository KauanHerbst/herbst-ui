import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbInputOtpImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-input-otp-states',
  imports: [HbInputOtpImports],
  template: `
    <div class="flex flex-col gap-4">
      <hb-input-otp [hbValue]="'1234'" [hbMaxLength]="4" hbStatus="success" hbReadonly>
        <hb-input-otp-group>
          <hb-input-otp-slot [hbIndex]="0" />
          <hb-input-otp-slot [hbIndex]="1" />
          <hb-input-otp-slot [hbIndex]="2" />
          <hb-input-otp-slot [hbIndex]="3" />
        </hb-input-otp-group>
      </hb-input-otp>

      <hb-input-otp [hbValue]="'12'" [hbMaxLength]="4" hbInvalid>
        <hb-input-otp-group>
          <hb-input-otp-slot [hbIndex]="0" />
          <hb-input-otp-slot [hbIndex]="1" />
          <hb-input-otp-slot [hbIndex]="2" />
          <hb-input-otp-slot [hbIndex]="3" />
        </hb-input-otp-group>
      </hb-input-otp>

      <hb-input-otp [hbValue]="'99'" [hbMaxLength]="4" [hbRing]="false" hbDisabled>
        <hb-input-otp-group>
          <hb-input-otp-slot [hbIndex]="0" />
          <hb-input-otp-slot [hbIndex]="1" />
          <hb-input-otp-slot [hbIndex]="2" />
          <hb-input-otp-slot [hbIndex]="3" />
        </hb-input-otp-group>
      </hb-input-otp>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoInputOtpStatesComponent {}
