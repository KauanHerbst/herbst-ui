import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbDividerImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-divider-variants',
  imports: [HbDividerImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-4 text-sm text-muted-foreground">
      <span>Solid divider below</span>
      <hb-divider />
      <span>Dashed divider below</span>
      <hb-divider hbVariant="dashed" />
      <span>Dotted divider below</span>
      <hb-divider hbVariant="dotted" />
      <span>End</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoDividerVariantsComponent {}
