import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbComboboxImports, type HbComboboxOption } from '@herbst/ui';

@Component({
  selector: 'hb-demo-combobox-filter',
  imports: [HbComboboxImports],
  template: `
    <div class="w-72 max-w-full">
      <hb-combobox
        hbFluid
        hbAllowCustom
        hbFilterMatchMode="startsWith"
        [hbMinLength]="1"
        hbEmptyMessage="No match — press enter to add it"
        hbPlaceholder="Type to filter or add…"
        [hbOptions]="options"
        [hbValue]="value()"
        (hbValueChange)="value.set($event)"
      ></hb-combobox>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoComboboxFilterComponent {
  protected readonly value = signal<unknown>(null);

  protected readonly options: HbComboboxOption[] = [
    { value: 'oak', label: 'Oak' },
    { value: 'beech', label: 'Beech' },
    { value: 'maple', label: 'Maple' },
    { value: 'birch', label: 'Birch' },
    { value: 'chestnut', label: 'Chestnut' },
    { value: 'willow', label: 'Willow' },
  ];
}
