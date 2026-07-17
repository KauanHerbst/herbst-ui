import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbKbdImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-kbd-sizes',
  imports: [HbKbdImports],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <hb-kbd hbSize="xs">Esc</hb-kbd>
      <hb-kbd hbSize="sm">Tab</hb-kbd>
      <hb-kbd hbSize="md">Enter</hb-kbd>
      <hb-kbd hbSize="lg">Space</hb-kbd>
      <hb-kbd hbSize="xl">Shift</hb-kbd>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoKbdSizesComponent {}
