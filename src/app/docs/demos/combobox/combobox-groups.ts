import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbComboboxImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-combobox-groups',
  imports: [HbComboboxImports],
  template: `
    <div class="w-72 max-w-full">
      <hb-combobox
        hbFluid
        hbPlaceholder="Search a tree…"
        [hbValue]="value()"
        (hbValueChange)="value.set($event)"
      >
        <hb-combobox-group>
          <hb-combobox-label>Trees</hb-combobox-label>
          <hb-combobox-item [hbValue]="'birch'" hbLabel="Birch">Birch</hb-combobox-item>
          <hb-combobox-item [hbValue]="'oak'" hbLabel="Oak">Oak</hb-combobox-item>
          <hb-combobox-item [hbValue]="'chestnut'" hbLabel="Chestnut">Chestnut</hb-combobox-item>
        </hb-combobox-group>

        <hb-combobox-separator />

        <hb-combobox-group>
          <hb-combobox-label>Ground cover</hb-combobox-label>
          <hb-combobox-item [hbValue]="'lichen'" hbLabel="Lichen">Lichen</hb-combobox-item>
          <hb-combobox-item [hbValue]="'moss'" hbLabel="Moss" hbDisabled
            >Moss (unavailable)</hb-combobox-item
          >
        </hb-combobox-group>
      </hb-combobox>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoComboboxGroupsComponent {
  protected readonly value = signal<unknown>('oak');
}
