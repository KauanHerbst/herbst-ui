import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbSpinnerImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-spinner-usage',
  imports: [HbSpinnerImports, HbButtonComponent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-4">
      <button hb-button hbType="secondary" disabled>
        <hb-spinner hbSize="sm" hbLabel="Saving" />
        Saving…
      </button>

      <span class="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <hb-spinner hbSize="sm" />
        Loading photos…
      </span>

      <div class="flex h-24 items-center justify-center rounded-md border border-border">
        <hb-spinner hbVariant="bars" hbSize="xl" class="text-muted-foreground" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSpinnerUsageComponent {}
