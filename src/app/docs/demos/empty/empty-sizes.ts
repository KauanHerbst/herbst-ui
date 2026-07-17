import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbEmptyImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-empty-sizes',
  imports: [HbEmptyImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-4">
      <hb-empty hbSize="xs" class="rounded-lg border border-border">
        <hb-empty-header>
          <hb-empty-title>Extra small</hb-empty-title>
          <hb-empty-description>Tight padding for inline empty states.</hb-empty-description>
        </hb-empty-header>
      </hb-empty>

      <hb-empty hbSize="lg" class="rounded-lg border border-border">
        <hb-empty-header>
          <hb-empty-title>Large</hb-empty-title>
          <hb-empty-description>Generous padding for full-page empty states.</hb-empty-description>
        </hb-empty-header>
      </hb-empty>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoEmptySizesComponent {}
