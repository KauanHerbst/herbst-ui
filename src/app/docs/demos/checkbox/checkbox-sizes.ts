import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCheckboxImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-checkbox-sizes',
  imports: [HbCheckboxImports],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex flex-wrap items-center gap-4">
        <hb-checkbox [hbChecked]="true" hbSize="xs">xs</hb-checkbox>
        <hb-checkbox [hbChecked]="true" hbSize="sm">sm</hb-checkbox>
        <hb-checkbox [hbChecked]="true" hbSize="md">md</hb-checkbox>
        <hb-checkbox [hbChecked]="true" hbSize="lg">lg</hb-checkbox>
        <hb-checkbox [hbChecked]="true" hbSize="xl">xl</hb-checkbox>
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <hb-checkbox [hbChecked]="true" hbShape="square">Square</hb-checkbox>
        <hb-checkbox [hbChecked]="true" hbShape="rounded">Rounded</hb-checkbox>
        <hb-checkbox [hbChecked]="true" hbShape="circle">Circle</hb-checkbox>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCheckboxSizesComponent {}
