import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbCheckboxImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-checkbox-group',
  imports: [HbCheckboxImports],
  template: `
    <div class="flex flex-col gap-3">
      <hb-checkbox-group
        hbOrientation="horizontal"
        [hbValue]="selected()"
        (hbValueChange)="selected.set($event)"
      >
        <hb-checkbox [hbValue]="'oak'">Oak</hb-checkbox>
        <hb-checkbox [hbValue]="'beech'">Beech</hb-checkbox>
        <hb-checkbox [hbValue]="'maple'">Maple</hb-checkbox>
        <hb-checkbox [hbValue]="'birch'">Birch</hb-checkbox>
      </hb-checkbox-group>

      <p class="font-mono text-[12px] text-muted-foreground">
        Selected: {{ selected().length ? selected().join(', ') : '—' }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCheckboxGroupComponent {
  protected readonly selected = signal<unknown[]>(['oak']);
}
