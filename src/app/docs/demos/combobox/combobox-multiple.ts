import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbComboboxImports, type HbComboboxOption } from '@herbst/ui';

@Component({
  selector: 'hb-demo-combobox-multiple',
  imports: [HbComboboxImports],
  template: `
    <div class="w-80 max-w-full">
      <hb-combobox
        hbMultiple
        hbDropdown
        hbClearable
        hbFluid
        [hbMaxChips]="2"
        [hbSelectionLimit]="4"
        hbPlaceholder="Pick up to four…"
        [hbOptions]="options"
        [hbValue]="values()"
        (hbValueChange)="values.set($any($event))"
      ></hb-combobox>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoComboboxMultipleComponent {
  protected readonly values = signal<unknown[]>(['birch', 'oak']);

  protected readonly options: HbComboboxOption[] = [
    { value: 'oak', label: 'Oak' },
    { value: 'beech', label: 'Beech' },
    { value: 'maple', label: 'Maple' },
    { value: 'birch', label: 'Birch' },
    { value: 'chestnut', label: 'Chestnut' },
    { value: 'willow', label: 'Willow' },
  ];
}
