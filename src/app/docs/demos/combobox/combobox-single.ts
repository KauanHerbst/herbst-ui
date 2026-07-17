import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbComboboxImports, type HbComboboxOption } from '@herbst/ui';

@Component({
  selector: 'hb-demo-combobox-single',
  imports: [HbComboboxImports],
  template: `
    <div class="flex flex-col gap-2">
      <div class="w-72 max-w-full">
        <hb-combobox
          hbPlaceholder="Search a leaf…"
          hbDropdown
          hbClearable
          hbFluid
          [hbOptions]="options"
          [hbValue]="value()"
          (hbValueChange)="value.set($event)"
        ></hb-combobox>
      </div>

      <p class="font-mono text-[12px] text-muted-foreground">Value: {{ value() ?? '—' }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoComboboxSingleComponent {
  protected readonly value = signal<unknown>('birch');

  protected readonly options: HbComboboxOption[] = [
    { value: 'oak', label: 'Oak' },
    { value: 'beech', label: 'Beech' },
    { value: 'maple', label: 'Maple' },
    { value: 'birch', label: 'Birch' },
    { value: 'chestnut', label: 'Chestnut' },
    { value: 'willow', label: 'Willow' },
  ];
}
