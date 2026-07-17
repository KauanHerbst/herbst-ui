import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbStepperImports, type HbStepValue } from '@herbst/ui';
import { provideIcons } from '@ng-icons/core';
import {
  phosphorCheckCircle,
  phosphorEnvelope,
  phosphorLock,
  phosphorTag,
} from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-stepper-linear',
  imports: [HbStepperImports, HbButtonComponent],
  viewProviders: [
    provideIcons({ phosphorTag, phosphorEnvelope, phosphorLock, phosphorCheckCircle }),
  ],
  template: `
    <div class="flex w-full max-w-lg flex-col gap-4">
      <hb-stepper #ref="hbStepper" hbLinear [(hbValue)]="active">
        <hb-step hbTitle="Cart" hbIcon="phosphorTag" />
        <hb-step hbTitle="Shipping" hbIcon="phosphorEnvelope" />
        <hb-step hbTitle="Payment" hbIcon="phosphorLock" />
        <hb-step hbTitle="Done" hbIcon="phosphorCheckCircle" />
      </hb-stepper>

      <div class="flex justify-between">
        <button
          hb-button
          hbType="outline"
          hbSize="sm"
          [hbDisabled]="ref.isFirst()"
          (click)="ref.prev()"
        >
          Back
        </button>
        <button hb-button hbSize="sm" [hbDisabled]="ref.isLast()" (click)="ref.next()">Next</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoStepperLinearComponent {
  protected readonly active = signal<HbStepValue>(1);
}
