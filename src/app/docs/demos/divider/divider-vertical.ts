import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbDividerImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-divider-vertical',
  imports: [HbDividerImports],
  template: `
    <div class="flex h-8 items-center gap-4 text-sm text-foreground">
      <span>Oak</span>
      <hb-divider hbOrientation="vertical" />
      <span>Beech</span>
      <hb-divider hbOrientation="vertical" hbVariant="dashed" />
      <span>Maple</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoDividerVerticalComponent {}
