import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbInputDirective } from '@herbst/ui';

@Component({
  selector: 'hb-demo-input-status',
  imports: [HbInputDirective],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-3">
      <input hb-input hbStatus="success" value="Autumn morning" />
      <input hb-input hbStatus="warning" value="Missing city" />
      <input hb-input hbStatus="error" value="Duplicate title" />
      <input hb-input hbInvalid value="aria-invalid, no status" />
      <input hb-input [hbRing]="false" placeholder="No focus ring" />
      <input hb-input hbBorderless placeholder="Borderless" />
      <input hb-input value="Disabled" disabled />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoInputStatusComponent {}
