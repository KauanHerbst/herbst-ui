import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbBadgeImports, HbDividerImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-divider-labeled',
  imports: [HbDividerImports, HbBadgeImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-6">
      <hb-divider hbLabel="Autumn" />

      <hb-divider>
        <span hb-badge hbType="outline" class="font-mono uppercase tracking-[0.08em]">or</span>
      </hb-divider>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoDividerLabeledComponent {}
