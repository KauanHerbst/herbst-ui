import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbStepperImports, type HbStepValue } from '@herbst/ui';

@Component({
  selector: 'hb-demo-stepper-basic',
  imports: [HbStepperImports, HbButtonComponent],
  template: `
    <hb-stepper class="w-full max-w-lg" [(hbValue)]="active">
      <hb-step hbTitle="Details" hbDescription="Photo info">
        <ng-template hbStepContent let-ctx>
          <div class="rounded-md border border-border p-4">
            <p class="text-sm text-muted-foreground">Enter the title and city.</p>
            <div class="mt-3 flex justify-end">
              <button hb-button hbSize="sm" (click)="ctx.next()">Next</button>
            </div>
          </div>
        </ng-template>
      </hb-step>

      <hb-step hbTitle="Photos" hbDescription="Upload">
        <ng-template hbStepContent let-ctx>
          <div class="rounded-md border border-border p-4">
            <p class="text-sm text-muted-foreground">Attach your autumn photos.</p>
            <div class="mt-3 flex justify-between">
              <button hb-button hbType="outline" hbSize="sm" (click)="ctx.prev()">Back</button>
              <button hb-button hbSize="sm" (click)="ctx.next()">Next</button>
            </div>
          </div>
        </ng-template>
      </hb-step>

      <hb-step hbTitle="Review" hbDescription="Confirm">
        <ng-template hbStepContent let-ctx>
          <div class="rounded-md border border-border p-4">
            <p class="text-sm text-muted-foreground">Everything looks good — save the record.</p>
            <div class="mt-3 flex justify-start">
              <button hb-button hbType="outline" hbSize="sm" (click)="ctx.prev()">Back</button>
            </div>
          </div>
        </ng-template>
      </hb-step>
    </hb-stepper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoStepperBasicComponent {
  protected readonly active = signal<HbStepValue>(1);
}
