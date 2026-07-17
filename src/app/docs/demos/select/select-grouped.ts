import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbSelectImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-select-grouped',
  imports: [HbSelectImports],
  template: `
    <hb-select hbFluid [(hbValue)]="species" hbPlaceholder="Choose a tree" class="w-full max-w-xs">
      <hb-select-group>
        <hb-select-label>Trees</hb-select-label>
        <hb-select-item [hbValue]="'oak'">Oak</hb-select-item>
        <hb-select-item [hbValue]="'beech'">Beech</hb-select-item>
      </hb-select-group>

      <hb-select-separator />

      <hb-select-group>
        <hb-select-label>Shrubs</hb-select-label>
        <hb-select-item [hbValue]="'hazel'">Hazel</hb-select-item>
        <hb-select-item [hbValue]="'elder'" hbDisabled>Elder</hb-select-item>
      </hb-select-group>
    </hb-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSelectGroupedComponent {
  protected readonly species = signal<unknown>('oak');
}
