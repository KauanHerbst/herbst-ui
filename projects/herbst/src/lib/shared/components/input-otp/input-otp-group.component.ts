import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hb-input-otp-group',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'flex items-center', '[attr.data-slot]': "'input-otp-group'" },
  exportAs: 'hbInputOtpGroup',
})
export class HbInputOtpGroupComponent {}
