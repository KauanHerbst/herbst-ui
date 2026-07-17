import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMinus } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-input-otp-separator',
  imports: [NgIcon],
  viewProviders: [provideIcons({ phosphorMinus })],
  template: `<ng-content><ng-icon name="phosphorMinus" /></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'separator',
    class: 'inline-flex items-center text-muted-foreground',
    '[attr.data-slot]': "'input-otp-separator'",
  },
  exportAs: 'hbInputOtpSeparator',
})
export class HbInputOtpSeparatorComponent {}
