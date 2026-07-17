import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbStepperImports, type HbStepValue } from '@herbst/ui';

@Component({
  selector: 'hb-demo-stepper-vertical',
  imports: [HbStepperImports, HbButtonComponent],
  template: `
    <hb-stepper hbOrientation="vertical" class="w-full max-w-md" [(hbValue)]="active">
      <hb-step hbTitle="Walk" hbDescription="In the forest">
        <ng-template hbStepContent let-ctx>
          <p class="text-sm text-muted-foreground">Take photos of the falling leaves.</p>
          <button hb-button hbSize="sm" class="mt-2" (click)="ctx.next()">Next</button>
        </ng-template>
      </hb-step>

      <hb-step hbTitle="Edit" hbDescription="At home">
        <ng-template hbStepContent let-ctx>
          <p class="text-sm text-muted-foreground">Pick the best shots and add captions.</p>
          <div class="mt-2 flex gap-2">
            <button hb-button hbType="outline" hbSize="sm" (click)="ctx.prev()">Back</button>
            <button hb-button hbSize="sm" (click)="ctx.next()">Next</button>
          </div>
        </ng-template>
      </hb-step>

      <hb-step hbTitle="Archive" hbDescription="Locked" hbDisabled />
    </hb-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoStepperVerticalComponent {
  protected readonly active = signal<HbStepValue>(1);
}
