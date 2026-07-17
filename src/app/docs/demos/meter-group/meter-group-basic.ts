import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbMeterGroupImports, type HbMeterItem } from '@herbst/ui';

@Component({
  selector: 'hb-demo-meter-group-basic',
  imports: [HbMeterGroupImports],
  template: ` <hb-meter-group class="w-full max-w-md" [hbValue]="items" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMeterGroupBasicComponent {
  protected readonly items: HbMeterItem[] = [
    { label: 'Photos', value: 42, color: '#6B7A55' },
    { label: 'Videos', value: 28, color: '#A64B2A' },
    { label: 'Notes', value: 14, color: '#B98A3E' },
    { label: 'Free', value: 16, color: '#3E4C3A' },
  ];
}
