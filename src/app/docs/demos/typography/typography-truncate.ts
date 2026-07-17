import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbTypographyImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-typography-truncate',
  imports: [HbTypographyImports],
  template: `
    <div class="flex w-56 flex-col gap-2 rounded-md border border-border p-3">
      <p hbTypography="small" hbColor="muted">Fixed 14rem column</p>

      <p hbTypography="large" hbTruncate>Autumn morning in the Black Forest</p>

      <p hbTypography="p">
        Autumn morning in the Black Forest — wraps normally onto several lines.
      </p>

      <p hbTypography="p" hbWeight="bold" hbColor="primary" [class]="'uppercase tracking-widest'">
        Custom class
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTypographyTruncateComponent {}
