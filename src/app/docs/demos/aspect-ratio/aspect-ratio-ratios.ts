import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAspectRatioComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-aspect-ratio-ratios',
  imports: [HbAspectRatioComponent],
  template: `
    <div class="grid w-full max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
      <div hb-aspect-ratio [hbRatio]="1" class="rounded-md border border-border bg-muted">
        <span class="flex items-center justify-center font-mono text-xs text-muted-foreground">
          1 / 1
        </span>
      </div>
      <div hb-aspect-ratio [hbRatio]="4 / 3" class="rounded-md border border-border bg-muted">
        <span class="flex items-center justify-center font-mono text-xs text-muted-foreground">
          4 / 3
        </span>
      </div>
      <div hb-aspect-ratio [hbRatio]="16 / 9" class="rounded-md border border-border bg-muted">
        <span class="flex items-center justify-center font-mono text-xs text-muted-foreground">
          16 / 9
        </span>
      </div>
      <div hb-aspect-ratio [hbRatio]="3 / 4" class="rounded-md border border-border bg-muted">
        <span class="flex items-center justify-center font-mono text-xs text-muted-foreground">
          3 / 4
        </span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAspectRatioRatiosComponent {}
