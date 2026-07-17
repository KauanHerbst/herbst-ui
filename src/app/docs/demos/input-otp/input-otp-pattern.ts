import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbInputOtpImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-input-otp-pattern',
  imports: [HbInputOtpImports],
  template: `
    <hb-input-otp
      [(hbValue)]="code"
      [hbMaxLength]="5"
      hbPattern="alphanumeric"
      hbSize="lg"
      hbAriaLabel="Redemption code"
    >
      <hb-input-otp-group>
        <hb-input-otp-slot [hbIndex]="0" />
        <hb-input-otp-slot [hbIndex]="1" />
        <hb-input-otp-slot [hbIndex]="2" />
        <hb-input-otp-slot [hbIndex]="3" />
        <hb-input-otp-slot [hbIndex]="4" />
      </hb-input-otp-group>
    </hb-input-otp>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoInputOtpPatternComponent {
  protected readonly code = signal('');
}
