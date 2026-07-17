import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCommandImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-command-sizes',
  imports: [HbCommandImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-4">
      <hb-command hbSize="sm" class="block rounded-lg border border-border">
        <hb-command-input hbPlaceholder="Small…" />
        <hb-command-list>
          <hb-command-item [hbValue]="'a'" hbLabel="Oak">Oak</hb-command-item>
          <hb-command-item [hbValue]="'b'" hbLabel="Beech">Beech</hb-command-item>
        </hb-command-list>
      </hb-command>

      <hb-command hbSize="lg" class="block rounded-lg border border-border">
        <hb-command-input hbPlaceholder="Large…" />
        <hb-command-list>
          <hb-command-item [hbValue]="'a'" hbLabel="Oak">Oak</hb-command-item>
          <hb-command-item [hbValue]="'b'" hbLabel="Beech">Beech</hb-command-item>
        </hb-command-list>
      </hb-command>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCommandSizesComponent {}
