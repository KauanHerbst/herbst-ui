import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbSelectImports, type HbSelectOption } from '@herbst/ui';

@Component({
  selector: 'hb-demo-select-basic',
  imports: [HbSelectImports],
  template: `
    <div class="flex w-full max-w-xs flex-col gap-2">
      <hb-select
        hbFluid
        hbClearable
        [hbOptions]="options"
        [(hbValue)]="family"
        hbPlaceholder="Pick a city"
      />
      <p class="font-mono text-[12px] text-muted-foreground">Selected: {{ family() ?? '—' }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSelectBasicComponent {
  protected readonly family = signal<unknown>(null);
  protected readonly options: HbSelectOption[] = [
    { value: 'freiburg', label: 'Freiburg' },
    { value: 'munich', label: 'Munich' },
    { value: 'berlin', label: 'Berlin' },
    { value: 'hamburg', label: 'Hamburg', disabled: true },
  ];
}
