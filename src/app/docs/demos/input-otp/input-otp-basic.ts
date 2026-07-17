import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbInputOtpImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-input-otp-basic',
  imports: [HbInputOtpImports],
  template: `
    <div class="flex flex-col gap-3">
      <hb-input-otp [(hbValue)]="code" [hbMaxLength]="6" (hbComplete)="done.set($event)">
        <hb-input-otp-group>
          <hb-input-otp-slot [hbIndex]="0" />
          <hb-input-otp-slot [hbIndex]="1" />
          <hb-input-otp-slot [hbIndex]="2" />
        </hb-input-otp-group>
        <hb-input-otp-separator />
        <hb-input-otp-group>
          <hb-input-otp-slot [hbIndex]="3" />
          <hb-input-otp-slot [hbIndex]="4" />
          <hb-input-otp-slot [hbIndex]="5" />
        </hb-input-otp-group>
      </hb-input-otp>

      <p class="font-mono text-[12px] text-muted-foreground">
        Value: {{ code() || '—' }}{{ done() ? ' · complete' : '' }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoInputOtpBasicComponent {
  protected readonly code = signal('');
  protected readonly done = signal('');
}
