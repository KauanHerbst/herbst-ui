import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbComboboxImports, type HbComboboxOption } from '@herbst/ui';

@Component({
  selector: 'hb-demo-combobox-states',
  imports: [HbComboboxImports],
  template: `
    <div class="flex w-72 max-w-full flex-col gap-3">
      <hb-combobox
        hbSize="sm"
        hbStatus="success"
        hbDropdown
        hbFluid
        [hbOptions]="options"
        [hbValue]="'birch'"
      ></hb-combobox>
      <hb-combobox
        hbSize="lg"
        hbStatus="error"
        hbInvalid
        hbDropdown
        hbFluid
        [hbOptions]="options"
        hbPlaceholder="Required"
      ></hb-combobox>
      <hb-combobox
        hbDisabled
        hbDropdown
        hbFluid
        [hbOptions]="options"
        [hbValue]="'oak'"
      ></hb-combobox>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoComboboxStatesComponent {
  protected readonly options: HbComboboxOption[] = [
    { value: 'oak', label: 'Oak' },
    { value: 'beech', label: 'Beech' },
    { value: 'maple', label: 'Maple' },
    { value: 'birch', label: 'Birch' },
  ];
}
